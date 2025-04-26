import express from "express";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/user.routes.js";

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://smart-blood-donation-system.vercel.app/"
        : "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" })); // Increase to 5MB or more as needed
app.use(express.urlencoded({ limit: "10mb", extended: true }));


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(PORT, async (req, res) => {
  connectDB();
  console.log(process.env.NODE_ENV);
  console.log(`app listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
