import pool from "../config/db.js";

export const getUserProfile = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name, email, role FROM users WHERE id = ?", [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    await pool.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, req.user.id]);
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name, email, role FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
