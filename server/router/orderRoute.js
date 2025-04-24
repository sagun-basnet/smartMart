import express from "express";
import {
  getOrders,
  getOrdersByUser,
  cancelOrder,
  getDeliveredOrdersByUser,
  updateOrder,
} from "../controller/order.js";

const router = express.Router();

router.get("/get-orders", getOrders);
router.get("/get-orders-by-user/:user_id", getOrdersByUser);
router.get("/orders/delivered/:user_id", getDeliveredOrdersByUser);
router.post("/cancel-order/:id", cancelOrder);
router.post("/update-order/:id", updateOrder);

export default router;
