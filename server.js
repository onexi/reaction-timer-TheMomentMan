const express = require('express');
const app = express();

// Use express.json() middleware to parse JSON bodies.
app.use(express.json());

// Serve static files (HTML, CSS, client-side JavaScript) from the "public" directory.
app.use(express.static('public'));

// In-memory storage for reaction times
let reactionTimes = [];

/**
 * POST /record
 * Expects a JSON payload with "username" and "reactionTime".
 * Adds the new reaction time to the reactionTimes array.
 */
app.post('/record', (req, res) => {
  const { username, reactionTime } = req.body;
  if (!reactionTime || reactionTime <= 0 || !username) {
    return res.status(400).json({ error: 'Invalid reaction time or username.' });
  }
  const newReactionTime = {
    username,
    reactionTime,
    timestamp: Date.now()
  };
  reactionTimes.push(newReactionTime);
  res.status(201).json({ success: true });
});

/**
 * GET /all-reaction-times
 * Returns a JSON object containing all reaction times.
 */
app.get('/all-reaction-times', (req, res) => {
  res.json({ reactionTimes });
});

/**
 * GET /fastest
 * Returns the fastest reaction time.
 */
app.get('/fastest', (req, res) => {
  if (reactionTimes.length === 0) {
    return res.json({ fastestTime: 'No data yet' });
  }
  const fastestTime = Math.min(...reactionTimes.map(rt => rt.reactionTime));
  res.json({ fastestTime });
});

// Define the port (default to 3000 if not specified).
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});