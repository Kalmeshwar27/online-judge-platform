const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const problemsRouter = require('./routes/problems');
app.use('/problems', problemsRouter);

app.get('/', (req, res) => {
  res.send('Online Judge API is running');
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const testCasesRouter = require('./routes/testCases');
app.use('/test-cases', testCasesRouter);

const submissionsRouter = require('./routes/submissions');
app.use('/submissions', submissionsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});