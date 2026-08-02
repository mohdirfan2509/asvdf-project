import React, { useState } from 'react';
import { ArrowRight, Search, Menu, X } from 'lucide-react';

export default function Navbar({ activePage = "Projects", onNavigate }) {
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
      <div className="flex items-center justify-between gap-3">
        
        {/* Left & Center Main Floating Container Card */}
        <div className="flex items-center justify-between bg-[#FFFFFF] px-6 py-2.5 rounded-2xl neu-md flex-1">
          {/* Logo Left */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => onNavigate && onNavigate("Home")}>
            <div className="w-8 h-8 rounded-xl bg-[#F6F7FB] neu-inset flex items-center justify-center p-1">
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

          {/* Nav Links Center */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-[500] text-slate-600">
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
                  className={`relative py-1 transition-colors hover:text-[#7C3AED] ${
                    isActive ? "text-[#7C3AED] font-[600]" : "text-slate-700"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7C3AED] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Right Floating Controls Container */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Request Quote Button */}
          <button className="hidden sm:inline-flex items-center gap-2 text-white text-xs font-[600] px-5 py-3 rounded-full neu-btn-primary cursor-pointer">
            <span>Request Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Search Icon Button */}
          <button
            aria-label="Search"
            className="w-10 h-10 rounded-full bg-[#FFFFFF] neu-sm flex items-center justify-center text-slate-700 hover:text-[#7C3AED] cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Hamburger Menu Icon Button */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full bg-[#FFFFFF] neu-sm flex items-center justify-center text-slate-700 hover:text-[#7C3AED] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute left-4 right-4 top-16 z-50 bg-[#FFFFFF] neu-lg rounded-2xl p-4 flex flex-col gap-2 border border-white">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate(link.label);
                setMobileMenuOpen(false);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-[500] ${
                activePage === link.label
                  ? "bg-[#F6F7FB] neu-inset text-[#7C3AED] font-[600]"
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
