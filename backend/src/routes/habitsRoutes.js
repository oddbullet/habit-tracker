import express from "express";
import {
  getAllHabits,
  createHabit,
  updateHabitTitle,
  updateHabitCompleteDate,
  deleteHabit,
} from "../controllers/habitsController.js";

const router = express.Router();

router.get("/", getAllHabits);
router.post("/", createHabit);
router.put("/title/:id", updateHabitTitle);
router.put("/date/:id", updateHabitCompleteDate);
router.delete("/delete/:id", deleteHabit);

export default router;
