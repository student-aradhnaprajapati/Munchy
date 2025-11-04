// controllers/authController.js
import bcrypt from "bcryptjs";
import pool from "../config/db.js";
import dotenv from "dotenv";
import { generateToken } from "../utils/jwt.js";

dotenv.config();

/**
 * 🧩 Register New User
 */
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check existing user
    const [existingUser] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    const userId = result.insertId;
    console.log(`User registered: ${email} (ID: ${userId})`);

    // Optionally generate token immediately
    const token = generateToken({ id: userId, email, role });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: userId, name, email, role },
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({ error: "Server error during registration" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Find user
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    console.log(` Login successful: ${user.email}`);

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ error: "Server error during login" });
  }
};
