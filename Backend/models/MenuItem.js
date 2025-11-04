import pool from "../config/db.js";

export const createMenuItem = async ({ provider_id, item_name, description, price, available_date }) => {
  const [result] = await pool.query(
    `INSERT INTO menus (provider_id, item_name, description, price, available_date)
     VALUES (?, ?, ?, ?, ?)`,
    [provider_id, item_name, description ?? null, price, available_date ?? null]
  );
  return result;
};

export const getMenuItems = async (provider_id = null) => {
  const query = provider_id
    ? `SELECT * FROM menus WHERE provider_id = ?`
    : `SELECT * FROM menus`;
  const [rows] = provider_id
    ? await pool.query(query, [provider_id])
    : await pool.query(query);
  return rows;
};


export const getMenuItemById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM menus WHERE id = ?`, [id]);
  return rows.length > 0 ? rows[0] : null;
};


export const updateMenuItem = async (id, { item_name, description, price, available_date }) => {
  const [result] = await pool.query(
    `UPDATE menus 
     SET item_name = ?, description = ?, price = ?, available_date = ? 
     WHERE id = ?`,
    [item_name, description ?? null, price, available_date ?? null, id]
  );
  return result;
};

export const deleteMenuItem = async (id) => {
  const [result] = await pool.query(`DELETE FROM menus WHERE id = ?`, [id]);
  return result;
};
