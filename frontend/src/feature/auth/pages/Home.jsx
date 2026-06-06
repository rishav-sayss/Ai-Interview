import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ── Step Card ──────────────────────────────────────────────────────────────────
function StepCard({ step, title, description, icon, active }) {
  return (
    <div
      className={`relative bg-white rounded-3xl p-6 shadow-sm border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col items-center text-center gap-3 ${
        active ? "border-emerald-400 shadow-emerald-100" : "border-gray-100"
      }`}
    >
      {/* Icon bubble */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-1 ${
          active
            ? "bg-emerald-50 border-2 border-emerald-400"
            : "bg-gray-50 border-2 border-gray-200"
        }`}
      >
        {icon}
      </div>
      <span className="text-xs font-bold text-emerald-500 tracking-widest uppercase">{step}</span>
      <h3 className="text-gray-900 font-bold text-base leading-tight">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// ── Feature Card ───────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-3">
      <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
        {icon}
      </div>
      <h4 className="text-gray-900 font-semibold text-sm">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────────
function StatCard({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">{value}</div>
      <div className="text-gray-500 text-sm">{label}</div>
    </div>
  );
}

// ── Home Page ──────────────────────────────────────────────────────────────────
function Home() {
  return (
    <div className="min-h-screen bg-[#f6f7f9] font-sans">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Subtle background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-100 rounded-full opacity-30 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-200 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-emerald-200 text-emerald-600 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm mb-8">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            AI Powered Smart Interview Platform
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight mb-5">
            Practice Interviews with{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-emerald-500">AI Intelligence</span>
              <span className="absolute inset-x-0 bottom-1 h-4 bg-emerald-100 rounded-full -z-0" />
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Role-based mock interviews with smart follow-ups, adaptive difficulty and
            real-time performance evaluation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/Aichat"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
              </svg>
              Start Interview
            </Link>
            <Link
              to="/Aichat"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold px-7 py-3.5 rounded-full shadow-sm hover:shadow transition-all duration-200 text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              View History
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StepCard
            step="Step 1"
            title="Role & Experience Selection"
            description="AI adjusts difficulty based on selected job role."
            active={false}
            icon={
              <svg className="w-7 h-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
              </svg>
            }
          />
          <StepCard
            step="Step 2"
            title="Smart Voice Interview"
            description="Dynamic follow-up questions based on your answers."
            active={true}
            icon={
              <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
              </svg>
            }
          />
          <StepCard
            step="Step 3"
            title="Timer Based Simulation"
            description="Real interview pressure with time tracking."
            active={false}
            icon={
              <svg className="w-7 h-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>
      </section>

      {/* ── Advanced AI Capabilities ──────────────────────────────────────────── */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-emerald-500 text-xs font-bold tracking-widest uppercase mb-3">Capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Advanced AI <span className="text-emerald-500">Capabilities</span>
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Everything you need to ace your next interview — powered by cutting-edge AI.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              title="Adaptive Difficulty"
              description="Questions get harder or easier based on your real-time performance, just like a real interviewer."
              icon={
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
            <FeatureCard
              title="Smart Follow-ups"
              description="AI analyzes your answers and digs deeper with relevant follow-up questions automatically."
              icon={
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              }
            />
            <FeatureCard
              title="Real-time Feedback"
              description="Instant scoring and detailed feedback on your communication, clarity, and technical accuracy."
              icon={
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
            <FeatureCard
              title="Role-based Questions"
              description="Tailored question banks for Software Engineering, Data Science, Product Management, and more."
              icon={
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />
            <FeatureCard
              title="Voice Recognition"
              description="Speak naturally — our AI transcribes and evaluates your spoken answers in real time."
              icon={
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
                </svg>
              }
            />
            <FeatureCard
              title="Performance History"
              description="Track your improvement over time with detailed session history and performance analytics."
              icon={
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────────── */}
      <section className="bg-gray-950 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
            <StatCard value="50K+" label="Interviews Conducted" />
            <StatCard value="95%" label="User Satisfaction" />
            <StatCard value="200+" label="Job Roles Covered" />
            <StatCard value="3x" label="Faster Hiring Rate" />
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-emerald-500 to-green-600 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
            Ready to ace your next interview?
          </h2>
          <p className="text-emerald-100 text-base mb-8">
            Join thousands of candidates who have already leveled up their interview skills with InterviewIQ.AI.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-emerald-600 font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-sm"
          >
            Get Started for Free
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
