import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import habitReducer from "../features/habits/habitSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    habit: habitReducer,
  },
});
