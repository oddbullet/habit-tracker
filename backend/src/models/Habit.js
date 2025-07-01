import mongoose, { mongo } from "mongoose";

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  start_date: {
    type: String,
    require: true,
  },
  completed_dates: {
    type: [],
    require: true,
  },
  streak: {
    type: Number,
    require: true,
  },
  goal_per_week: {
    type: Number,
    require: true,
  },
});

const Habit = mongoose.model("Habit", habitSchema);

export default Habit;
