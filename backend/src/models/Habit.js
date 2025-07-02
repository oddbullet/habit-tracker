import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  start_date: {
    type: String,
    required: true,
  },
  completed_dates: {
    type: [String],
    required: true,
  },
  streak: {
    type: Number,
    required: true,
  },
  goal_per_week: {
    type: Number,
    required: true,
  },
});

const Habit = mongoose.model("Habit", habitSchema);

export default Habit;
