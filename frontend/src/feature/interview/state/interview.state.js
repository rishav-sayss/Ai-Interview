import { createSlice } from "@reduxjs/toolkit";

/**
 * Interview State Slice
 * Manages: questions list, current question index, answers, timer, session status
 */
const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    // Session metadata
    role: "",
    experience: "",
    interviewType: "",

    // Questions & Answers
    questions: [],
    currentIndex: 0,
    answers: [],

    // Session status
    sessionStatus: "idle", // "idle" | "loading" | "active" | "completed" | "error"
    errorMessage: "",

    // Timer
    timeLeft: 60,
    timerActive: false,
  },
  reducers: {
    setSessionMeta: (state, action) => {
      state.role = action.payload.role;
      state.experience = action.payload.experience;
      state.interviewType = action.payload.interviewType;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
      state.currentIndex = 0;
      state.answers = new Array(action.payload.length).fill("");
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setAnswer: (state, action) => {
      const { index, answer } = action.payload;
      state.answers[index] = answer;
    },
    setSessionStatus: (state, action) => {
      state.sessionStatus = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
    setTimerActive: (state, action) => {
      state.timerActive = action.payload;
    },
    resetInterview: () => ({
      role: "",
      experience: "",
      interviewType: "",
      questions: [],
      currentIndex: 0,
      answers: [],
      sessionStatus: "idle",
      errorMessage: "",
      timeLeft: 60,
      timerActive: false,
    }),
  },
});

export const {
  setSessionMeta,
  setQuestions,
  setCurrentIndex,
  setAnswer,
  setSessionStatus,
  setErrorMessage,
  setTimeLeft,
  setTimerActive,
  resetInterview,
} = interviewSlice.actions;

export default interviewSlice.reducer;
