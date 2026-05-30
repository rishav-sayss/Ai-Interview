import express from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controller/auth.controller.js";
import { verifyToken, isAuthenticated } from "../middleware/auth.js";
import {
  registerValidationRules,
  loginValidationRules,
} from "../validation/auth.valid.js";

const router = express.Router();

// Public routes
router.post(
  "/register",
  registerValidationRules(),
  register
);
router.post("/login", loginValidationRules() , login);
router.post("/logout", logout);

// Protected routes
router.get("/me", verifyToken, isAuthenticated, getCurrentUser);

export default router;
