import API from "./api"; // Reuse Axios instance with baseURL and interceptors


export const getMenu = async () => {
  try {
    const { data } = await API.get("/menu");
    return data;
  } catch (error) {
    console.error("Error fetching menu:", error.response?.data || error.message);
    throw error;
  }
};

export const addMenuItem = async (item) => {
  try {
    const { data } = await API.post("/menu", item);
    return data;
  } catch (error) {
    console.error("Error adding menu item:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteMenuItem = async (id) => {
  try {
    const { data } = await API.delete(`/menu/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting menu item:", error.response?.data || error.message);
    throw error;
  }
};
