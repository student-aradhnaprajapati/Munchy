import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { getUserProfile, updateUserProfile, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/", authenticateToken, getAllUsers);
router.get("/profile", authenticateToken, getUserProfile);
router.put("/profile", authenticateToken, updateUserProfile);

export default router;
