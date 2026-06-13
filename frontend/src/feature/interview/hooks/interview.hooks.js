import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef } from "react";
import { generateQuestions } from "../service/interview.service";
import {
  setSessionMeta,
  setQuestions,
  setCurrentIndex,
  setAnswer,
  setSessionStatus,
  setErrorMessage,
  setTimeLeft,
  setTimerActive,
  resetInterview,
} from "../state/interview.state";

/**
 * useInterviewHooks
 * Central hook connecting service → state → UI for the interview session.
 */
export function useInterviewHooks() {
  const dispatch = useDispatch();
  const timerRef = useRef(null);

  const {
    role,
    experience,
    interviewType,
    questions,
    currentIndex,
    answers,
    sessionStatus,
    errorMessage,
    timeLeft,
    timerActive,
  } = useSelector((state) => state.interview);

  /* ── Start interview session ─────────────────────────────────────────── */
  const startInterview = useCallback(
    async ({ role, experience, interviewType, skills, projects, totalQuestions = 5 }) => {
      dispatch(setSessionStatus("loading"));
      dispatch(setSessionMeta({ role, experience, interviewType }));
      dispatch(setErrorMessage(""));

      const result = await generateQuestions({
        role,
        experience,
        interviewType,
        skills,
        projects,
        totalQuestions,
      });

      // Handle both array and object with questions property
      const questionsArray = Array.isArray(result.data) 
        ? result.data 
        : result.data?.questions || [];

      if (result.success && questionsArray.length > 0) {
        dispatch(setQuestions(questionsArray));
        dispatch(setSessionStatus("active"));
        dispatch(setTimeLeft(60));
        dispatch(setTimerActive(true));
      } else {
        dispatch(setSessionStatus("error"));
        dispatch(
          setErrorMessage(result.message || "Could not generate questions. Please try again.")
        );
      }
    },
    [dispatch]
  );

  /* ── Timer logic ─────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!timerActive) return;

    timerRef.current = setInterval(() => {
      dispatch(setTimeLeft(Math.max(0, timeLeft - 1)));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timerActive, timeLeft, dispatch]);

  // Auto-advance when timer hits 0
  useEffect(() => {
    if (timerActive && timeLeft === 0) {
      handleNextQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, timerActive]);

  /* ── Answer handling ─────────────────────────────────────────────────── */
  const handleAnswerChange = useCallback(
    (text) => {
      dispatch(setAnswer({ index: currentIndex, answer: text }));
    },
    [dispatch, currentIndex]
  );

  /* ── Navigation ──────────────────────────────────────────────────────── */
  const handleNextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      dispatch(setCurrentIndex(currentIndex + 1));
      dispatch(setTimeLeft(60));
    } else {
      dispatch(setSessionStatus("completed"));
      dispatch(setTimerActive(false));
    }
  }, [dispatch, currentIndex, questions.length]);

  const handlePrevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      dispatch(setCurrentIndex(currentIndex - 1));
      dispatch(setTimeLeft(60));
    }
  }, [dispatch, currentIndex]);

  /* ── Submit answer & move next ───────────────────────────────────────── */
  const submitAnswer = useCallback(() => {
    handleNextQuestion();
  }, [handleNextQuestion]);

  /* ── Reset session ───────────────────────────────────────────────────── */
  const resetSession = useCallback(() => {
    clearInterval(timerRef.current);
    dispatch(resetInterview());
  }, [dispatch]);

  return {
    // State
    role,
    experience,
    interviewType,
    questions,
    currentIndex,
    answers,
    sessionStatus,
    errorMessage,
    timeLeft,
    timerActive,
    currentQuestion: questions[currentIndex] || null,
    currentAnswer: answers[currentIndex] || "",
    totalQuestions: questions.length,
    isLastQuestion: currentIndex === questions.length - 1,

    // Actions
    startInterview,
    handleAnswerChange,
    handleNextQuestion,
    handlePrevQuestion,
    submitAnswer,
    resetSession,
  };
}
