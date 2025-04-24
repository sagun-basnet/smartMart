import express from "express";
import {
  getAllTransactions,
  getTotalTransactionAmount,
  getTransactionsByUser,
} from "../controller/transaction.js";

const router = express.Router();

router.get("/get-transactions", getAllTransactions);
router.get("/total", getTotalTransactionAmount);
router.get("/user/:user_id", getTransactionsByUser);

export default router;
