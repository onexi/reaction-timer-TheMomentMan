// server.js
const express = require('express');
const app = express();

// Use express.json() middleware to parse JSON bodies.
app.use(express.json());

// Serve static files (HTML, CSS, client-side JavaScript) from the "public" directory.
app.use(express.static('public'));

// In-memory storage for messages
let messages = [];

/**
 * GET /messages
 * Returns a JSON object containing all messages.
 */
app.get('/messages', (req, res) => {
  res.json({ messages });
});

/**
 * POST /messages
 * Expects a JSON payload with "username" and "message".
 * Adds the new message to the messages array.
 */
app.post('/messages', (req, res) => {
  const { username, message } = req.body;
  if (!username || !message) {
    return res.status(400).json({ error: 'Both username and message are required.' });
  }
  // Optionally, include a timestamp for each message.
  const newMessage = {
    username,
    message,
    timestamp: Date.now()
  };
  messages.push(newMessage);
  res.status(201).json({ success: true });
});

// Define the port (default to 3000 if not specified).
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



/* const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Initialize SQLite database
const db = new sqlite3.Database("reaction_times.db", (err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to the SQLite database.");
    db.run("CREATE TABLE IF NOT EXISTS times (id INTEGER PRIMARY KEY, reactionTime INTEGER)");
  }
});

// Serve the HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ReactionTimerApp.html"));
});

// Endpoint to record reaction time
app.post("/record", (req, res) => {
  const { reactionTime } = req.body;
  if (!reactionTime || reactionTime <= 0) {
    return res.status(400).json({ error: "Invalid reaction time." });
  }

  db.run("INSERT INTO times (reactionTime) VALUES (?)", [reactionTime], function (err) {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Failed to save reaction time." });
    }
    res.json({ message: "Reaction time recorded.", id: this.lastID });
  });
});

// Endpoint to get the fastest reaction time
app.get("/fastest", (req, res) => {
  db.get("SELECT MIN(reactionTime) AS fastestTime FROM times", (err, row) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Failed to retrieve fastest reaction time." });
    }
    res.json({ fastestTime: row.fastestTime || "No data yet" });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); */
