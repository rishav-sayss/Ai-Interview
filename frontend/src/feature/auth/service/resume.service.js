import axios from "axios";

const resumeApi = axios.create({
  baseURL: "http://localhost:3000/api/resume",
  withCredentials: true,
  timeout: 120000, // 2 minutes timeout for AI analysis
});

/**
 * Upload a PDF resume and get AI-extracted fields.
 * @param {File} file - The PDF file to analyze
 * @returns {{ success: boolean, data: { role, experience, interviewType, skills, projects }, message?: string }}
 */
export async function analyzeResume(file) {
  try {
    console.log("🚀 [Frontend] Uploading resume:", file.name);

    const formData = new FormData();
    formData.append("resume", file);

    console.log("📤 Sending to backend...");
    const response = await resumeApi.post("/analyze", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("✅ Response received:", response.data);

    return response.data;
  } catch (error) {
    console.error("❌ Resume analysis error:");
    console.error("Status:", error.response?.status);
    console.error("Message:", error.response?.data?.message);
    console.error("Error data:", error.response?.data);
    console.error("Axios error:", error.message);

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
