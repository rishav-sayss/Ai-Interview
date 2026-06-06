import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});



export const analyzeResume = async (resumeText) => {
  const prompt = `
You are an expert technical recruiter.

Analyze the following resume and return ONLY valid JSON.

Rules:

1. Extract:
   - name
   - email
   - phone
   - role
   - skills
   - education
   - experience

2. If role is missing:
   infer it from projects and skills.

3. Experience format:

[
  {
    "company":"",
    "position":"",
    "duration":"",
    "description":""
  }
]

4. If description is missing:
   generate a professional description.

5. If no experience:
   return []

6. interviewType must always be:
   "technical"

Resume:
${resumeText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};