import pdfParse from "pdf-parse";
import { analyzeResume } from "../aiservice/ai.service.js";

const VALID_INTERVIEW_TYPES = new Set([
  "Technical Interview",
  "Behavioral Interview",
  "System Design",
  "HR Interview",
]);

const extractJson = (value) => {
  const text = String(value || "")
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end < start) {
    throw new Error("AI returned an invalid response");
  }

  return text.slice(start, end + 1);
};

const toStringArray = (value) => {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (item && typeof item === "object") {
        return item.name || item.title || item.position || item.description || "";
      }
      return "";
    })
    .filter(Boolean);
};

const normalizeExperience = (value) => {
  if (typeof value === "string") return value.trim();
  if (!Array.isArray(value) || value.length === 0) return "";

  return value
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (!item || typeof item !== "object") return "";

      return [item.position, item.company, item.duration].filter(Boolean).join(" - ");
    })
    .filter(Boolean)
    .join(", ");
};

const normalizeInterviewType = (value) => {
  if (VALID_INTERVIEW_TYPES.has(value)) return value;

  const normalized = String(value || "").toLowerCase();
  if (normalized.includes("system")) return "System Design";
  if (normalized.includes("behavior") || normalized.includes("hr")) return "Behavioral Interview";

  return "Technical Interview";
};

const normalizeResumeData = (data) => ({
  role: typeof data.role === "string" ? data.role.trim() : "",
  experience: normalizeExperience(data.experience),
  interviewType: normalizeInterviewType(data.interviewType),
  skills: toStringArray(data.skills),
  projects: toStringArray(data.projects),
});

const parseAiResponse = (aiResponse) => {
  const json = extractJson(aiResponse);
  return normalizeResumeData(JSON.parse(json));
};

export const uploadResume = async (req, res) => {
  try {
    console.log("[Resume] Upload request received");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required.",
      });
    }

    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text?.trim();

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from this PDF.",
      });
    }

    const aiResponse = await analyzeResume(resumeText);
    const data = parseAiResponse(aiResponse);

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      data,
    });
  } catch (error) {
    console.error("[Resume] Analysis failed:", error.message);

    const isConfigError =
      error.message.includes("GEMINI_API_KEY") ||
      error.message.includes("Google AI Studio");

    return res.status(isConfigError ? 503 : 500).json({
      success: false,
      message: isConfigError
        ? "AI resume analysis is not configured. Please add a valid Gemini API key in backend/.env and restart the backend server."
        : "Could not analyze the resume. Please try again or fill the fields manually.",
      error: error.message,
    });
  }
};
