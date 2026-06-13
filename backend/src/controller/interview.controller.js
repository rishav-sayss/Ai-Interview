import { generateInterviewQuestions } from "../aiservice/ai.service.js";

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

    const questions = JSON.parse(result);

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
