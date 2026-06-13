import express from "express";
import multer from "multer";
import { uploadResume } from "../controller/resume.controller.js";

const resumeRouter = express.Router();

// Store file in memory (no disk writes)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed"), false);
  },
});

const handleResumeUpload = (req, res, next) => {
  upload.single("resume")(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    const isFileTooLarge = error.code === "LIMIT_FILE_SIZE";

    res.status(400).json({
      success: false,
      message: isFileTooLarge
        ? "Resume must be smaller than 10 MB."
        : error.message || "Invalid resume upload.",
    });
  });
};

resumeRouter.post("/analyze", handleResumeUpload, uploadResume);

export default resumeRouter;
