import {
  createOrder,
  getOrdersByUser,
  updateOrderStatus,
  getAllOrders,
} from "../models/Order.js";
import { createOrderItem } from "../models/OrderItem.js";

// Place order
export const placeOrder = async (req, res) => {
  try {
    const { user_id, provider_id, items } = req.body;

    if (!user_id || !provider_id || !items?.length) {
      return res
        .status(400)
        .json({ message: "user_id, provider_id, and items are required" });
    }

    let total_price = 0;
    items.forEach((item) => (total_price += item.price * item.quantity));

    const orderResult = await createOrder({
      user_id,
      provider_id,
      total_price,
      status: "pending",
    });
    const order_id = orderResult.insertId;

    for (const item of items) {
      await createOrderItem({
        order_id,
        menu_id: item.menu_id,
        quantity: item.quantity,
        price: item.price,
      });
    }

    res.status(201).json({ message: "Order placed successfully", order_id });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get user orders
export const fetchUserOrders = async (req, res) => {
  try {
    // If route has param (admin usage) use that; otherwise use token user
    const user_id = req.params.userId || req.user?.id;

    if (!user_id) {
      return res.status(400).json({ message: "User ID not found" });
    }

    const orders = await getOrdersByUser(user_id);
    res.json({ orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all orders (for admin)
export const fetchAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update order status
export const changeOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!id || !status)
      return res
        .status(400)
        .json({ message: "Order ID and status are required" });

    const result = await updateOrderStatus(id, status);
    res.json({ message: "Order status updated", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

