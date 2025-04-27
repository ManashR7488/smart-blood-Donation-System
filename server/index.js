import express from "express";
import cors from "cors";
import { app, server } from "./src/config/socket.js";
const PORT = process.env.PORT || 5000;
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
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
app.use(cookieParser())
app.use(express.json({ limit: "10mb" })); // Increase to 5MB or more as needed
app.use(express.urlencoded({ limit: "10mb", extended: true }));


app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("hello world!");
});

server.listen(PORT, async (req, res) => {
  connectDB();
  console.log(process.env.NODE_ENV);
  console.log(`app listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
