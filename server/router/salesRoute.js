import express from "express";
import {
  getSales,
  getSalesByUser,
  markAsDelivered,
} from "../controller/sales.js";

const router = express.Router();

router.get("/get-sales", getSales);
router.get("/get-sales-by-user/:user_id", getSalesByUser);
router.post("/mark-as-delivered/:id", markAsDelivered);

export default router;
