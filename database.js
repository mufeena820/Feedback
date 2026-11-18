// database.js

const Database = require('better-sqlite3');

// Create database file
const db = new Database('feedback.db');

// Create feedback table
db.prepare(`
    CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        studentName TEXT NOT NULL,
        department TEXT NOT NULL,
        category TEXT NOT NULL,
        rating TEXT NOT NULL,
        feedback TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();

console.log('Database connected successfully!');

module.exports = db;