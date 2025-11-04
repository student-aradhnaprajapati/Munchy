import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Use secret from .env or fallback to a safe default (for development only)
const SECRET_KEY = process.env.JWT_SECRET || "fallback_dev_secret";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // token expires in 1 hour
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Invalid or expired token:", error.message);
    return null;
  }
};
