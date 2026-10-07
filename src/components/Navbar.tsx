import React, { useState } from 'react';
import { Search, Menu, X, ArrowRight, Droplet } from 'lucide-react';

interface NavbarProps {
  onOpenDonate: () => void;
  onOpenSearch: () => void;
  onOpenFindDonor: () => void;
  onOpenCamps: () => void;
  onOpenContact: () => void;
  onOpenAbout: () => void;
  isDark?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDonate,
  onOpenSearch,
  onOpenFindDonor,
  onOpenCamps,
  onOpenContact,
  onOpenAbout,
  isDark = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  const navLinks = [
    { label: 'Home', action: () => setActiveNav('Home') },
    { label: 'About', action: () => { setActiveNav('About'); onOpenAbout(); } },
    { label: 'Donate', action: () => { setActiveNav('Donate'); onOpenDonate(); } },
    { label: 'Find Donor', action: () => { setActiveNav('Find Donor'); onOpenFindDonor(); } },
    { label: 'Camps', action: () => { setActiveNav('Camps'); onOpenCamps(); } },
    { label: 'Contact', action: () => { setActiveNav('Contact'); onOpenContact(); } },
  ];

  return (
    <header className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-6 pb-4">
      <div className="flex items-center justify-between">
        {/* Brand Logo Zone */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveNav('Home');
          }}
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg"
        >
          {/* Stylized Red Droplet SVG Icon */}
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
            <svg
              viewBox="0 0 32 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-red-600 transition-transform group-hover:scale-105 duration-200"
            >
              <path
                d="M16 1.5C16 1.5 4 15.5 4 23.5C4 30.1274 9.37258 35.5 16 35.5C22.6274 35.5 28 30.1274 28 23.5C28 15.5 16 1.5 16 1.5Z"
                fill="currentColor"
              />
              <path
                d="M16 6C16 6 8.5 16.5 8.5 23C8.5 27.5 11.5 31 15 31.8C13 29.5 12 26 13.5 22C15.2 17.5 19.5 15.2 18.5 10C18 8 16.8 6.8 16 6Z"
                fill="#FF6B6B"
                opacity="0.45"
              />
            </svg>
          </div>
          <span className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            LifeFlow
          </span>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium">
          {navLinks.map((link) => {
            const isActive = activeNav === link.label;
            return (
              <button
                key={link.label}
                onClick={link.action}
                className={`relative py-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded ${
                  isActive
                    ? 'text-red-500 font-semibold'
                    : isDark
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-[2.5px] bg-red-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions Zone */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={onOpenSearch}
            aria-label="Search blood drives and donors"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
              isDark
                ? 'text-slate-200 hover:text-red-400 hover:bg-white/10'
                : 'text-slate-700 hover:text-red-600 hover:bg-red-50/70'
            }`}
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>

          <button
            onClick={onOpenDonate}
            className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium text-sm sm:text-[15px] shadow-sm hover:shadow-md hover:from-red-700 hover:to-rose-700 active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            <span>Donate Now</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden w-10 h-10 rounded-lg flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
              isDark ? 'text-slate-200 hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden mt-4 p-4 backdrop-blur-md rounded-2xl shadow-xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200 ${
            isDark
              ? 'bg-black/90 border border-white/10 text-white'
              : 'bg-white/95 border border-slate-100 text-slate-700'
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                link.action();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-base font-medium rounded-lg hover:bg-red-600/20 hover:text-red-400 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
