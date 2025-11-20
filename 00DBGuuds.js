require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, conn) => {
  if (err) {
    console.error("DB connection error:", err.message || err);
  } else {
    console.log("Connected to MySQL (pool)");
    conn.release();
  }
});

app.get("/api/users", (req, res) => {
  pool.query("SELECT * FROM `User` ORDER BY UserRegisterDate DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message || err });
    res.json(results);
  });
});

app.get("/api/users/:id", (req, res) => {
  pool.query("SELECT * FROM `User` WHERE UserID = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message || err });
    if (!result || result.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(result[0]);
  });
});

app.post("/api/users", (req, res) => {
  const data = req.body;
  const allowed = [
    "UserFname","UserLname","Username","UserEmail","UserPhoneNumber",
    "UserPassword","UserA_Street","UserA_City","UserA_Province","UserA_Country","UserA_PostalCode",
    "UserDOB","UserS_Active","UserS_Suspended"
  ];
  const insert = {};
  allowed.forEach(k => { if (data[k] !== undefined) insert[k] = data[k]; });

  if (Object.keys(insert).length === 0) return res.status(400).json({ error: "No valid fields" });

  const keys = Object.keys(insert);
  const placeholders = keys.map(() => "?").join(",");
  const sql = `INSERT INTO \`User\` (${keys.map(k => `\`${k}\``).join(",")}) VALUES (${placeholders})`;

  pool.query(sql, keys.map(k => insert[k]), (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") return res.status(409).json({ error: "Duplicate entry", detail: err.message });
      return res.status(500).json({ error: err.message || err });
    }
    res.status(201).json({ id: result.insertId });
  });
});

app.patch("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const allowed = [
    "UserFname","UserLname","Username","UserEmail","UserPhoneNumber",
    "UserPassword","UserA_Street","UserA_City","UserA_Province","UserA_Country","UserA_PostalCode",
    "UserDOB","UserS_Active","UserS_Suspended"
  ];
  const update = {};
  allowed.forEach(k => { if (body[k] !== undefined) update[k] = body[k]; });

  if (Object.keys(update).length === 0) return res.status(400).json({ error: "No valid fields to update" });

  const set = Object.keys(update).map(k => `\`${k}\` = ?`).join(", ");
  const params = [...Object.keys(update).map(k => update[k]), id];
  const sql = `UPDATE \`User\` SET ${set} WHERE UserID = ?`;

  pool.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err.message || err });
    res.json({ affectedRows: result.affectedRows });
  });
});

app.delete("/api/users/:id", (req, res) => {
  pool.query("DELETE FROM `User` WHERE UserID = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message || err });
    res.json({ deletedRows: result.affectedRows });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
