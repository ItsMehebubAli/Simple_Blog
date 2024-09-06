const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const db = new sqlite3.Database('./mydb.sqlite');

// Check if table exists, and create if it doesn't
db.serialize(() => {
  // db.run("DROP TABLE IF EXISTS Post");
  db.run(
    `CREATE TABLE IF NOT EXISTS Post (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      title TEXT, 
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  );
});
// Routes
app.get("/posts", (req, res) => {
  db.all("SELECT id, title, content, created_at FROM Post ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);  // 'rows' will now be sorted by 'created_at'
  });
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM Post WHERE id = ?", [id], (err, row) => {
    if (err) {
      throw err;
    }
    res.json(row);
  });
});

app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  db.run(
    "INSERT INTO Post (title, content) VALUES (?, ?)",
    [title, content],
    function (err) {
      if (err) {
        throw err;
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM Post WHERE id = ?", id, function (err) {
    if (err) {
      throw err;
    }
    res.status(204).send();
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
