import express from "express";
import { generateInterviewQuestionsController } from "../controller/interview.controller.js";

const interviewRouter = express.Router();

interviewRouter.post("/Aiquestion", generateInterviewQuestionsController);

export default interviewRouter;