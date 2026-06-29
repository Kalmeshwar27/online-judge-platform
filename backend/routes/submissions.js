const express = require('express');
const router = express.Router();
const pool = require('../db');
const { submissionQueue } = require('../queue');

// CREATE a submission
router.post('/', async (req, res) => {
  const { user_id, problem_id, code, language } = req.body;

  if (!problem_id || !code || !language) {
    return res.status(400).json({ success: false, error: 'problem_id, code, and language are required' });
  }

  try {
    // 1. Insert submission with 'Pending' verdict
    const result = await pool.query(
      `INSERT INTO submissions (user_id, problem_id, code, language, verdict)
       VALUES ($1, $2, $3, $4, 'Pending')
       RETURNING *`,
      [user_id || null, problem_id, code, language]
    );
    const submission = result.rows[0];

    // 2. Push a job to the queue with the submission id
    await submissionQueue.add('judge', { submissionId: submission.id });

    res.status(201).json({ success: true, submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET a submission by id (to check verdict status)
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM submissions WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Submission not found' });
    }
    res.json({ success: true, submission: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;