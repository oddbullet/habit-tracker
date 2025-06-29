import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

const app = express();

dotenv.config();

app.listen(5001, () => {
  console.log("Server started on PORT: 5001");
});

connectDB();
