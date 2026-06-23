 import "../config/env.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── Step 1: Read the API key once at startup ─────────────────────────────────
//
// If the key is missing, we throw immediately when the module loads —
// not silently later when a function is called.

const API_KEY = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "").trim();

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is missing. Add it to backend/.env");
}

// ─── Step 2: Create the client ONCE (not on every function call) ──────────────
//
// Creating a new GoogleGenerativeAI instance on every request wastes memory.
// This single instance is reused for the lifetime of the server.

const geminiModel = new GoogleGenerativeAI(API_KEY).getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json", // tells Gemini to always return JSON
  },
});

// ─── Step 3: Helper — call the API and parse the JSON response ────────────────
//
// Both functions below need the same two steps:
//   1. Send a prompt to Gemini
//   2. Parse the returned JSON string into a JavaScript object
//
// Centralising this means error handling lives in one place.

async function callGemini(prompt) {
  const result = await geminiModel.generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Gemini returned invalid JSON. Raw response: " + text);
  }
}

// ─── analyzeResume ────────────────────────────────────────────────────────────
//
// Takes the plain text of a resume and returns a structured object:
// { role, experience, interviewType, skills[], projects[] }

export async function analyzeResume(resumeText) {
  if (!resumeText?.trim()) {
    throw new Error("resumeText is required and cannot be empty.");
  }

  const prompt = `
You are an expert technical recruiter.

Analyze the resume below and return ONLY valid JSON — no markdown, no explanation.

Required JSON shape:
{
  "role":         "string  — job title, inferred from skills/projects if not stated",
  "experience":   "string  — e.g. Fresher | 6 months | 2 years",
  "interviewType":"string  — one of: Technical Interview | Behavioral Interview | System Design | HR Interview",
  "skills":       ["string"],
  "projects":     ["string"]
}

Rules:
- Default interviewType to "Technical Interview" when unsure.
- Use "" or [] for any field you cannot determine.

Resume:
${resumeText}
`;

  return callGemini(prompt);
  // Returns: { role, experience, interviewType, skills, projects }
}

// ─── generateInterviewQuestions ───────────────────────────────────────────────
//
// Takes a candidate profile and returns an array of interview questions:
// { questions: [{ id, question, focus }] }

export async function generateInterviewQuestions({
  role,
  experience,
  interviewType,
  skills = [],
  projects = [],
  totalQuestions = 5,
}) {
  if (!role?.trim()) {
    throw new Error("role is required to generate interview questions.");
  }

  const prompt = `
You are a professional interviewer.

Generate exactly ${totalQuestions} interview questions for the candidate below.
Return ONLY valid JSON — no markdown, no explanation.

Candidate profile:
- Role:           ${role}
- Experience:     ${experience || "Not specified"}
- Interview type: ${interviewType || "Technical Interview"}
- Skills:         ${skills.join(", ") || "Not specified"}
- Projects:       ${projects.join(", ") || "Not specified"}

Required JSON shape:
{
  "questions": [
    {
      "id":       1,
      "question": "string — under 28 words",
      "focus":    "string — e.g. Problem Solving | System Design | Communication"
    }
  ]
}

Rules:
- Questions must be practical and interview-ready.
- Reference the candidate's skills or projects where relevant.
- Make questions progressively harder (easy → advanced).
- Return exactly ${totalQuestions} questions.
`;

  return callGemini(prompt);
  // Returns: { questions: [{ id, question, focus }, ...] }
}