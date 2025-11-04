import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";

// Load environment variables
dotenv.config();

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import messRoutes from "./routes/messRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Health Check Route
app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS now");
    res.json({
      message: " Munchy Backend Running Successfully (MySQL Connected)",
      serverTime: rows[0].now,
    });
  } catch (err) {
    console.error(" Database connection error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/mess", messRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

// 404 Route Not Found (must be after all routes)
app.use((req, res) => {
  console.warn(` 404 - Route not found: ${req.originalUrl}`);
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(500).json({ error: "Something went wrong on the server." });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend allowed: ${process.env.FRONTEND_URL || "http://localhost:5173"}`);
});
