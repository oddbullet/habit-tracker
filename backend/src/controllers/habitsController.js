import Habit from "../models/Habit.js";

// Format YYYY-MM-DD
function getLocalDate() {
  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${date.getFullYear()}-${month}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;
}

function checkAuth(req, habit) {
  if (!req.user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!habit) {
    res.status(404);
    throw new Error("Habit not found");
  }

  if (habit.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
}

/**
 * @description Get all user habits
 * @route GET api/habits
 * @access Private
 */
export async function getAllHabits(req, res) {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.status(200).json(habits);
  } catch (error) {
    console.error("Error in getAllHabit controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @description Create habit
 * @route POST api/habits
 * @access Private
 */
export async function createHabit(req, res) {
  try {
    const { title, goal_per_week } = req.body;
    const start_date = getLocalDate();
    const habit = new Habit({
      user: req.user.id,
      title,
      start_date,
      completed_dates: [],
      streak: 0,
      goal_per_week,
    });

    const savedHabit = await habit.save();
    res.status(201).json(savedHabit);
  } catch (error) {
    console.error("Error in createHabit controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @description Update the habit title
 * @route PUT api/habits/title/:id
 * @access Private
 */
export async function updateHabitTitle(req, res) {
  try {
    const { title } = req.body;

    checkAuth(req, await Habit.findById(req.params.id));

    const updateHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );

    if (!updateHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.status(200).json(updateHabit);
  } catch (error) {
    console.error("Error in updateHabitTitle", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @description Update the habit completion status
 * @route PUT api/habits/date/:id
 * @access Private
 */
export async function updateHabitCompleteDate(req, res) {
  try {
    const { date } = req.body;

    checkAuth(req, await Habit.findById(req.params.id));

    const updateHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { completed_dates: date },
      },
      { new: true }
    );

    if (!updateHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.status(200).json(updateHabit);
  } catch (error) {
    console.error("Error in updateHabitCompleteDate", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @description Delete the habit
 * @route DELETE api/habits/delete/:id
 * @access Private
 */
export async function deleteHabit(req, res) {
  try {
    checkAuth(req, await Habit.findById(req.params.id));

    const deleteHabit = await Habit.findByIdAndDelete(req.params.id);

    if (!deleteHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    return res.status(200).json({ message: "Habit deleted" });
  } catch (error) {
    console.error("Error in deleteHabit controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
