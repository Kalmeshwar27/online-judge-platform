const express = require('express');
const router = express.Router();
const pool = require('../db');

// CREATE a problem
router.post('/', async (req, res) => {
  const { title, description, difficulty, time_limit_ms, memory_limit_kb, created_by } = req.body;

  if (!title || !description || !difficulty) {
    return res.status(400).json({ success: false, error: 'title, description, and difficulty are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO problems (title, description, difficulty, time_limit_ms, memory_limit_kb, created_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, difficulty, time_limit_ms || 2000, memory_limit_kb || 65536, created_by || null]
    );
    res.status(201).json({ success: true, problem: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all problems
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, title, difficulty, created_at FROM problems ORDER BY id');
    res.json({ success: true, problems: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET a single problem by id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM problems WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Problem not found' });
    }
    res.json({ success: true, problem: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;