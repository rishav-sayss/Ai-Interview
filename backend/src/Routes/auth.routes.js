import express from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
  googlecallback,
} from "../controller/auth.controller.js";
import { verifyToken, isAuthenticated } from "../middleware/auth.js";
import {
  registerValidationRules,
  loginValidationRules,
} from "../validation/auth.valid.js";
import passport from "passport";
const router = express.Router();

// Public routes
router.post("/register", registerValidationRules(), register);

router.post("/login", loginValidationRules(), login);

// /api/auth/google
router.get(
  "/google",
  (req, res, next) => {
    console.log("Google route hit");
    next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  (req, res, next) => {
    console.log("Callback route hit");
    next();
  },
  (req, res, next) => {
    passport.authenticate("google", { session: false }, (error, user, info) => {
      if (error) {
        console.error("Google OAuth error:", {
          message: error.message,
          statusCode: error.statusCode,
          data: error.oauthError?.data,
        });

        return res.redirect(
          "http://localhost:5173/login?error=google_auth_failed",
        );
      }

      if (!user) {
        console.error("Google OAuth failed:", info);
        return res.redirect(
          "http://localhost:5173/login?error=google_auth_failed",
        );
      }

      req.user = user;
      next();
    })(req, res, next);
  },
  googlecallback
);

router.post("/logout", logout);

// Protected routes
router.get("/me", verifyToken, isAuthenticated, getCurrentUser);

export default router;
