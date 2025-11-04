// src/api/authApi.js
import { API_BASE_URL } from "./api";

export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (err) {
    console.error("Error in registerUser:", err);
    return null;
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await res.json();
  } catch (err) {
    console.error("Error in loginUser:", err);
    return null;
  }
};
