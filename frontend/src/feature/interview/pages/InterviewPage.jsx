import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useInterviewHooks } from "../hooks/interview.hooks";
import Navbar from "../../auth/components/Navbar";
import "./InterviewPage.css";

/* ─── Circular Timer ──────────────────────────────────────────────────────── */
function CircularTimer({ timeLeft, totalTime = 60 }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / totalTime) * circumference;
  const color =
    timeLeft > 30 ? "#10b981" : timeLeft > 10 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg width="96" height="96" viewBox="0 0 96 96" className="absolute inset-0">
        <circle cx="48" cy="48" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="6" />
        <circle
          cx="48" cy="48" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          transform="rotate(-90 48 48)"
          style={{ transition: "stroke-dashoffset 0.9s linear, stroke 0.4s ease" }}
        />
      </svg>
      <span className="relative z-10 text-lg font-extrabold" style={{ color }}>
        {timeLeft}s
      </span>
    </div>
  );
}

/* ─── Status Dot ─────────────────────────────────────────────────────────── */
function PulseDot({ color }) {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full"
      style={{
        backgroundColor: color,
        animation: "pulse 1.2s ease-in-out infinite",
      }}
    />
  );
}

/* ─── AI Avatar Card ──────────────────────────────────────────────────────── */
function AiAvatarCard({ isSpeaking, candidateName }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-emerald-100">
      {/* Avatar area */}
      <div className="relative h-52 bg-gradient-to-br from-emerald-200 via-green-100 to-teal-200 flex items-center justify-center overflow-hidden">
        {/* Blob */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(52,211,153,0.3),transparent_60%)] pointer-events-none" />
        {/* Avatar Image */}
        <div className="relative z-10 w-40 h-40 rounded-full border-4 border-white/80 shadow-xl overflow-hidden bg-emerald-50 flex items-center justify-center">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=AIInterviewer&backgroundColor=d1fae5"
            alt="AI Interviewer"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          {/* Fallback SVG face */}
          <svg viewBox="0 0 80 80" fill="none" className="absolute w-24 h-24">
            <circle cx="40" cy="28" r="20" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
            <ellipse cx="40" cy="68" rx="26" ry="16" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
            <circle cx="33" cy="26" r="3" fill="#10b981" />
            <circle cx="47" cy="26" r="3" fill="#10b981" />
            <path d="M34 34 Q40 39 46 34" stroke="#10b981" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* Speaking ring */}
        {isSpeaking && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-44 h-44 rounded-full border-4 border-emerald-400 opacity-60"
              style={{ animation: "speakPulse 1.6s ease-in-out infinite" }}
            />
          </div>
        )}
      </div>

      {/* Greeting message */}
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
        <p className="text-sm text-gray-500 text-center leading-relaxed">
          Hi <span className="font-semibold text-gray-700">{candidateName || "Candidate"}</span>,
          it&apos;s great to meet you today. I hope you&apos;re feeling confident and ready.
        </p>
      </div>
    </div>
  );
}

/* ─── Status Panel ────────────────────────────────────────────────────────── */
function StatusPanel({ timeLeft, currentIndex, totalQuestions, isSpeaking }) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-lg border border-emerald-100 flex flex-col items-center gap-4">
      {/* Header row */}
      <div className="flex items-center justify-between w-full">
        <span className="text-xs font-semibold text-gray-400 tracking-wide uppercase">
          Interview Status
        </span>
        {isSpeaking ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 px-2.5 py-1 rounded-full">
            <PulseDot color="#10b981" />
            AI Speaking
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-1 rounded-full">
            <PulseDot color="#3b82f6" />
            Listening
          </span>
        )}
      </div>

      {/* Circular Timer */}
      <CircularTimer timeLeft={timeLeft} totalTime={60} />

      {/* Stats */}
      <div className="flex items-center justify-center gap-6 w-full">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-2xl font-extrabold text-emerald-500">
            {currentIndex + 1}
          </span>
          <span className="text-[11px] text-gray-400 font-medium">Current Question</span>
        </div>
        <div className="w-px h-8 bg-gray-200" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-2xl font-extrabold text-emerald-500">
            {totalQuestions}
          </span>
          <span className="text-[11px] text-gray-400 font-medium">Total Questions</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Voice Button ────────────────────────────────────────────────────────── */
