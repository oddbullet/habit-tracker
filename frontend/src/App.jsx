import { useState } from "react";
import { Routes, Route } from "react-router";

import LandingPage from "./pages/LandingPage";
import HabitPage from "./pages/HabitPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewHabitPage from "./pages/NewHabitPage";
import StatPage from "./pages/StatPage";
import EditHabitPage from "./pages/EditHabitPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/habit" element={<HabitPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/new" element={<NewHabitPage />}></Route>
      <Route path="/stat/:habitId" element={<StatPage />}></Route>
      <Route path="/editHabit/:habitId" element={<EditHabitPage />}></Route>
    </Routes>
  );
}

export default App;
