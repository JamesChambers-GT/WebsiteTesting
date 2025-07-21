// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./chat.db');

// Create table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user TEXT,
      message TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

function saveMessage(user, message) {
  db.run(
    `INSERT INTO messages (user, message) VALUES (?, ?)`,
    [user, message],
    (err) => {
      if (err) console.error('Error saving message:', err);
    }
  );
}

function getMessages(callback) {
  db.all(`SELECT * FROM messages ORDER BY timestamp ASC`, (err, rows) => {
    if (err) {
      console.error('Error fetching messages:', err);
      callback([]);
    } else {
      callback(rows);
    }
  });
}

module.exports = { saveMessage, getMessages };
