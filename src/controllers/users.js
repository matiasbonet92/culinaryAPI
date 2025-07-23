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

export const signupUser = async (req, res) => {
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

export const signinUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const getUserResult = await pool.query(
      "SELECT * FROM Users WHERE username = $1;",
      [username]
    );

    if (getUserResult.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = getUserResult.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Signin successful", user });
  } catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json({ error: "Database query failed" });
  }
}

export const updateUser = async (req, res) => {
  const { username, email, lastPassword, password} = req.body;

  try{
    const getUserResult = await pool.query(
      "SELECT * FROM Users WHERE username = $1;",
      [username]
    );

    const compareLastPassword = await bcrypt.compare(lastPassword, getUserResult.rows[0].password);
    if (!compareLastPassword) {
      return res.status(400).json({ error: "The actual password is incorrect!" });
    }

    const newhashedPass = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "UPDATE Users SET username = $1, password = $2, email = $3 WHERE username = $4 RETURNING *;",
      [username, newhashedPass, email, username]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ error: "Failed to update user" });
    }

    res.status(201).json("User updated successfully");
  }catch(error){
    console.error("Error executing query:", error);
    return res.status(500).json({ error: "Database query failed" });
  }
}

export const deleteUser = (req, res) => {
  const { id } = req.params;

  pool.query("DELETE FROM Users WHERE id = $1", [id], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
}
