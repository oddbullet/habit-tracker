import { useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import { useSelector } from "react-redux";

import LandingPage from "./pages/LandingPage";
import HabitPage from "./pages/HabitPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewHabitPage from "./pages/NewHabitPage";
import StatPage from "./pages/StatPage";
import EditHabitPage from "./pages/EditHabitPage";

import "./App.css";

function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>

      <Route
        path="/habit"
        element={
          <PrivateRoute>
            <HabitPage />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/new"
        element={
          <PrivateRoute>
            <NewHabitPage />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/stat/:habitId"
        element={
          <PrivateRoute>
            <StatPage />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/editHabit/:habitId"
        element={
          <PrivateRoute>
            <EditHabitPage />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;
