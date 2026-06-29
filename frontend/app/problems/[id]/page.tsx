'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Editor from '@monaco-editor/react';
import { Problem, TestCase, Submission } from '@/types';

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: 'text-[var(--easy)] bg-[var(--easy-soft)] border-[var(--easy)]/30',
  Medium: 'text-[var(--medium)] bg-[var(--medium-soft)] border-[var(--medium)]/30',
  Hard: 'text-[var(--hard)] bg-[var(--hard-soft)] border-[var(--hard)]/30',
};

const VERDICT_COLOR: Record<string, string> = {
  Accepted: 'var(--pass)',
  Pending: 'var(--pending)',
};

function verdictColor(verdict: string) {
  return VERDICT_COLOR[verdict] ?? 'var(--fail)';
}

const STARTER_CODE: Record<'python' | 'java', string> = {
  python: '# Write your solution here\n',
  java: 'public class Main {\n    public static void main(String[] args) {\n\n    }\n}\n',
};

export default function ProblemPage() {
  const params = useParams();
  const problemId = params.id;

  const [problem, setProblem] = useState<Problem | null>(null);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [language, setLanguage] = useState<'python' | 'java'>('python');
  const [code, setCode] = useState(STARTER_CODE.python);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetch(`${apiUrl}/problems/${problemId}`).then((res) => res.json()),
      fetch(`${apiUrl}/test-cases/problem/${problemId}`).then((res) => res.json()),
    ])
      .then(([problemData, testCaseData]) => {
        if (cancelled) return;
        if (problemData.success) setProblem(problemData.problem);
        else setLoadError(true);
        if (testCaseData.success) setTestCases(testCaseData.test_cases);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [problemId, apiUrl]);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const handleLanguageChange = (next: 'python' | 'java') => {
    setLanguage(next);
    setCode(STARTER_CODE[next]);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmission(null);

    try {
      const res = await fetch(`${apiUrl}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem_id: Number(problemId), code, language }),
      });
      const data = await res.json();

      if (data.success) {
        pollForVerdict(data.submission.id);
      } else {
        setSubmitting(false);
      }
    } catch {
      setSubmitting(false);
    }
  };

  const pollForVerdict = (submissionId: number) => {
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${apiUrl}/submissions/${submissionId}`);
        const data = await res.json();
        if (data.success && data.submission.verdict !== 'Pending') {
          setSubmission(data.submission);
          setSubmitting(false);
          if (pollRef.current) clearInterval(pollRef.current);
        }
      } catch {
        setSubmitting(false);
        if (pollRef.current) clearInterval(pollRef.current);
      }
    }, 1500);
  };

  if (loadError) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--bg)] text-[var(--text-muted)]">
        Could not load this problem. Check that the API is running and try again.
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--bg)] text-[var(--text-muted)]">
        Loading problem...
      </div>
    );
  }

  const difficultyClass = DIFFICULTY_STYLES[problem.difficulty] ?? DIFFICULTY_STYLES.Easy;

  return (
    <div className="flex h-screen bg-[var(--bg)] text-[var(--text)] font-sans">
      {/* Left: problem description */}
      <div className="w-1/2 overflow-y-auto border-r border-[var(--border)]">
        <div className="px-8 py-6 max-w-2xl">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-semibold tracking-tight">{problem.title}</h1>
          </div>
          <span
            className={`inline-block text-xs font-mono font-medium px-2 py-0.5 rounded-full border ${difficultyClass}`}
          >
            {problem.difficulty}
          </span>

          <p className="mt-5 text-[15px] leading-relaxed text-[var(--text)]/90 whitespace-pre-wrap">
            {problem.description}
          </p>

          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)] mt-8 mb-3">
            Sample test cases
          </h2>

          <div className="space-y-3">
            {testCases.map((tc, idx) => (
              <div
                key={tc.id}
                className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--panel)] overflow-hidden"
              >
                <div className="px-3 py-1.5 text-xs font-mono text-[var(--text-muted)] border-b border-[var(--border)]">
                  Case {idx + 1}
                </div>
                <div className="p-3 grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-[var(--text-faint)] mb-1">Input</div>
                    <pre className="whitespace-pre-wrap text-[var(--text)]/90 m-0">{tc.input}</pre>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-faint)] mb-1">Expected output</div>
                    <pre className="whitespace-pre-wrap text-[var(--text)]/90 m-0">
                      {tc.expected_output}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: editor + console */}
      <div className="w-1/2 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)] bg-[var(--panel)]">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value as 'python' | 'java')}
            className="bg-[var(--panel-raised)] border border-[var(--border-strong)] text-sm rounded-[var(--radius)] px-2.5 py-1.5 text-[var(--text)] font-mono cursor-pointer"
          >
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-[var(--accent)] text-white text-sm font-medium px-4 py-1.5 rounded-[var(--radius)] disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition"
          >
            {submitting ? 'Judging...' : 'Submit'}
          </button>
        </div>

        <div className="flex-1 min-h-0">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(val) => setCode(val ?? '')}
            theme="vs-dark"
            options={{
              fontSize: 13,
              fontFamily: 'var(--font-mono)',
              minimap: { enabled: false },
              padding: { top: 12 },
            }}
          />
        </div>

        {submission && (
          <div
            className="border-t overflow-y-auto max-h-72 bg-[var(--panel)]"
            style={{ borderTopColor: 'var(--border)' }}
          >
            <div
              className="flex items-center gap-2 px-4 py-3 border-l-4"
              style={{ borderLeftColor: verdictColor(submission.verdict) }}
            >
              <span
                className="font-semibold text-base"
                style={{ color: verdictColor(submission.verdict) }}
              >
                {submission.verdict}
              </span>

              {submission.total_test_cases !== null && (
                <span className="text-sm text-[var(--text-muted)]">
                  &middot; {submission.passed_test_cases} / {submission.total_test_cases} test
                  cases passed
                </span>
              )}
            </div>

            <div className="px-4 pb-4 space-y-1.5">
              {testCases.map((tc, idx) => {
                const result = submission.test_case_results?.find(
                  (r) => r.test_case_id === tc.id
                );
                const resultsLength = submission.test_case_results?.length ?? 0;

                let status: string;
                if (result) {
                  status = result.status;
                } else if (submitting && idx === resultsLength) {
                  status = 'Running';
                } else {
                  status = 'Not run';
                }

                const isPassed = status === 'Passed';
                const isRunning = status === 'Running';
                const isNotRun = status === 'Not run';

                const dotColor = isPassed
                  ? 'var(--pass)'
                  : isRunning || isNotRun
                  ? 'var(--pending)'
                  : 'var(--fail)';

                const label = isRunning ? 'Running...' : isNotRun ? 'Not run' : status;

                return (
                  <div
                    key={tc.id}
                    className="flex items-center justify-between text-sm rounded-[var(--radius)] border border-[var(--border)] px-3 py-1.5"
                  >
                    <span className="text-[var(--text-muted)] font-mono text-xs">
                      Test case {idx + 1}
                    </span>
                    <span
                      className={`flex items-center gap-1.5 font-medium ${
                        isRunning ? 'animate-pulse' : ''
                      }`}
                      style={{ color: dotColor }}
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ background: dotColor }}
                      />
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            {submission.total_test_cases !== null &&
              submission.total_test_cases > testCases.length && (
                <div className="text-xs text-[var(--text-faint)] px-4 pb-3">
                  + {submission.total_test_cases - testCases.length} hidden test case(s)
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}