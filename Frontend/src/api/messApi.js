// src/api/messApi.js
import { API_BASE_URL } from "./api";

// ✅ Get all messes
export const getAllMesses = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/mess`);
    if (!res.ok) throw new Error("Failed to fetch mess list");
    return await res.json();
  } catch (err) {
    console.error("Error fetching mess list:", err);
    return null;
  }
};

// ✅ Get single mess by ID
export const getMessById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/mess/${id}`);
    if (!res.ok) throw new Error("Failed to fetch mess details");
    return await res.json();
  } catch (err) {
    console.error(`Error fetching mess ${id}:`, err);
    return null;
  }
};

// ✅ Add a new mess (Admin or Provider)
export const addMess = async (messData, token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/mess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(messData),
    });
    return await res.json();
  } catch (err) {
    console.error("Error adding mess:", err);
    return null;
  }
};

// ✅ Update existing mess
export const updateMess = async (id, messData, token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/mess/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(messData),
    });
    return await res.json();
  } catch (err) {
    console.error("Error updating mess:", err);
    return null;
  }
};

// ✅ Delete a mess
export const deleteMess = async (id, token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/mess/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error("Error deleting mess:", err);
    return null;
  }
};
