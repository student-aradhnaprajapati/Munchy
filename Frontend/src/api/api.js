// src/api/api.js
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
console.log("🌐 API Base URL:", API_BASE_URL);

// Get stored auth token
export function getAuthToken() {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
}

// Generic API request
export async function apiRequest(endpoint, method = "GET", data = null, auth = false) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (data) options.body = JSON.stringify(data);

  try {
    const response = await fetch(url, options);
    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error(`🚨 API ${method} ${url} failed:`, response.status, responseData);
      throw new Error(responseData.message || `HTTP Error: ${response.status}`);
    }

    return responseData;
  } catch (err) {
    console.error(`❌ API ${method} Error:`, err.message);
    throw err;
  }
}

// Helpers
export const getData = (endpoint, auth = false) => apiRequest(endpoint, "GET", null, auth);
export const postData = (endpoint, data, auth = false) => apiRequest(endpoint, "POST", data, auth);