function VoiceButton({ isListening, onClick }) {
  return (
    <button
      id="voice-btn"
      onClick={onClick}
      title={isListening ? "Stop voice input" : "Start voice input"}
      className={`relative w-13 h-13 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 shadow-lg cursor-pointer
        ${isListening
          ? "bg-red-500 shadow-red-300 scale-105"
          : "bg-gray-900 hover:bg-gray-700 hover:scale-105"
        }`}
      style={{ width: 52, height: 52 }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z"
        />
      </svg>
      {isListening && (
        <span
          className="absolute inset-0 rounded-full border-2 border-red-400"
          style={{ animation: "ripple 1.2s ease-out infinite" }}
        />
      )}
    </button>
  );
}

/* ─── Progress Dots ──────────────────────────────────────────────────────── */
function ProgressDots({ total, current }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-2.5 rounded-full transition-all duration-300
            ${i === current
              ? "bg-emerald-500 w-6 shadow-[0_0_0_3px_rgba(16,185,129,0.2)]"
              : i < current
                ? "bg-emerald-200 w-2.5"
                : "bg-gray-200 w-2.5"
            }`}
        />
      ))}
    </div>
  );
}

/* ─── Loading Screen ──────────────────────────────────────────────────────── */
function LoadingScreen({ role }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center font-sans">
      <div className="bg-white rounded-3xl p-14 text-center shadow-2xl flex flex-col items-center gap-5 max-w-sm w-full mx-4">
        {/* Spinner */}
        <div className="w-14 h-14 rounded-full border-4 border-emerald-100 border-t-emerald-500"
          style={{ animation: "spin 0.9s linear infinite" }} />
        <h2 className="text-xl font-extrabold text-gray-900">Preparing Your Interview</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          AI is crafting personalized questions for{" "}
          <strong className="text-gray-700">{role || "your role"}</strong>…
        </p>
        {/* Bouncing dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-emerald-500"
              style={{ animation: `dotBounce 1.2s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Results Screen ──────────────────────────────────────────────────────── */
function ResultsScreen({ questions, answers, role, interviewType, onRestart }) {
  const navigate = useNavigate();
  const answered = answers.filter((a) => a && a.trim().length > 0).length;
  const scorePercent = Math.round((answered / questions.length) * 100);
  const circumference = 2 * Math.PI * 50;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-start justify-center p-8 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full flex flex-col gap-7">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-5xl" style={{ animation: "trophyBounce 0.8s ease-out" }}>🏆</span>
          <h2 className="text-3xl font-extrabold text-gray-900">Interview Completed!</h2>
          <p className="text-sm text-gray-500">
            {role} · {interviewType}
          </p>
        </div>

        {/* Score Ring */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg width="128" height="128" viewBox="0 0 128 128" className="absolute inset-0">
              <circle cx="64" cy="64" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
              <circle
                cx="64" cy="64" r="50"
                fill="none" stroke="#10b981" strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - scorePercent / 100)}
                transform="rotate(-90 64 64)"
                style={{ transition: "stroke-dashoffset 1.2s ease" }}
              />
            </svg>
            <div className="relative flex flex-col items-center">
              <span className="text-2xl font-extrabold text-emerald-500">{scorePercent}%</span>
              <span className="text-[10px] text-gray-400 font-semibold">Completion</span>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center justify-center gap-8 bg-gray-50 rounded-2xl py-5">
          {[
            { val: questions.length, key: "Questions" },
            { val: answered, key: "Answered" },
            { val: questions.length - answered, key: "Skipped" },
          ].map(({ val, key }, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-extrabold text-emerald-500">{val}</span>
              <span className="text-xs text-gray-400 font-medium">{key}</span>
            </div>
          ))}
        </div>

        {/* Q&A Review */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 border-b-2 border-gray-200 pb-4">
            <h3 className="text-2xl font-bold text-gray-900">Your Answers</h3>
            <span className="text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-1.5 rounded-full">
              {answered}/{questions.length}
            </span>
          </div>
          
          <div className="flex flex-col gap-5 max-h-96 overflow-y-auto pr-3"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#10b981 #f0fdf4'
            }}>
            {questions.map((q, i) => {
              const qText = typeof q === "string" ? q : q.question || q.text || JSON.stringify(q);
              const answerText = answers[i]?.trim();
              const isAnswered = answerText && answerText.length > 0;
              
              return (
                <div key={i} className="border-l-4 border-emerald-400 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                  {/* Question */}
                  <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 text-white font-bold text-sm flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm font-semibold text-gray-800 leading-relaxed">
                        {qText}
                      </p>
                    </div>
                  </div>
                  
                  {/* Answer */}
                  <div className="px-6 py-5 bg-white">
                    {isAnswered ? (
                      <div className="flex gap-3">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex-shrink-0 mt-0.5">
                          Your Answer
                        </span>
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words flex-1">
                          {answerText}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-gray-400 italic">
                        <span className="text-lg">○</span>
                        Not answered
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            id="retake-btn"
            onClick={onRestart}
            className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-green-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg shadow-emerald-200 cursor-pointer"
          >
            Retake Interview
          </button>
          <button
            id="home-btn"
            onClick={() => navigate("/")}
            className="flex-1 h-12 bg-gray-100 text-gray-700 font-semibold rounded-2xl border border-gray-200 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Interview Page ─────────────────────────────────────────────────── */
function InterviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const textareaRef = useRef(null);

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
    currentQuestion,
    currentAnswer,
    totalQuestions,
    isLastQuestion,
    startInterview,
    handleAnswerChange,
    submitAnswer,
    resetSession,
  } = useInterviewHooks();

  const isSpeaking = timeLeft > 50;

  /* ── Start interview from route state ────────────────────────────────── */
  useEffect(() => {
    const state = location.state;
    if (!state?.role) {
      navigate("/Aichat");
      return;
    }
    startInterview({
      role: state.role,
      experience: state.experience,
      interviewType: state.interviewType,
      skills: state.skills || [],
      projects: state.projects || [],
      totalQuestions: 5,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Focus textarea on question change ───────────────────────────────── */
  useEffect(() => {
    if (sessionStatus === "active") {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [currentIndex, sessionStatus]);

  /* ── Ctrl+Enter shortcut ─────────────────────────────────────────────── */
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && sessionStatus === "active") {
        submitAnswer();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [submitAnswer, sessionStatus]);

  const handleRestart = () => {
    resetSession();
    navigate("/Aichat");
  };

  /* ── Render States ───────────────────────────────────────────────────── */
  if (sessionStatus === "loading")
    return <LoadingScreen role={role || location.state?.role} />;

  if (sessionStatus === "error") {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center font-sans">
        <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-red-100 max-w-sm w-full mx-4 flex flex-col items-center gap-4">
          <span className="text-5xl">⚠️</span>
          <h2 className="text-xl font-extrabold text-gray-900">Something went wrong</h2>
          <p className="text-sm text-gray-500 leading-relaxed">{errorMessage}</p>
          <button
            id="back-to-setup-btn"
            onClick={handleRestart}
            className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg cursor-pointer"
          >
            Back to Setup
          </button>
        </div>
      </div>
    );
  }

  if (sessionStatus === "completed") {
    return (
      <ResultsScreen
        questions={questions}
        answers={answers}
        role={role}
        interviewType={interviewType}
        onRestart={handleRestart}
      />
    );
  }

  if (sessionStatus !== "active" || !currentQuestion) return null;

  const questionText =
    typeof currentQuestion === "string"
      ? currentQuestion
      : currentQuestion.question || currentQuestion.text || JSON.stringify(currentQuestion);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-slate-50 to-emerald-50 flex flex-col font-sans">
      <Navbar />

      {/* ── Main Layout ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex items-start justify-center gap-6 px-6 py-8 max-w-5xl mx-auto w-full">

        {/* ── LEFT PANEL ─────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 w-80 flex-shrink-0">
          <AiAvatarCard
            isSpeaking={isSpeaking}
            candidateName={location.state?.candidateName || ""}
          />
          <StatusPanel
            timeLeft={timeLeft}
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            isSpeaking={isSpeaking}
          />
        </div>

        {/* ── RIGHT PANEL ────────────────────────────────────────────────── */}
        <div className="flex-1 bg-white rounded-3xl shadow-lg border border-emerald-100 p-8 flex flex-col gap-5 min-h-[540px]">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              <span className="text-emerald-500">AI Smart</span> Interview
            </h2>
            <ProgressDots total={totalQuestions} current={currentIndex} />
          </div>

          {/* Badge row */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Q{currentIndex + 1} / {totalQuestions}
            </span>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {interviewType}
            </span>
            <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
              {role}
            </span>
          </div>

          {/* Question Box */}
          <div className="bg-gradient-to-br from-emerald-50/60 to-green-50/40 border border-emerald-100 rounded-2xl px-6 py-5">
            <p className="text-[15px] font-medium text-gray-800 leading-relaxed">
              {questionText}
            </p>
          </div>

          {/* Answer Textarea */}
          <div className="flex flex-col flex-1 gap-1.5">
            <textarea
              ref={textareaRef}
              id="answer-textarea"
              value={currentAnswer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Type your answer here..."
              rows={6}
              className="w-full flex-1 min-h-40 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm text-gray-800 placeholder-gray-400 leading-relaxed resize-none outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 focus:bg-white transition-all duration-200 font-sans"
            />
            <span className="text-[11px] text-gray-400 text-right pr-1">
              Ctrl + Enter to submit
            </span>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-3">
            <VoiceButton isListening={false} onClick={() => {}} />

            <button
              id="submit-answer-btn"
              onClick={submitAnswer}
              className="flex-1 h-13 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-[15px] rounded-2xl hover:from-emerald-600 hover:to-green-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg shadow-emerald-200 cursor-pointer"
              style={{ height: 52 }}
            >
              {isLastQuestion ? (
                <>
                  Finish Interview
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </>
              ) : (
                <>
                  Submit Answer
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default InterviewPage;
