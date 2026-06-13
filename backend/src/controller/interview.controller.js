import { generateInterviewQuestions } from "../aiservice/ai.service.js";

const extractJson = (value) => {
  const text = String(value || "")
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end < start) {
    throw new Error("AI returned an invalid JSON response structure");
  }

  return text.slice(start, end + 1);
};

export const generateInterviewQuestionsController = async (req, res) => {
  try {
    const {
      role,
      experience,
      interviewType,
      skills,
      projects,
      totalQuestions,
    } = req.body;

    const result = await generateInterviewQuestions({
      role,
      experience,
      interviewType,
      skills,
      projects,
      totalQuestions,
    });

    const jsonText = extractJson(result);
    const parsed = JSON.parse(jsonText);
    
    // Extract questions array from the parsed object
    const questions = Array.isArray(parsed) ? parsed : parsed.questions || [];

    return res.status(200).json({
      success: true,
      message: "Interview questions generated successfully",
      data: questions,
    });
  } catch (error) {
    console.error("Generate Interview Questions Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate interview questions",
      error: error.message,
    });
  }
};