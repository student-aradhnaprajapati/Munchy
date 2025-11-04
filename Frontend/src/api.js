const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000/api";

console.log("API Base URL:", API_BASE_URL);

// et token from localStorage or sessionStorage
function getAuthToken() {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
}

// Main reusable API request function
export async function apiRequest(endpoint, method = "GET", data = null, auth = false) {
  if (!endpoint) throw new Error("API endpoint is required");

  // Fix: remove accidental duplicate base URL if user passes a full path
  let cleanEndpoint = endpoint.replace(API_BASE_URL, "").trim();

  //  Ensure it starts with a single slash
  if (!cleanEndpoint.startsWith("/")) cleanEndpoint = `/${cleanEndpoint}`;

  // Combine clean base and endpoint to form final URL
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  const headers = { "Content-Type": "application/json" };

  // Add bearer token if required
  if (auth) {
    const token = getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    credentials: "include", // support cookies/sessions
  };

  if (data) options.body = JSON.stringify(data);

  console.log(`[${method}] ${url}`);
  if (data) console.log(" Payload:", data);

  try {
    const response = await fetch(url, options);
    console.log(" Response Status:", response.status);

    // Handle non-OK responses
    if (!response.ok) {
      const errorText = await response.text();
      console.error(` HTTP ${response.status} - ${response.statusText}`);
      console.error("Server Message:", errorText);
      throw new Error(errorText || "API request failed");
    }

    //  Parse response safely
    const responseData = await response.json().catch(() => ({}));
    console.log(" Response Data:", responseData);
    return responseData;
  } catch (error) {
    console.error(` API ${method} Error:`, error.message);
    return { error: true, message: error.message };
  }
}

// Helper wrappers
export async function getData(endpoint, auth = false) {
  return await apiRequest(endpoint, "GET", null, auth);
}

export async function postData(endpoint, data, auth = false) {
  return await apiRequest(endpoint, "POST", data, auth);
}

export async function putData(endpoint, data, auth = false) {
  return await apiRequest(endpoint, "PUT", data, auth);
}

export async function deleteData(endpoint, auth = false) {
  return await apiRequest(endpoint, "DELETE", null, auth);
}
