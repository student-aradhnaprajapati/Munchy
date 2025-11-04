import API from "./api"; // Centralized Axios instance (with baseURL, interceptors, etc.)

// Fetch all menu items
export const getMenu = async () => {
  try {
    const response = await API.get("/menu");
    return response.data;
  } catch (error) {
    console.error(" Error fetching menu:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch menu");
  }
};

//  Add a new menu item
export const addMenuItem = async (item) => {
  try {
    const response = await API.post("/menu", item);
    return response.data;
  } catch (error) {
    console.error(" Error adding menu item:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to add menu item");
  }
};

//  Update a menu item (Recommended to include this)
export const updateMenuItem = async (id, updatedItem) => {
  try {
    const response = await API.put(`/menu/${id}`, updatedItem);
    return response.data;
  } catch (error) {
    console.error("Error updating menu item:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update menu item");
  }
};

//  Delete a menu item
export const deleteMenuItem = async (id) => {
  try {
    const response = await API.delete(`/menu/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting menu item:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete menu item");
  }
};
