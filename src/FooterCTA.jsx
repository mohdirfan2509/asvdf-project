import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  Globe,
  Share2,
  MessageCircle,
  Video
} from 'lucide-react';
import Navbar from './Navbar';

export default function FooterCTA({ onNavigate, showNavbar = true }) {
  return (
    <div className="h-full w-full font-['Poppins'] antialiased text-slate-900 flex flex-col justify-between overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {showNavbar && <Navbar activePage="Footer" onNavigate={onNavigate} />}

      {/* MAIN FLOATING CONTAINER */}
      <main className="flex-1 flex flex-col justify-between max-w-[1440px] w-full mx-auto bg-white rounded-[2rem] p-4 sm:p-5 lg:p-6 neu-lg border border-white/80 min-h-0 overflow-hidden">
        
        {/* TOP BIG HERO CTA BANNER (Left Solid Purple Content + Right Curved Warehouse Image) */}
        <div className="flex-1 relative rounded-[2rem] overflow-hidden bg-gradient-to-r from-[#3B25B0] via-[#4C28C4] to-[#5B2DE0] shadow-2xl border border-purple-500/20 grid grid-cols-1 lg:grid-cols-12 min-h-0 my-auto">
          
          {/* Left Column: CTA Content */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-12 flex flex-col justify-center items-start text-white relative z-10">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center bg-white/15 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-4">
              <span className="text-[11px] font-[600] tracking-wider text-purple-100 uppercase">
                LET'S BUILD TOGETHER
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[800] tracking-[-0.04em] leading-[1.08] text-white mb-4">
              Ready to Build Stronger
              <br />
              Foundations{" "}
              <span className="text-purple-200">
                Together?
              </span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-sm sm:text-base font-[400] text-purple-100/90 leading-relaxed mb-8 max-w-lg">
              Partner with ASVDF Flooring for reliable, durable, and high-performance flooring solutions tailored to your needs.
            </p>

            {/* Dual Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Primary Purple Action Button */}
              <button
                onClick={() => onNavigate && onNavigate("Contact Us")}
                className="inline-flex items-center gap-2 text-white text-xs sm:text-sm font-[600] px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] hover:from-[#5B21B6] hover:to-[#6D28D9] shadow-lg shadow-purple-950/40 border border-purple-400/30 cursor-pointer transition-all hover:scale-105"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* White Raised Phone Button */}
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2.5 bg-white text-[#3B25B0] hover:bg-slate-50 text-xs sm:text-sm font-[700] px-7 py-3.5 rounded-2xl shadow-xl transition-all hover:scale-105 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#3B25B0]" />
                <span>+91 98765 43210</span>
              </a>
            </div>

          </div>

          {/* Right Column: High-Res Curved Industrial Warehouse Photo */}
          <div className="lg:col-span-6 relative h-full min-h-[220px] lg:min-h-full overflow-hidden">
            {/* Custom Left Curved Masking Edge */}
            <div 
              className="w-full h-full bg-cover bg-center rounded-r-[2rem] lg:rounded-l-[4rem] border-l-4 border-white/10 shadow-2xl"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1400&auto=format&fit=crop')` }}
            />
            <div className="absolute inset-0 bg-slate-950/10 pointer-events-none" />
          </div>

        </div>

        {/* BOTTOM FOOTER BAR (Logo + Copyright + Social Media Icons) */}
        <div className="shrink-0 bg-[#F6F7FB] rounded-2xl p-4 sm:p-5 neu-sm border border-white mt-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left: Logo & Copyright Info */}
            <div className="flex items-center gap-4 sm:gap-6 divide-x divide-slate-300/70">
              {/* Logo */}
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate && onNavigate("Home")}>
                <div className="w-8 h-8 rounded-xl bg-[#F6F7FB] neu-inset flex items-center justify-center p-1">
                  <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="logoGradFooter" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="50%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#A855F7" />
                      </linearGradient>
                    </defs>
                    <path d="M20 4L36 34H26L20 22L14 34H4L20 4Z" fill="url(#logoGradFooter)" />
                  </svg>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-[800] text-base tracking-tight text-slate-900">
                    ASVDF
                  </span>
                  <span className="text-[9px] font-[600] tracking-[0.2em] text-slate-400 mt-0.5">
                    FLOORING
                  </span>
                </div>
              </div>

              {/* Copyright Text */}
              <div className="pl-4 sm:pl-6 flex flex-col text-[11px] font-[400] text-slate-500 leading-tight">
                <span>© 2024 ASVDF Flooring Private Limited.</span>
                <span>All Rights Reserved.</span>
              </div>
            </div>

            {/* Right: 4 Raised Circular Social Media Icons (SVG Icons for LinkedIn, Facebook, Instagram, YouTube) */}
            <div className="flex items-center gap-2.5">
              {/* LinkedIn */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white neu-sm flex items-center justify-center text-slate-700 hover:text-[#7C3AED] hover:scale-105 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white neu-sm flex items-center justify-center text-slate-700 hover:text-[#7C3AED] hover:scale-105 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white neu-sm flex items-center justify-center text-slate-700 hover:text-[#7C3AED] hover:scale-105 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-white neu-sm flex items-center justify-center text-slate-700 hover:text-[#7C3AED] hover:scale-105 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
