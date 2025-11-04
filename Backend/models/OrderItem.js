import pool from "../config/db.js";

//  Create a new order item
export const createOrderItem = async (item) => {
  try {
    const { order_id, menu_item_id, quantity, price } = item;
    const sql = `
      INSERT INTO order_items (order_id, menu_item_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [order_id, menu_item_id, quantity, price]);
    return result;
  } catch (error) {
    console.error("Error creating order item:", error);
    throw error;
  }
};

// Get all order items by order_id (with menu item details)
export const getOrderItemsByOrder = async (order_id) => {
  try {
    const sql = `
      SELECT 
        oi.*, 
        m.item_name, 
        m.description
      FROM order_items oi
      JOIN menus m ON oi.menu_item_id = m.id
      WHERE oi.order_id = ?
    `;
    const [rows] = await pool.execute(sql, [order_id]);
    return rows;
  } catch (error) {
    console.error("Error fetching order items:", error);
    throw error;
  }
};
