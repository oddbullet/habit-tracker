import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import habitsRoutes from "./routes/habitsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/habits", habitsRoutes);
app.use("api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

connectDB();
