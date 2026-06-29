const { Worker } = require('bullmq');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const pool = require('../db');

const connection = process.env.REDIS_URL
  ? { url: process.env.REDIS_URL }
  : { host: 'localhost', port: 6379 };

// Runs one piece of code against one input, returns stdout or throws on timeout/error
function runCode(code, language, input, timeLimitMs) {
  return new Promise((resolve, reject) => {
    const tmpDir = fs.mkdtempSync('/tmp/judge-');

    if (language === 'python') {
      const filePath = path.join(tmpDir, 'solution.py');
      fs.writeFileSync(filePath, code);
      executeCommand(`python3 ${filePath}`, input, timeLimitMs, tmpDir, resolve, reject);

    } else if (language === 'java') {
    const filePath = path.join(tmpDir, 'Main.java');
    fs.writeFileSync(filePath, code);

    exec(`javac ${filePath}`, { cwd: tmpDir }, (compileErr, _stdout, compileStderr) => {
        if (compileErr) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        return reject({ type: 'CompileError', message: compileStderr });
        }
        // Use -Xmx256m to cap actual heap usage, and the Java-specific sandbox (no ulimit -v)
        executeCommand(`java -Xmx256m -cp ${tmpDir} Main`, input, timeLimitMs, tmpDir, resolve, reject, 'java');
    });
    } else {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        return reject({ type: 'UnsupportedLanguage', message: `${language} not supported yet` });
        }
    });
    }

function executeCommand(command, input, timeLimitMs, tmpDir, resolve, reject, lang = 'default') {

  const scriptName = lang === 'java' ? 'sandbox-java.sh' : 'sandbox.sh';
  const sandboxedCommand = `bash ${path.join(__dirname, scriptName)} ${command}`;

  const child = exec(sandboxedCommand, { timeout: timeLimitMs }, (error, stdout, stderr) => {
    fs.rmSync(tmpDir, { recursive: true, force: true });

    if (error) {
      console.log('=== FULL DEBUG ===');
      console.log('stdout:', JSON.stringify(stdout));
      console.log('stderr:', JSON.stringify(stderr));
      console.log('error.message:', error.message);
      console.log('error.code:', error.code);
      console.log('error.signal:', error.signal);
      console.log('error.killed:', error.killed);
      console.log('==================');

      if (error.killed) {
        return reject({ type: 'TLE', message: 'Time limit exceeded' });
      }
      if (
        stderr.includes('Cannot allocate memory') ||
        stderr.includes('MemoryError') ||
        error.signal === 'SIGSEGV' ||
        error.signal === 'SIGKILL'
      ) {
        return reject({ type: 'MLE', message: 'Memory limit exceeded' });
      }
      return reject({ type: 'RuntimeError', message: stderr || error.message });
    }
    resolve(stdout.trim());
  });

  child.stdin.write(input);
  child.stdin.end();
}

const worker = new Worker('submissionQueue', async (job) => {
  const { submissionId } = job.data;

  const subResult = await pool.query('SELECT * FROM submissions WHERE id = $1', [submissionId]);
  const submission = subResult.rows[0];
  if (!submission) return;

  const probResult = await pool.query('SELECT * FROM problems WHERE id = $1', [submission.problem_id]);
  const problem = probResult.rows[0];

  const testCasesResult = await pool.query('SELECT * FROM test_cases WHERE problem_id = $1 ORDER BY id', [submission.problem_id]);
  const testCases = testCasesResult.rows;

  const verdictMap = {
    TLE: 'Time Limit Exceeded',
    MLE: 'Memory Limit Exceeded',
    CompileError: 'Compile Error',
    RuntimeError: 'Runtime Error',
    UnsupportedLanguage: 'Unsupported Language',
  };

  let verdict = 'Accepted';
  let failedTestCaseId = null;
  let passedCount = 0;
  const results = [];

  for (const tc of testCases) {
    try {
      const output = await runCode(submission.code, submission.language, tc.input, problem.time_limit_ms);
      const passed = output === tc.expected_output.trim();

      results.push({ test_case_id: tc.id, is_sample: tc.is_sample, status: passed ? 'Passed' : 'Failed' });

      if (passed) {
        passedCount++;
      } else {
        verdict = 'Wrong Answer';
        failedTestCaseId = tc.id;
      }
    } catch (err) {
      const status = verdictMap[err.type] || 'Runtime Error';
      results.push({ test_case_id: tc.id, is_sample: tc.is_sample, status });
      verdict = status;
      failedTestCaseId = tc.id;
    }

    // Persist progress after EVERY test case so the frontend can poll and show live status
    await pool.query(
      `UPDATE submissions
       SET test_case_results = $1, passed_test_cases = $2, total_test_cases = $3
       WHERE id = $4`,
      [JSON.stringify(results), passedCount, testCases.length, submissionId]
    );

    if (verdict !== 'Accepted') break; // stop at first failure, same behavior as before
  }

  await pool.query(
    `UPDATE submissions SET verdict = $1, failed_test_case_id = $2 WHERE id = $3`,
    [verdict, failedTestCaseId, submissionId]
  );
}, { connection });