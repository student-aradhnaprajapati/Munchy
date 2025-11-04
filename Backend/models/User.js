import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// ✅ Generate JWT token
export const generateToken = (user) => {
  try {
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token valid for 1 day
    );
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};

// ✅ Verify JWT token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw error;
  }
};
