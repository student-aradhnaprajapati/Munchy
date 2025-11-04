import pool from "../config/db.js";

export const createMess = async ({ name, address, contact }) => {
  const [result] = await pool.query(
    `INSERT INTO mess (name, address, contact) VALUES (?, ?, ?)`,
    [name, address, contact]
  );
  return result;
};

export const getAllMess = async () => {
  const [rows] = await pool.query(`SELECT * FROM mess`);
  return rows;
};

export const getMessById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM mess WHERE id = ?`, [id]);
  return rows.length > 0 ? rows[0] : null;
};

export const updateMess = async (id, { name, address, contact }) => {
  const [result] = await pool.query(
    `UPDATE mess SET name = ?, address = ?, contact = ? WHERE id = ?`,
    [name, address, contact, id]
  );
  return result;
};
