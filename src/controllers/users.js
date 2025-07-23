import pool from "../config/db.js";
import bcrypt from "bcrypt";

export const getUser = (req, res) => {
  pool.query("SELECT * FROM Users;", (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(201).json(results.rows);
  });
}
export const createUser = async (req, res) => {
  const { username, email, password} = req.body;

  try{
    const hashedPass = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO Users (username, password, email) VALUES ($1, $2, $3) RETURNING *;",
      [username, hashedPass, email]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ error: "Failed to create user" });
    }

    res.status(201).json(result.rows[0]);
  }catch(error){
    console.error("Error executing query:", error);
    return res.status(500).json({ error: "Database query failed" });
  }
}
