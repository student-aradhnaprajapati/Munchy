import express from "express";
import { addMess, fetchAllMess, fetchMessById, editMess } from "../controllers/messController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, addMess);
router.put("/:id", authenticateToken, editMess);

router.get("/", fetchAllMess);
router.get("/:id", fetchMessById);

export default router;

