import axios from "axios";

const RESUME_API_URL = "http://localhost:3000/api/resume";

const resumeApi = axios.create({
  baseURL: RESUME_API_URL,
  withCredentials: true,
  timeout: 120000,
});

/**
 * Upload a PDF resume and get AI-extracted interview fields.
 * @param {File} file - The PDF file to analyze.
 * @returns {Promise<{ success: boolean, data: object | null, message?: string }>}
 */
export async function analyzeResume(file) {
  try {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await resumeApi.post("/analyze", formData);
    return response.data;
  } catch (error) {
    console.error("Resume analysis error:", error.response?.data || error.message);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to analyze resume. Please try again.",
      data: null,
    };
  }
}
