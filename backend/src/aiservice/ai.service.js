import "../config/env.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const getGeminiApiKey = () => {
  const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "").trim();

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing in backend/.env");
  }

  return apiKey;
};

export const analyzeResume = async (resumeText) => {
  const prompt = `
You are an expert technical recruiter.

Analyze this resume and return only valid JSON. Do not wrap the JSON in markdown.

Required JSON shape:
{
  "role": "string",
  "experience": "string",
  "interviewType": "Technical Interview",
  "skills": ["string"],
  "projects": ["string"]
}

Rules:
- Infer role from skills/projects if it is not explicitly present.
- Keep experience as a short human-readable string like "Fresher", "6 months", or "2 years".
- interviewType must be one of: "Technical Interview", "Behavioral Interview", "System Design", "HR Interview".
- Pick "Technical Interview" by default.
- skills and projects must always be arrays.
- If a field is unknown, use an empty string or empty array.

Resume:
${resumeText}
`;

  const genAI = new GoogleGenerativeAI(getGeminiApiKey());
  const model = genAI.getGenerativeModel({
    model: "gemini-3.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const generateInterviewQuestions = async ({
  role,
  experience,
  interviewType,
  skills = [],
  projects = [],
  totalQuestions = 5,
}) => {
  const safeSkills = Array.isArray(skills) ? skills : [];
  const safeProjects = Array.isArray(projects) ? projects : [];

  const prompt = `
You are a professional interviewer.

Create ${totalQuestions} interview questions from this candidate profile and return only valid JSON.

Candidate profile:
- Role: ${role || "Candidate"}
- Experience: ${experience || "Not specified"}
- Interview type: ${interviewType || "Technical Interview"}
- Skills: ${safeSkills.join(", ") || "Not specified"}
- Projects: ${safeProjects.join(", ") || "Not specified"}

Required JSON shape:
{
  "questions": [
    {
      "id": 1,
      "question": "string",
      "focus": "string"
    }
  ]
}

Rules:
- Ask practical, interview-style questions.
- Mention resume skills or projects when useful.
- Keep each question under 28 words.
- Make questions progressively deeper.
- Return exactly ${totalQuestions} questions.
`;

  const genAI = new GoogleGenerativeAI(getGeminiApiKey());
  const model = genAI.getGenerativeModel({
    model: "gemini-3.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
};
