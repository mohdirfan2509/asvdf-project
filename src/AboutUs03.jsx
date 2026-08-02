import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Award,
  HardHat,
  Lightbulb,
  Handshake,
  Users
} from 'lucide-react';
import Navbar from './Navbar';

const CORE_VALUES = [
  {
    title: "Integrity",
    description: "We conduct business with honesty and transparency.",
    icon: ShieldCheck
  },
  {
    title: "Quality",
    description: "We never compromise on the quality of our materials and work.",
    icon: Award
  },
  {
    title: "Safety",
    description: "We prioritize safety in every project and work environment.",
    icon: HardHat
  },
  {
    title: "Innovation",
    description: "We embrace new technologies to deliver better solutions.",
    icon: Lightbulb
  },
  {
    title: "Commitment",
    description: "We are committed to building long-term client relationships.",
    icon: Handshake
  },
  {
    title: "Customer First",
    description: "Our clients' success is at the heart of everything we do.",
    icon: Users
  }
];

const CERTIFICATIONS = [
  {
    code: "9001:2015",
    label: "Certified",
    logoSvg: (
      <div className="flex flex-col items-center justify-center">
        <span className="font-black text-xl text-[#0A2540] tracking-tighter">ISO</span>
        <div className="w-6 h-0.5 bg-[#0A2540] my-0.5" />
      </div>
    )
  },
  {
    code: "14001:2015",
    label: "Certified",
    logoSvg: (
      <div className="flex flex-col items-center justify-center">
        <span className="font-black text-xl text-[#0A2540] tracking-tighter">ISO</span>
        <div className="w-6 h-0.5 bg-[#0A2540] my-0.5" />
      </div>
    )
  },
  {
    code: "45001:2018",
    label: "Certified",
    logoSvg: (
      <div className="flex flex-col items-center justify-center">
        <span className="font-black text-xl text-[#0A2540] tracking-tighter">ISO</span>
        <div className="w-6 h-0.5 bg-[#0A2540] my-0.5" />
      </div>
    )
  },
  {
    code: "MSME",
    label: "Registered",
    logoSvg: (
      <div className="flex flex-col items-center justify-center">
        <span className="font-black text-lg text-[#003B73] tracking-tight">MSME</span>
        <span className="text-[7px] text-slate-400 font-bold tracking-widest">GOVT OF INDIA</span>
      </div>
    )
  },
  {
    code: "Proudly",
    label: "Indian",
    logoSvg: (
      <div className="flex flex-col items-center justify-center">
        <span className="font-black text-xs text-slate-900 tracking-wider uppercase">MAKE IN INDIA</span>
        <svg viewBox="0 0 60 20" className="w-12 h-4 text-slate-900 fill-current mt-0.5">
          <path d="M5 10 C15 2, 45 2, 55 10 C45 18, 15 18, 5 10 Z" />
        </svg>
      </div>
    )
  }
];

export default function AboutUs03({ onNavigate, showNavbar = true }) {
  return (
    <div className="h-full w-full font-['Poppins'] antialiased text-slate-900 flex flex-col justify-between overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {showNavbar && <Navbar activePage="About Us" onNavigate={onNavigate} />}

      {/* MAIN FLOATING CONTAINER */}
      <main className="flex-1 flex flex-col justify-between max-w-[1440px] w-full mx-auto bg-white rounded-[2rem] p-5 sm:p-6 lg:p-7 neu-lg border border-white/80 min-h-0 overflow-hidden">
        
        {/* TOP SECTION: OUR CORE VALUES (Header + 6 Raised Cards Grid) */}
        <div className="flex-1 flex flex-col justify-between min-h-0 mb-4">
          
          {/* Header Bar: Small Label, Big Heading & Right Description Paragraph */}
          <div className="shrink-0 flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            {/* Left Title */}
            <div className="flex flex-col items-start max-w-xl">
              <span className="text-[10px] font-[600] tracking-widest text-[#7C3AED] uppercase mb-1">
                OUR CORE VALUES
              </span>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.04em] leading-[1.08] text-slate-900">
                The Principles That
                <br />
                Drive{" "}
                <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                  Everything We Do
                </span>
              </h1>
              <div className="w-8 h-[2.5px] bg-[#7C3AED] rounded-full mt-2" />
            </div>

            {/* Right Description Paragraph */}
            <div className="flex items-center max-w-md">
              <p className="text-xs sm:text-sm text-slate-500 font-[400] leading-relaxed">
                Our values are more than words — they are the foundation of our culture, the way we work, and the promise we keep to our clients.
              </p>
            </div>
          </div>

          {/* 6 Core Value Cards Grid (6 Columns) */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 min-h-0">
            {CORE_VALUES.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#F6F7FB] rounded-2xl p-3.5 sm:p-4 neu-sm border border-white flex flex-col items-center justify-center text-center h-full"
                >
                  {/* Big Circular Raised Icon Badge */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F6F7FB] neu-sm flex items-center justify-center text-[#7C3AED] mb-3 shrink-0 shadow-sm border border-white">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white neu-inset flex items-center justify-center">
                      <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xs sm:text-sm font-[700] text-slate-900 leading-tight mb-1.5">
                    {val.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] font-[400] text-slate-500 leading-snug">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* BOTTOM SECTION: CERTIFICATIONS & COMPLIANCE BAR */}
        <div className="shrink-0 bg-[#F6F7FB] rounded-2xl p-4 neu-sm border border-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Left Column: Title & Text */}
            <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-3">
              <h2 className="text-base sm:text-lg font-[800] tracking-tight text-slate-900 leading-tight mb-1">
                Certified. Compliant. Committed.
              </h2>
              <div className="w-7 h-[2px] bg-[#7C3AED] rounded-full mb-2" />
              <p className="text-[11px] font-[400] text-slate-500 leading-relaxed">
                We adhere to the highest industry standards and best practices to ensure quality and safety.
              </p>
            </div>

            {/* Right Column: 5 Certification Cards Grid */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFFFFF] rounded-2xl p-3 neu-sm border border-slate-100 flex flex-col items-center justify-center text-center h-24"
                >
                  <div className="mb-1">
                    {cert.logoSvg}
                  </div>
                  <span className="text-[11px] font-[700] text-slate-900 leading-none">
                    {cert.code}
                  </span>
                  <span className="text-[9px] font-[500] text-slate-500 leading-none mt-1">
                    {cert.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
