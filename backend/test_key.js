import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const modelsToTest = [
  "gemini-2.5-flash",
  "gemini-3.5-flash",
  "gemini-flash-latest",
  "gemini-2.0-flash-lite"
];

for (const modelName of modelsToTest) {
  try {
    console.log(`Testing model: ${modelName}...`);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Test call. Respond with 'OK'.");
    console.log(`✅ Success for ${modelName}:`, result.response.text().trim());
  } catch (err) {
    console.error(`❌ Failed for ${modelName}:`, err.message);
  }
}
