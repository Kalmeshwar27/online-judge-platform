const express = require('express');
const router = express.Router();
const pool = require('../db');

// ADD a test case to a problem
router.post('/', async (req, res) => {
  const { problem_id, input, expected_output, is_sample } = req.body;

  if (!problem_id || input === undefined || expected_output === undefined) {
    return res.status(400).json({ success: false, error: 'problem_id, input, and expected_output are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO test_cases (problem_id, input, expected_output, is_sample)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [problem_id, input, expected_output, is_sample || false]
    );
    res.status(201).json({ success: true, test_case: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all test cases for a problem (only samples, for public display)
router.get('/problem/:problemId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM test_cases WHERE problem_id = $1 AND is_sample = true ORDER BY id',
      [req.params.problemId]
    );
    res.json({ success: true, test_cases: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET ALL test cases for a problem (sample + hidden — this is what the judge worker will use)
router.get('/problem/:problemId/all', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM test_cases WHERE problem_id = $1 ORDER BY id',
      [req.params.problemId]
    );
    res.json({ success: true, test_cases: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;