// services/reviewService.js
import API from "./api"; // your Axios instance

// Fetch all reviews
export const getReviews = async () => {
  try {
    const { data } = await API.get("/reviews");
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error.response?.data || error.message);
    throw error;
  }
};

// Add a new review
export const addReview = async (review) => {
  try {
    const { data } = await API.post("/reviews", review);
    return data;
  } catch (error) {
    console.error("Error adding review:", error.response?.data || error.message);
    throw error;
  }
};
