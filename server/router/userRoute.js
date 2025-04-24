import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updatePassword,
} from "../controller/user.js";

const router = express.Router();

router.get("/get-all-user", getAllUsers);
router.get("/get-user-by-id/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.put("/update-password/:id", updatePassword);

export default router;
