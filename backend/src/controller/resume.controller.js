 import pdfParse from "pdf-parse";
import { analyzeResume } from "../aiservice/ai.service.js";

// ─── Constants ────────────────────────────────────────────────────────────────

const VALID_INTERVIEW_TYPES = new Set([
  "Technical Interview",
  "Behavioral Interview",
  "System Design",
  "HR Interview",
]);

// ─── Normalization helpers ────────────────────────────────────────────────────
//
// Gemini is prompted to return the correct shape, but we still normalize
// defensively in case the AI drifts slightly from the expected format.

// Ensures interviewType is always one of the four valid values.
const normalizeInterviewType = (value = "") => {
  if (VALID_INTERVIEW_TYPES.has(value)) return value;

  const lower = value.toLowerCase();
  if (lower.includes("system"))   return "System Design";
  if (lower.includes("behavior")) return "Behavioral Interview";
  if (lower.includes("hr"))       return "HR Interview";

  return "Technical Interview"; // safe default
};

// Ensures skills and projects are always a clean string array.
const toStringArray = (value) =>
  Array.isArray(value)
    ? value.map((item) => String(item).trim()).filter(Boolean)
    : [];

// Combines all normalization into one call.
const normalizeResumeData = (data) => ({
  role:          String(data.role || "").trim(),
  experience:    String(data.experience || "").trim(),
  interviewType: normalizeInterviewType(data.interviewType),
  skills:        toStringArray(data.skills),
  projects:      toStringArray(data.projects),
});

// ─── Controller ───────────────────────────────────────────────────────────────

export const uploadResume = async (req, res) => {
  try {
    // 1. Check a file was actually attached to the request.
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required.",
      });
    }

    // 2. Extract plain text from the uploaded PDF buffer.
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text?.trim();

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from this PDF. Try a different file.",
      });
    }

    // 3. Send the resume text to Gemini.
    //    analyzeResume() returns a parsed JS object — no JSON.parse() needed here.
    const rawData = await analyzeResume(resumeText);

    // 4. Normalize the AI output into a guaranteed-clean shape.
    const data = normalizeResumeData(rawData);

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      data,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong. Please try again.",
    });
  }
};