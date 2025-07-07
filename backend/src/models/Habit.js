import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
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
