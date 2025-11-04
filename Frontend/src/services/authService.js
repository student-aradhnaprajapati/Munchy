// src/services/authService.js
import API from "./api"; // ✅ Axios instance with baseURL + interceptors

// === Register User ===
export const registerUser = async (userData) => {
  try {
    const { data } = await API.post("/auth/register", userData);
    console.log("✅ User registered successfully:", data);
    return data;
  } catch (error) {
    console.error("❌ Registration failed:", error.response?.data || error.message);
    throw error.response?.data || { message: "Registration failed" };
  }
};

// === Login User ===
export const loginUser = async (credentials) => {
  try {
    const { data } = await API.post("/auth/login", credentials);
    console.log("✅ Login successful:", data);
    return data;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};
