import express from "express";
import { loginUser, registerUser } from "../controllers/userController";

const router = express.Router();

router.post("/login", loginUser);
router.post("/", registerUser);

export default router;
