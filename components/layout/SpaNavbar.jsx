'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Home as HomeIcon,
  Briefcase,
  Users,
  Wrench,
  Info,
  Phone,
  MessageSquareQuote,
  FileText,
  Settings,
  Image,
  HelpCircle
} from 'lucide-react';

export default function Navbar({ activePage = "Home", onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const searchInputRef = useRef(null);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Clients", href: "#clients" },
    { label: "Services", href: "#services" },
    { label: "About Us", href: "#about-us" },
    { label: "Contact Us", href: "#contact-us" }
  ];

  const fullMenuItems = [
    { label: "Home", icon: HomeIcon },
    { label: "Projects", icon: Briefcase },
    { label: "Clients", icon: Users },
    { label: "Services", icon: Wrench },
    { label: "Machinery", icon: Settings },
    { label: "About Us", icon: Info },
    { label: "Milestones", icon: Info },
    { label: "Core Values", icon: Info },
    { label: "Contact Us", icon: Phone },
    { label: "Testimonials", icon: MessageSquareQuote },
    { label: "Blogs", icon: FileText },
    { label: "Gallery", icon: Image },
    { label: "FAQs", icon: HelpCircle },
  ];

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="w-full max-w-[1440px] mx-auto shrink-0 font-['Poppins'] relative h-full flex items-center">
      <div className="flex items-center justify-between gap-2 sm:gap-3 h-[56px] sm:h-[64px] w-full">
        
        {/* Left Floating Navigation Container (#EBECF0 background surface) */}
        <div className="flex items-center justify-between bg-[#EBECF0] px-5 sm:px-6 h-full rounded-xl neu-lvl-1 flex-1">
          {/* Logo Area */}
          <div className="flex items-center gap-2.5 shrink-0 cursor-pointer" onClick={() => onNavigate && onNavigate("Home")}>
            <div className="w-8 h-8 rounded-lg bg-[#EBECF0] neu-inset flex items-center justify-center p-1">
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

          {/* Navigation Items with Soft Purple Neumorphic Tint Active Box */}
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
                  className={`relative px-3.5 py-1.5 transition-colors duration-200 z-10 ${
                    isActive ? "text-[#7C3AED]" : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  {/* Framer Motion Sliding Active Highlight Box with Soft Brand Accent Color */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBoxHighlight"
                      className="absolute inset-0 bg-[#EDE9FE] rounded-lg border border-[#DDD6FE] shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Right Action Container (#EBECF0 background surface) */}
        <div className="flex items-center gap-2 bg-[#EBECF0] px-3.5 h-full rounded-xl neu-lvl-1 shrink-0 relative">
          
          {/* Request Quote Button */}
          {!searchOpen && (
            <button type="button" onClick={() => onNavigate && onNavigate("Contact Us")} className="group hidden sm:inline-flex items-center gap-2 text-white text-xs sm:text-[13px] font-[600] px-4 py-2.5 rounded-lg neu-btn-primary cursor-pointer shrink-0">
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          )}

          {/* Animated Expandable Search Input Container */}
          <motion.div 
            initial={false}
            animate={{ width: searchOpen ? 240 : 36 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative flex items-center h-9 bg-[#EBECF0] neu-inset rounded-lg overflow-hidden shrink-0"
          >
            {/* Search Icon / Toggle Button */}
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 flex items-center justify-center text-slate-700 hover:text-[#7C3AED] shrink-0 cursor-pointer z-10"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Input Field */}
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center w-full pr-2"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search site..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs font-[500] text-slate-800 placeholder:text-slate-400 focus:outline-none px-1"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="text-slate-400 hover:text-slate-700 p-1 ml-1"
                    title="Close Search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Hamburger Menu Button (Perfect Circle) */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-full bg-[#EBECF0] neu-sm flex items-center justify-center text-slate-700 hover:text-[#7C3AED] cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-[#7C3AED]" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Comprehensive Menu Overlay Panel (#EBECF0 surface background) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-20 z-50 w-60 bg-[#EBECF0] neu-lvl-3 rounded-2xl p-3 flex flex-col gap-2.5 shadow-2xl"
          >
            {/* Header: Dark / Light Mode Toggle */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-300/50">
              <span className="text-[11px] font-[700] text-slate-900 uppercase tracking-wider">
                Theme
              </span>
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-1.5 bg-[#EBECF0] neu-inset px-2.5 py-1 rounded-lg text-[11px] font-[600] text-slate-700 hover:text-[#7C3AED] cursor-pointer transition-colors"
              >
                {isDarkMode ? (
                  <>
                    <Moon className="w-3 h-3 text-[#7C3AED]" />
                    <span>Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3 h-3 text-amber-500" />
                    <span>Light</span>
                  </>
                )}
              </button>
            </div>

            {/* Menu List of All 11 Pages */}
            <div className="flex flex-col gap-1 max-h-[360px] overflow-y-auto pr-0.5">
              <span className="text-[9.5px] font-[700] text-slate-400 uppercase tracking-widest px-1.5 mb-0.5">
                Navigation Menu
              </span>

              {fullMenuItems.map((item, idx) => {
                const IconComp = item.icon;
                const isActive = activePage === item.label;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (onNavigate) onNavigate(item.label);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[11.5px] font-[600] transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#EDE9FE] text-[#7C3AED] border border-[#DDD6FE] shadow-sm"
                        : "text-slate-700 hover:bg-[#EBECF0] hover:text-[#7C3AED]"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                      isActive ? "bg-[#7C3AED] text-white" : "bg-[#EBECF0] neu-inset text-slate-500"
                    }`}>
                      <IconComp className="w-3 h-3" />
                    </div>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
