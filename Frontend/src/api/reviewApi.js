// src/api/reviewApi.js
import { API_BASE_URL } from "./api";

// Get all reviews (for admin or mess)
export const getAllReviews = async (token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch reviews");
    return await res.json();
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return null;
  }
};

//  Get reviews for a specific mess
export const getMessReviews = async (messId, token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews/mess/${messId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch mess reviews");
    return await res.json();
  } catch (err) {
    console.error(`Error fetching reviews for mess ${messId}:`, err);
    return null;
  }
};

//  Get reviews by a specific user
export const getUserReviews = async (userId, token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch user reviews");
    return await res.json();
  } catch (err) {
    console.error(`Error fetching reviews for user ${userId}:`, err);
    return null;
  }
};

//  Add a new review
export const addReview = async (reviewData, token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    });
    return await res.json();
  } catch (err) {
    console.error("Error adding review:", err);
    return null;
  }
};

// ✅ Delete a review
export const deleteReview = async (reviewId, token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err) {
    console.error("Error deleting review:", err);
    return null;
  }
};
