import { createSlice } from "@reduxjs/toolkit";
import demoData from "../../data/demo.json";

const initialState = {
  habits: demoData,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const demoSlice = createSlice({
  name: "demoHabit",
  initialState,
  reducers: {
    createDemoHabit: (state, action) => {
      const newHabit = {
        ...action.payload,
        _id: Date.now().toString(),
      };
      state.habits.push(newHabit);
      state.isSuccess = true;
    },

    updateDemoHabitTitle: (state, action) => {
      const { id, title } = action.payload;
      const habitIndex = state.habits.findIndex((h) => h._id == id);
      if (habitIndex !== -1) {
        state.habits[habitIndex].title = title;
      }
    },
    updateDemoHabitCompleteDate: (state, action) => {
      const { date, id } = action.payload;
      console.log(id);
      const habitIndex = state.habits.findIndex((h) => h._id == id);
      if (habitIndex !== -1) {
        state.habits[habitIndex].completed_dates.push(date);
        state.habits[habitIndex].completed_dates.sort();
      }
    },
    deleteDemoHabitCompleteDate: (state, action) => {
      const { date, id } = action.payload;
      const habitIndex = state.habits.findIndex((h) => h._id == id);
      if (habitIndex !== -1) {
        state.habits[habitIndex].completed_dates = state.habits[
          habitIndex
        ].completed_dates.filter((d) => d !== date);
        console.log(state.habits);
      }
    },
    deleteDemoHabit: (state, action) => {
      state.habits = state.habits.filter((h) => h._id !== action.payload);
    },
    resetDemoData: (state) => {
      state.habits = demoData;
    },
    resetDemo: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
});

export const {
  createDemoHabit,
  updateDemoHabitTitle,
  updateDemoHabitCompleteDate,
  deleteDemoHabitCompleteDate,
  deleteDemoHabit,
  resetDemoHabit,
  resetDemo,
} = demoSlice.actions;

export default demoSlice.reducer;
