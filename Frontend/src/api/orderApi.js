// src/api/orderApi.js
import { API_BASE_URL, getAuthToken } from "./api";

/**
 * ✅ Get all orders (Admin or Mess)
 */
export const getAllOrders = async (token = getAuthToken()) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching all orders:", err.message);
    return null;
  }
};

/**
 * ✅ Get orders for a specific user
 *    (Uses /orders/user/:userId — backend must support this)
 */
export const getUserOrders = async (userId, token = getAuthToken()) => {
  try {
    if (!userId) throw new Error("User ID is required for fetching orders");

    const res = await fetch(`${API_BASE_URL}/orders/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`Failed to fetch user orders: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`❌ Error fetching orders for user ${userId}:`, err.message);
    return null;
  }
};

/**
 * ✅ Place a new order
 */
export const placeOrder = async (orderData, token = getAuthToken()) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) throw new Error(`Failed to place order: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("❌ Error placing order:", err.message);
    return null;
  }
};

/**
 * ✅ Update order status (for Mess or Admin)
 */
export const updateOrderStatus = async (orderId, status, token = getAuthToken()) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) throw new Error(`Failed to update order: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`❌ Error updating order ${orderId}:`, err.message);
    return null;
  }
};

/**
 * ✅ Cancel an order (for user)
 */
export const cancelOrder = async (orderId, token = getAuthToken()) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`Failed to cancel order: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`❌ Error canceling order ${orderId}:`, err.message);
    return null;
  }
};
