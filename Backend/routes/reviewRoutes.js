import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { getAllReviews, addReview } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", authenticateToken, getAllReviews);

router.post("/", authenticateToken, addReview);

export default router;
