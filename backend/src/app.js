import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/auth.routes.js";

const app = express();
 app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
 }))
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

export default app;
