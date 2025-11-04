// src/services/api.js
import axios from "axios";

// ✅ Create base Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// ✅ Interceptor to automatically attach JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔑 Attached Token:", token.substring(0, 20) + "..."); // debug log
    } else {
      console.warn("⚠️ No token found in localStorage");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response logger for debugging
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("🚨 API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ===== Auth APIs =====
export const loginUser = async (credentials) => {
  const { data } = await API.post("/auth/login", credentials);
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await API.post("/auth/register", userData);
  return data;
};

// ===== Orders APIs =====
export const getOrders = async () => {
  const { data } = await API.get("/orders");
  return data;
};

export const getUserOrders = async (userId) => {
  const { data } = await API.get(`/orders/user/${userId}`);
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const { data } = await API.put(`/orders/${id}`, { status });
  return data;
};

// ===== Reviews APIs =====
export const getReviews = async () => {
  const { data } = await API.get("/reviews");
  return data;
};

export const addReview = async (review) => {
  const { data } = await API.post("/reviews", review);
  return data;
};

// ===== Admin APIs =====
export const getUsers = async () => {
  const { data } = await API.get("/admin/users");
  return data;
};

export const getProviders = async () => {
  const { data } = await API.get("/admin/providers");
  return data;
};

export const getReports = async () => {
  const { data } = await API.get("/admin/reports");
  return data;
};

export default API;
