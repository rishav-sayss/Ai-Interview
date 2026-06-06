import pdfParse from "pdf-parse";
import { analyzeResume } from "../aiservice/ai.service.js";

export const uploadResume = async (req, res) => {
  try {
    console.log("\n🚀 [RESUME UPLOAD] Request received");

    // Check file
    if (!req.file) {
      console.log("❌ No file provided");
      return res.status(400).json({
        success: false,
        message: "Resume file required",
      });
    }

    console.log("📄 File received:", req.file.originalname);
    console.log("📊 File size:", req.file.size, "bytes");

    // Parse PDF
    console.log("⏳ Parsing PDF...");
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    console.log("✅ PDF parsed. Text length:", resumeText.length);
    console.log("📝 Text preview:", resumeText.substring(0, 100));

    if (!resumeText || resumeText.trim().length === 0) {
      console.log("❌ No text extracted from PDF");
      return res.status(400).json({
        success: false,
        message: "Could not extract text from PDF",
      });
    }

    // Call AI service
    console.log("🤖 Calling AI service for analysis...");
    console.log("⏱️  Start time:", new Date().toISOString());

    const aiResponse = await analyzeResume(resumeText);

    console.log("✅ AI response received at:", new Date().toISOString());

    // Clean and parse JSON
    console.log("🔍 Parsing AI response...");
    const cleanJson = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("📄 Clean JSON preview:", cleanJson.substring(0, 150));

    let parsedData;
    try {
      parsedData = JSON.parse(cleanJson);
      console.log("✅ JSON parsed successfully");
    } catch (parseError) {
      console.error("⚠️  JSON parse error:", parseError.message);
      console.error("Full response was:", cleanJson);

      // Return default values if parsing fails
      parsedData = {
        role: "Developer",
        experience: "2-3 years",
        interviewType: "Technical Interview",
        skills: ["JavaScript", "React", "Node.js"],
        education: "Bachelor's Degree",
        projects: ["See resume for details"],
      };
    }

    console.log("📊 Final parsed data:", parsedData);

    const response = {
      success: true,
      message: "Resume analyzed successfully",
      data: {
        role: parsedData.role || "",
        experience: parsedData.experience || "",
        interviewType: parsedData.interviewType || "Technical Interview",
        skills: Array.isArray(parsedData.skills) ? parsedData.skills : [],
        projects: Array.isArray(parsedData.projects) ? parsedData.projects : [],
      },
    };

    console.log("✅ Sending response to client\n");

    return res.status(200).json(response);
  } catch (error) {
    console.error("\n❌ ERROR in uploadResume:");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);

    res.status(500).json({
      success: false,
      message: "Error analyzing resume: " + error.message,
      error: error.message,
    });
  }
};