import pool from "../config/db.js";

// Add a new review
export const addReview = async (review) => {
  try {
    const { user_id, mess_id, rating, comment } = review;
    const sql = `
      INSERT INTO reviews (user_id, mess_id, rating, comment)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [user_id, mess_id, rating, comment]);
    return result;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

//  Get all reviews for a specific mess (with user name)
export const getReviewsByMess = async (mess_id) => {
  try {
    const sql = `
      SELECT 
        r.*, 
        u.name AS user_name 
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.mess_id = ?
      ORDER BY r.id DESC
    `;
    const [rows] = await pool.execute(sql, [mess_id]);
    return rows;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
