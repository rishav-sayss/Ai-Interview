import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
              </svg>
            </div>
            <span className="text-gray-900 font-bold text-lg tracking-tight">
              InterviewIQ<span className="text-emerald-500">.AI</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-emerald-600 text-sm font-medium transition-colors duration-200">Home</Link>
            <Link to="/Aichat" className="text-gray-600 hover:text-emerald-600 text-sm font-medium transition-colors duration-200">Practice</Link>
            <a href="#features" className="text-gray-600 hover:text-emerald-600 text-sm font-medium transition-colors duration-200">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-emerald-600 text-sm font-medium transition-colors duration-200">How It Works</a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Credits badge */}
 

            {user ? (
              <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors shadow-md">
                <span className="text-white text-sm font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="text-gray-700 hover:text-emerald-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
                  Log In
                </Link>
                <Link to="/register" className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {menuOpen ? (
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2 space-y-1 shadow-lg">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-emerald-600 text-sm font-medium transition-colors">Home</Link>
          <Link to="/Aichat" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-emerald-600 text-sm font-medium transition-colors">Practice</Link>
          <a href="#features" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-emerald-600 text-sm font-medium transition-colors">Features</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-emerald-600 text-sm font-medium transition-colors">How It Works</a>
          {!user && (
            <div className="flex gap-2 pt-2">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center text-gray-700 text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all">Log In</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-all">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
