import express from "express";
import {
  addMenuItem,
  fetchMenuItems,
  fetchMenuItemById,
  editMenuItem,
  removeMenuItem,
} from "../controllers/menuController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/", authenticateToken, addMenuItem);
router.get("/", fetchMenuItems);
router.get("/mess/:mess_id", fetchMenuItems);
router.get("/item/:id", fetchMenuItemById);
router.put("/:id", authenticateToken, editMenuItem);
router.delete("/:id", authenticateToken, removeMenuItem);

export default router;
