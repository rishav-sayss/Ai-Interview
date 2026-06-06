import "../config/env.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const getGeminiApiKey = () => {
  const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "").trim();

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing in backend/.env");
  }

  if (!apiKey.startsWith("AIza")) {
    throw new Error("GEMINI_API_KEY looks invalid. Use a Gemini API key from Google AI Studio.");
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
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
};
