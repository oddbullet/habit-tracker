import express from "express";
import {
  getMe,
  loginUser,
  registerUser,
  verifyUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/me", authMiddleware, getMe);
router.get("/verify", authMiddleware, verifyUser);
router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
