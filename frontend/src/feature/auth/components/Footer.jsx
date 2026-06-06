import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                InterviewIQ<span className="text-emerald-400">.AI</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 mb-5">
              AI-powered mock interviews with smart follow-ups, adaptive difficulty, and real-time performance evaluation.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { label: "Twitter", path: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" },
                { label: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
                { label: "GitHub", path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors duration-200"
                >
                  <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Product</h4>
            <ul className="space-y-2.5">
              {["Features", "Pricing", "How It Works", "Changelog"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 hover:text-emerald-400 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Resources</h4>
            <ul className="space-y-2.5">
              {["Documentation", "Interview Tips", "Blog", "Support"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 hover:text-emerald-400 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Stay Updated</h4>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Get the latest interview tips and AI feature updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 min-w-0 bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} InterviewIQ.AI. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-600 hover:text-emerald-400 transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
