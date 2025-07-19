import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import GradientButton from "./GradientButton";
import { useAuth } from "../../hooks/useAuth";

const navLinks = [
  { label: "How It Works", to: "/#how-it-works" },
  { label: "Partners", to: "/#partners" },
  { label: "Stories", to: "/#stories" },
  { label: "FAQ", to: "/#faq" },
];

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10C22 6.48 17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8c0 4.41-3.59 8-8 8z" fill="#22c55e"/><path d="M12 6.5c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5S10.62 8.5 12 8.5s2.5 1.12 2.5 2.5S13.38 13.5 12 13.5z" fill="#3b82f6"/></svg>
          </span>
          <span className="text-xl font-bold text-gray-900">MediShare</span>
        </Link>
        <nav className="hidden md:flex gap-8">
          {navLinks.map(link => (
            <a key={link.label} href={link.to} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex gap-2 items-center relative">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold shadow hover:scale-105 transition-all"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <span className="hidden sm:inline">{user.email}</span>
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold ml-2">
                  {user.email?.[0]?.toUpperCase() || "U"}
                </span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100">
                  <div className="px-4 py-2 text-gray-700 text-sm">Signed in as<br /><span className="font-semibold">{user.email}</span></div>
                  <button
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-xl text-sm font-semibold"
                    onClick={async () => { setDropdownOpen(false); await signOut(); }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth"><GradientButton>Sign In</GradientButton></Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 