// src/api/menuApi.js
import { API_BASE_URL } from "./api";

// Fetch all menus
export const getMenus = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/menu`);
    if (!res.ok) throw new Error("Failed to fetch menus");
    return await res.json();
  } catch (err) {
    console.error("Error fetching menus:", err);
    return null;
  }
};

// Fetch single menu by ID
export const getMenuById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/menu/${id}`);
    if (!res.ok) throw new Error("Failed to fetch menu");
    return await res.json();
  } catch (err) {
    console.error(`Error fetching menu ${id}:`, err);
    return null;
  }
};

// Add a new menu item (Admin)
export const addMenu = async (menuData, token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(menuData),
    });
    return await res.json();
  } catch (err) {
    console.error("Error adding menu:", err);
    return null;
  }
};

// Update a menu item
export const updateMenu = async (id, menuData, token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(menuData),
    });
    return await res.json();
  } catch (err) {
    console.error("Error updating menu:", err);
    return null;
  }
};

// Delete a menu item
export const deleteMenu = async (id, token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error("Error deleting menu:", err);
    return null;
  }
};
