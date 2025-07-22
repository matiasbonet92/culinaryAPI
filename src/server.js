import express from "express";
import userRoutes from "./Routes/userRoutes.js";
import recipesRoutes from "./Routes/recipesRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/users", userRoutes);
app.use("/recipes", recipesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Server up
app.listen(process.env.NODE_PORT, () => {
  console.log(`Server is running on port ${process.env.NODE_PORT}`);
});

// Handle uncaught exceptions and rejections
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});