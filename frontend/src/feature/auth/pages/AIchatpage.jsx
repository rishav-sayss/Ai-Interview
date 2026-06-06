import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { analyzeResume } from "../service/resume.service";

const INTERVIEW_TYPES = [
  "Technical Interview",
  "Behavioral Interview",
  "System Design",
  "HR Interview",
];

const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Choose Role & Experience",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    label: "Smart Voice Interview",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    label: "Performance Analytics",
  },
];

/* ── AI Filled Badge ─────────────────────────────────────────────────────────── */
function AiBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full leading-none">
      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      AI filled
    </span>
  );
}

/* ── Resume Analysis Result Card ─────────────────────────────────────────────── */
function ResumeResultCard({ data, onClear }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-800">Resume Analysis Result</span>
        </div>
        <button
          onClick={onClear}
          className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
          title="Remove"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="px-5 py-4 flex flex-col gap-4">
        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div>
            <p className="text-xs font-bold text-gray-700 mb-2">Projects:</p>
            <ul className="flex flex-col gap-1.5 pl-1">
              {data.projects.map((project, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                  {project}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div>
            <p className="text-xs font-bold text-gray-700 mb-2">Skills:</p>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Upload Zone ─────────────────────────────────────────────────────────────── */
function UploadZone({ file, dragging, onDrop, onDragOver, onDragLeave, onFileInput, analyzing }) {
  const inputRef = useRef(null);

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={() => !file && inputRef.current?.click()}
      className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 min-h-[110px] flex flex-col items-center justify-center gap-2 px-4 py-5
        ${dragging ? "border-emerald-500 bg-emerald-50 scale-[1.01]" : ""}
        ${file
          ? "border-emerald-400 bg-emerald-50/60 cursor-default"
          : "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/40 cursor-pointer"}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={onFileInput}
        id="resume-upload-input"
      />

      {file ? (
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-700 truncate max-w-[220px]">{file.name}</span>
          {analyzing ? (
            <span className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
              </svg>
              Analyzing...
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-semibold">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Resume uploaded
            </span>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Drop your resume here</p>
            <p className="text-xs text-gray-400 mt-0.5">PDF only · max 10 MB · AI will auto-fill fields</p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Browse file
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Field label row ─────────────────────────────────────────────────────────── */
function FieldLabel({ label, isAiFilled }) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
      {isAiFilled && <AiBadge />}
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────────────────────── */
function AIchatpage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [interviewType, setInterviewType] = useState("Technical Interview");

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  // Resume analysis result for the result card
  const [resumeResult, setResumeResult] = useState(null);

  // Which fields were auto-filled by AI
  const [aiFilled, setAiFilled] = useState({ role: false, experience: false, interviewType: false });

  // Flash highlight state
  const [flash, setFlash] = useState({ role: false, experience: false, interviewType: false });

  const triggerFlash = (fields) => {
    setFlash((prev) => ({ ...prev, ...fields }));
    setTimeout(() => setFlash({ role: false, experience: false, interviewType: false }), 900);
  };

  /* ── File handling ──────────────────────────────────────────────────────── */
  const handleFile = useCallback(async (selectedFile) => {
    if (!selectedFile || selectedFile.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }
    setError("");
    setFile(selectedFile);
    setAnalyzing(true);
    setResumeResult(null);

    try {
      const result = await analyzeResume(selectedFile);
      console.log("Analysis result:", result);
      
      if (result.success && result.data) {
        const { role: r, experience: exp, interviewType: it, skills, projects } = result.data;
        const filled = {};

        if (r) { setRole(r); filled.role = true; }
        if (exp) { setExperience(exp); filled.experience = true; }
        if (it) { setInterviewType(it); filled.interviewType = true; }

        setAiFilled((prev) => ({ ...prev, ...filled }));
        triggerFlash(filled);

        // Store for result card
        setResumeResult({ skills: skills || [], projects: projects || [] });
      } else {
        setError(result.message || "AI analysis failed. You can fill in the fields manually.");
      }
    } catch (err) {
      setError("⚠️ AI analysis error: " + (err.message || "Network error. Try again."));
      console.error("Resume analysis error:", err);
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const onDrop = (e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); };
  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onFileInput = (e) => { if (e.target.files[0]) handleFile(e.target.files[0]); };

  const handleClear = () => {
    setFile(null);
    setResumeResult(null);
    setAiFilled({ role: false, experience: false, interviewType: false });
    setError("");
  };

  /* ── Dynamic input classes ─────────────────────────────────────────────── */
  const inputClass = (field) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border text-gray-800 text-sm placeholder-gray-400
     focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300
     ${aiFilled[field]
       ? flash[field]
         ? "border-emerald-400 bg-emerald-50 ring-2 ring-emerald-300 shadow-[0_0_0_4px_rgba(52,211,153,0.15)]"
         : "border-emerald-400 bg-emerald-50/60 focus:ring-emerald-400"
       : "border-gray-200 bg-gray-50 focus:ring-emerald-400"}`;

  const selectClass = (field) =>
    `w-full appearance-none pl-4 pr-10 py-3 rounded-xl border text-sm cursor-pointer
     focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300
     ${aiFilled[field]
       ? flash[field]
         ? "border-emerald-400 bg-emerald-50 text-gray-800 ring-2 ring-emerald-300 shadow-[0_0_0_4px_rgba(52,211,153,0.15)]"
         : "border-emerald-400 bg-emerald-50/60 text-gray-800 focus:ring-emerald-400"
       : "border-gray-200 bg-gray-50 text-gray-700 focus:ring-emerald-400"}`;

  /* ── Start interview ─────────────────────────────────────────────────── */
  const handleStart = () => {
    if (!role.trim()) { setError("Please enter a role."); return; }
    if (!experience.trim()) { setError("Please enter your experience."); return; }
    setError("");
    navigate("/interview", { state: { role, experience, interviewType } });
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

          {/* ── LEFT PANEL ─────────────────────────────────────────────────── */}
          <div className="md:w-[44%] bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 p-8 sm:p-10 flex flex-col justify-center gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-3">
                Start Your <span className="text-emerald-600">AI</span> Interview
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                Practice real interview scenarios powered by AI. Improve
                communication, technical skills, and confidence.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {FEATURES.map((f) => (
                <li
                  key={f.label}
                  className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl px-4 py-3 shadow-sm"
                >
                  <span className="shrink-0 w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    {f.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700">{f.label}</span>
                </li>
              ))}
            </ul>

            {/* Hint */}
            <div className="flex items-start gap-2.5 bg-white/60 border border-emerald-200 rounded-2xl px-4 py-3 text-xs text-gray-500 leading-relaxed">
              <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Upload your resume and AI will automatically fill the Role, Experience, and Interview Type fields.
            </div>
          </div>

          {/* ── RIGHT PANEL ────────────────────────────────────────────────── */}
          <div className="md:w-[56%] p-8 sm:p-10 flex flex-col gap-4 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-black text-gray-900">Interview Setup</h2>

            {/* Role */}
            <div>
              <FieldLabel label="Role" isAiFilled={aiFilled.role} />
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  id="role-input"
                  type="text"
                  placeholder="e.g. Full Stack Developer"
                  value={role}
                  onChange={(e) => { setRole(e.target.value); setAiFilled((p) => ({ ...p, role: false })); }}
                  className={inputClass("role")}
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <FieldLabel label="Experience" isAiFilled={aiFilled.experience} />
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  id="experience-input"
                  type="text"
                  placeholder="e.g. 2 years"
                  value={experience}
                  onChange={(e) => { setExperience(e.target.value); setAiFilled((p) => ({ ...p, experience: false })); }}
                  className={inputClass("experience")}
                />
              </div>
            </div>

            {/* Interview Type */}
            <div>
              <FieldLabel label="Interview Type" isAiFilled={aiFilled.interviewType} />
              <div className="relative">
                <select
                  id="interview-type-select"
                  value={interviewType}
                  onChange={(e) => { setInterviewType(e.target.value); setAiFilled((p) => ({ ...p, interviewType: false })); }}
                  className={selectClass("interviewType")}
                >
                  {INTERVIEW_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Upload zone — hidden after result card shows */}
            {!resumeResult && (
              <UploadZone
                file={file}
                dragging={dragging}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onFileInput={onFileInput}
                analyzing={analyzing}
              />
            )}

            {/* ── Resume Analysis Result Card ─────────────────────────────── */}
            {resumeResult && !analyzing && (
              <ResumeResultCard data={resumeResult} onClear={handleClear} />
            )}

            {/* Analyzing skeleton */}
            {analyzing && (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 flex flex-col gap-3 animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gray-200" />
                  <div className="h-3.5 w-40 bg-gray-200 rounded-full" />
                </div>
                <div className="h-3 w-24 bg-gray-200 rounded-full" />
                <div className="flex flex-col gap-2 pl-3">
                  <div className="h-2.5 w-36 bg-gray-200 rounded-full" />
                  <div className="h-2.5 w-44 bg-gray-200 rounded-full" />
                </div>
                <div className="h-3 w-16 bg-gray-200 rounded-full" />
                <div className="flex gap-2">
                  <div className="h-6 w-14 bg-gray-200 rounded-full" />
                  <div className="h-6 w-16 bg-gray-200 rounded-full" />
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 text-xs font-medium">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                {error}
              </div>
            )}

            {/* Start button */}
            <button
              id="start-interview-btn"
              onClick={handleStart}
              disabled={analyzing}
              className="w-full bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg text-sm tracking-wide mt-1"
            >
              {analyzing ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                  Analyzing Resume...
                </span>
              ) : "Start Interview"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AIchatpage;
