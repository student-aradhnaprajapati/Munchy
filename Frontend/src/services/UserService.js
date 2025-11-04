import API from "./api"; // Axios instance with token handling

// ✅ Fetch all users (for Admin)
export const getAllUsers = async () => {
  try {
    const { data } = await API.get("/admin/users");
    return data;
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch single user by ID
export const getUserById = async (userId) => {
  try {
    const { data } = await API.get(`/admin/users/${userId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error.response?.data || error.message);
    throw error;
  }
};

// ✅ Delete user
export const deleteUser = async (userId) => {
  try {
    const { data } = await API.delete(`/admin/users/${userId}`);
    return data;
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error.response?.data || error.message);
    throw error;
  }
};

// ✅ Update user info (optional)
export const updateUser = async (userId, updatedData) => {
  try {
    const { data } = await API.put(`/admin/users/${userId}`, updatedData);
    return data;
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error.response?.data || error.message);
    throw error;
  }
};
