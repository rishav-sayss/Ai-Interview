import dotenv from "dotenv";
dotenv.config();
import { generateInterviewQuestions } from "./src/aiservice/ai.service.js";

try {
  console.log("Calling generateInterviewQuestions...");
  const result = await generateInterviewQuestions({
    role: "Frontend Developer",
    experience: "Fresher",
    interviewType: "Technical Interview",
    skills: ["React", "JavaScript"],
    projects: ["Portfolio Website"],
    totalQuestions: 5,
  });
  console.log("Success! Result:");
  console.log(result);
  console.log("Parsed JSON:");
  console.log(JSON.parse(result));
} catch (error) {
  console.error("Error during execution:", error);
}
