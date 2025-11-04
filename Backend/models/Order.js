import pool from "../config/db.js";

// ✅ Create new order
export const createOrder = async (order) => {
  try {
    const { user_id, provider_id, total_price, status } = order;
    const sql = `
      INSERT INTO orders (user_id, provider_id, total_price, status, order_date)
      VALUES (?, ?, ?, ?, NOW())
    `;
    const [result] = await pool.execute(sql, [user_id, provider_id, total_price, status]);
    return result;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// ✅ Fetch all orders for a specific user
export const getOrdersByUser = async (user_id) => {
  try {
    const sql = `
      SELECT o.*, m.name AS mess_name
      FROM orders o
      JOIN mess m ON o.provider_id = m.id
      WHERE o.user_id = ?
      ORDER BY o.order_date DESC
    `;
    const [rows] = await pool.execute(sql, [user_id]);
    return rows;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

// ✅ Fetch all orders (for admin)
export const getAllOrders = async () => {
  try {
    const sql = `
      SELECT o.*, u.name AS user_name, m.name AS mess_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN mess m ON o.provider_id = m.id
      ORDER BY o.order_date DESC
    `;
    const [rows] = await pool.execute(sql);
    return rows;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

// ✅ Update order status
export const updateOrderStatus = async (id, status) => {
  try {
    const sql = "UPDATE orders SET status = ? WHERE id = ?";
    const [result] = await pool.execute(sql, [status, id]);
    return result;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};
