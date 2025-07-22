import pool from "../config/db.js";

export const getRecipes = (req, res) => {
  pool.query("SELECT * FROM Recipes", (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json(results.rows);
  });
}

export const getRecipesById = (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM Recipes WHERE id = $1", [id], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(results.rows[0]);
  });
}

export const getRecipesByCuisine = (req, res) => {
  const { cuisine } = req.params;
  pool.query(
    "SELECT r.title, r.description, r.ingredients, r.instructions, c.name FROM CuisinesInRecipes cir LEFT JOIN Cuisines c ON cir.cuisine_id = c.id LEFT JOIN Recipes r ON cir.recipe_id = r.id WHERE c.name ILIKE $1;", 
    [`%${cuisine}%`], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ error: "No recipes found for this cuisine" });
    }
    res.status(200).json(results.rows);
  });
}

export const updateRecipes = (req, res) => {
  const { id } = req.params;
  const { title, description, ingredients, instructions } = req.body;
  pool.query(
    "UPDATE Recipes SET title = $1, description = $2, ingredients = $3, instructions = $4 WHERE id = $5 RETURNING *",
    [title, description, ingredients, instructions, id],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Database query failed" });
      }
      if (results.rowCount === 0) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.status(200).json(results.rows[0]);
    }
  );
}

export const createRecipes = (req, res) => {
  const { title, description, ingredients, instructions } = req.body;
  pool.query(
    "INSERT INTO Recipes (title, description, ingredients, instructions) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, description, ingredients, instructions],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: "Database query failed" });
      }
      if (results.rowCount === 0) {
        return res.status(400).json({ error: "Failed to create recipe" });
      }
      res.status(201).json(results.rows[0]);
    }
  );
}

export const deleteRecipes = (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM Recipes WHERE id = $1", [id], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully" });
  });
}