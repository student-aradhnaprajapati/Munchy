import API from "./api"; // Axios instance with baseURL & interceptors

// ✅ Fetch all orders (for admin or mess)
export const getOrders = async () => {
  try {
    const response = await API.get("/orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch orders for a specific user
export const getUserOrders = async (userId) => {
  try {
    const response = await API.get(`/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching orders for user ${userId}:`, error.response?.data || error.message);
    throw error;
  }
};

// ✅ Create a new order
export const createOrder = async (orderData) => {
  try {
    const response = await API.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Update order status (for admin or provider)
export const updateOrderStatus = async (id, status) => {
  try {
    const response = await API.put(`/orders/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Cancel an order (for user)
export const cancelOrder = async (orderId) => {
  try {
    const response = await API.delete(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error canceling order:", error.response?.data || error.message);
    throw error;
  }
};
