import axios from "axios";

const INTERVIEW_API_URL = "http://localhost:3000/api/interview";

const interviewApi = axios.create({
  baseURL: INTERVIEW_API_URL,
  withCredentials: true,
});

/**
 * Generate interview questions from AI based on role, experience and interview type.
 * @param {Object} payload - { role, experience, interviewType, skills, projects, totalQuestions }
 * @returns {Promise<{ success: boolean, data: Array | null, message?: string }>}
 */
export async function generateQuestions(payload) {
  try {
    const response = await interviewApi.post("/Aiquestion", payload);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Generate questions error:", error.response?.data || error.message);
    
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to generate interview questions. Please try again.",
      data: null,
    };
  }
}
