import pool from "../config/db.js";

export const getUsers = (req, res) => {
  pool.query("SELECT * FROM Users", (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json(results.rows);
  });
}
