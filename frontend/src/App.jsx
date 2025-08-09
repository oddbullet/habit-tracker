import { useState } from "react";
import { Routes, Route } from "react-router";

import LandingPage from "./pages/LandingPage";
import HabitPage from "./pages/HabitPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewHabitPage from "./pages/NewHabitPage";
import StatPage from "./pages/StatPage";

import "./App.css";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<LandingPage />}></Route> */}
      <Route path="/habit" element={<HabitPage />}></Route>
      {/* Need to replace later with landing page */}
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/new" element={<NewHabitPage />}></Route>
      <Route path="/stat/:habitId" element={<StatPage />}></Route>
    </Routes>
  );
}

export default App;
