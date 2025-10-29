import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import habitReducer from "../features/habits/habitSlice";
import demoReducer from "../features/demo/demoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    habit: habitReducer,
    demo: demoReducer,
  },
});
