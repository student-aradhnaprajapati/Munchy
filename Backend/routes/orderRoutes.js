import express from "express";
import {
  placeOrder,
  fetchUserOrders,
  fetchAllOrdersAdmin,
  changeOrderStatus,
} from "../controllers/orderController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, placeOrder);

router.get("/user", authenticateToken, fetchUserOrders);

router.get("/user/:userId", authenticateToken, fetchUserOrders);

router.get("/", authenticateToken, fetchAllOrdersAdmin);

router.put("/:id/status", authenticateToken, changeOrderStatus);

export default router;