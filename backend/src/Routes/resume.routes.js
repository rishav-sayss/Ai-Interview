import express from "express";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdfParse from "pdf-parse";
import { uploadResume } from "../controller/resume.controller.js";

const router = express.Router();

// Store file in memory (no disk writes)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed"), false);
  },
});

router.post("/analyze", upload.single("resume"), uploadResume);

export default router;
