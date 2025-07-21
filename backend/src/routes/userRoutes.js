import express from "express";
import {
  getMe,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
