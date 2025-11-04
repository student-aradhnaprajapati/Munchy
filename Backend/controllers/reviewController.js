// controllers/reviewController.js
import { addReview as addReviewModel, getReviewsByMess } from "../models/Review.js";

export const addReview = async (req, res) => {
  try {
    const { user_id, provider_id, rating, comment } = req.body;

    if (!user_id || !provider_id || rating == null) {
      return res.status(400).json({
        message: "user_id, provider_id, and rating are required",
      });
    }

    const result = await addReviewModel({ user_id, provider_id, rating, comment });
    res.status(201).json({ message: "Review added successfully", result });
  } catch (error) {
    console.error("Error adding review:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const { provider_id } = req.params;
    const reviews = await getReviewsByMess(provider_id);
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ message: error.message });
  }
};
