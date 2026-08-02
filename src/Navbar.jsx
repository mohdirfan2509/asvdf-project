import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Menu, X } from 'lucide-react';

export default function Navbar({ activePage = "Home", onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Clients", href: "/clients" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" }
  ];

  return (
    <header className="w-full max-w-[1440px] mx-auto shrink-0 mb-2 font-['Poppins']">
      <div className="flex items-center justify-between gap-3 h-[68px]">
        
        {/* Left Floating Navigation Container */}
        <div className="flex items-center justify-between bg-white px-5 sm:px-6 h-full rounded-xl neu-md flex-1 border border-white/40">
          {/* Logo Area */}
          <div className="flex items-center gap-2.5 shrink-0 cursor-pointer" onClick={() => onNavigate && onNavigate("Home")}>
            <div className="w-8 h-8 rounded-lg bg-[#F6F7FB] neu-inset flex items-center justify-center p-1">
              <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGradNav" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="50%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
                <path d="M20 4L36 34H26L20 22L14 34H4L20 4Z" fill="url(#logoGradNav)" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-[800] text-base sm:text-lg tracking-tight text-slate-900">
                ASVDF
              </span>
              <span className="text-[9px] font-[600] tracking-[0.2em] text-slate-400 mt-0.5">
                FLOORING
              </span>
            </div>
          </div>

          {/* Navigation Items with Colored Rectangle Box Tab Animation (No text color animation, no underline animation) */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-5 text-[15px] font-[600] tracking-[-0.02em] text-slate-700 relative">
            {navLinks.map((link, idx) => {
              const isActive = activePage === link.label;
              return (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate(link.label);
                  }}
                  className="relative px-3.5 py-1.5 transition-none z-10 text-slate-700 hover:text-slate-900"
                >
                  {/* Framer Motion Sliding Purple Colored Rectangle Box */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBoxHighlight"
                      className="absolute inset-0 bg-[#F3F0FF] rounded-lg border border-purple-200/80 -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Right Action Container */}
        <div className="flex items-center gap-2 bg-white px-3.5 h-full rounded-xl neu-md border border-white/40 shrink-0">
          {/* Request Quote Button */}
          <button className="group hidden sm:inline-flex items-center gap-2 text-white text-xs sm:text-[13px] font-[600] px-4 py-2.5 rounded-lg neu-btn-primary cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner">
            <span>Request Quote</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* Search Button */}
          <button
            aria-label="Search"
            className="w-9 h-9 rounded-lg bg-[#F6F7FB] neu-sm flex items-center justify-center text-slate-700 hover:text-[#7C3AED] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Hamburger Button */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-lg bg-[#F6F7FB] neu-sm flex items-center justify-center text-slate-700 hover:text-[#7C3AED] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute left-4 right-4 top-20 z-50 bg-white neu-lg rounded-xl p-4 flex flex-col gap-2 border border-white/60">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate(link.label);
                setMobileMenuOpen(false);
              }}
              className={`px-3 py-2 rounded-lg text-sm font-[600] ${
                activePage === link.label
                  ? "bg-[#F3F0FF] text-slate-900 border border-purple-200/80"
                  : "text-slate-700 hover:bg-[#F6F7FB]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
