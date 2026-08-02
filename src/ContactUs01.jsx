import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock
} from 'lucide-react';
import Navbar from './Navbar';

export default function ContactUs01({ onNavigate, showNavbar = true }) {
  const contactDetails = [
    {
      title: "Our Office",
      icon: MapPin,
      lines: [
        "Plot No. 123, Industrial Area,",
        "Phase 2, Chakan, Pune – 410501,",
        "Maharashtra, India"
      ]
    },
    {
      title: "Call Us",
      icon: Phone,
      lines: [
        "+91 98765 43210",
        "+91 20 1234 5678"
      ]
    },
    {
      title: "Email Us",
      icon: Mail,
      lines: [
        "info@asvdflooring.com",
        "projects@asvdflooring.com"
      ]
    },
    {
      title: "Working Hours",
      icon: Clock,
      lines: [
        "Mon - Sat : 9:00 AM – 6:00 PM",
        "Sunday : Closed"
      ]
    }
  ];

  return (
    <div className="h-full w-full font-['Poppins'] antialiased text-slate-900 flex flex-col justify-between overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {showNavbar && <Navbar activePage="Contact Us" onNavigate={onNavigate} />}

      {/* MAIN FLOATING CONTAINER */}
      <main className="flex-1 flex flex-col justify-between max-w-[1440px] w-full mx-auto bg-white rounded-[2rem] p-6 sm:p-8 lg:p-10 neu-lg border border-white/80 min-h-0 overflow-hidden">
        
        {/* TOP HERO BANNER (Left Content + Right Circular Dotted Orbital Graphic with 3 Raised Neumorphic Cards) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-0 my-auto">
          
          {/* Left Column: Category Label, Heading & Description */}
          <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-4">
            
            {/* Small purple section label */}
            <span className="text-[11px] font-[600] tracking-widest text-[#7C3AED] uppercase mb-2">
              GET IN TOUCH
            </span>

            {/* Large Bold Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-[800] tracking-[-0.04em] leading-[1.08] text-slate-900 mb-3">
              Let’s Build Your Next
              <br />
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                Flooring
              </span>{" "}
              Project
            </h1>

            {/* Purple Accent Bar */}
            <div className="w-9 h-[2.5px] bg-[#7C3AED] rounded-full mb-5" />

            {/* Subtext Paragraphs */}
            <p className="text-sm sm:text-base text-slate-500 font-[400] leading-relaxed mb-1 max-w-lg">
              Have a project in mind? We’d love to hear from you.
            </p>
            <p className="text-sm sm:text-base text-slate-500 font-[400] leading-relaxed max-w-lg">
              Reach out to us and our team will get back to you promptly.
            </p>
          </div>

          {/* Right Column: Orbital Dotted Loop with 3 Raised Neumorphic Icon Cards */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[240px] sm:min-h-[300px]">
            
            {/* Dotted Circular Orbit Vector Graphic */}
            <div className="absolute w-[280px] h-[160px] sm:w-[360px] sm:h-[200px] border-2 border-dashed border-purple-300/60 rounded-full rotate-[-12deg] flex items-center justify-between px-6 pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <div className="w-2 h-2 rounded-full bg-purple-400" />
            </div>

            {/* 3 Raised Neumorphic Icon Badges in Orbit Layout */}
            <div className="relative z-10 w-full flex items-center justify-center gap-6 sm:gap-10">
              
              {/* Mail Badge Left */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.2 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F6F7FB] neu-md flex items-center justify-center text-[#7C3AED] border border-white shadow-lg cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white neu-inset flex items-center justify-center">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </motion.div>

              {/* Phone Badge Center (Slightly larger) */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.2 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#F6F7FB] neu-lg flex items-center justify-center text-[#7C3AED] border border-white shadow-xl cursor-pointer translate-y-4"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white neu-inset flex items-center justify-center">
                  <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
              </motion.div>

              {/* Location MapPin Badge Right */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.2 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F6F7FB] neu-md flex items-center justify-center text-[#7C3AED] border border-white shadow-lg cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white neu-inset flex items-center justify-center">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </motion.div>

            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: CONTACT INFORMATION BAR (4 Detailed Contact Items) */}
        <div className="shrink-0 bg-[#F6F7FB] rounded-2xl p-5 sm:p-6 neu-sm border border-white mt-4">
          <h2 className="text-base sm:text-lg font-[800] text-slate-900 tracking-tight mb-4">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
            {contactDetails.map((detail, idx) => {
              const IconComp = detail.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-4 pt-4 sm:pt-0 ${
                    idx !== 0 ? "sm:pl-6" : ""
                  }`}
                >
                  {/* Raised Circular Icon Badge */}
                  <div className="w-12 h-12 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col">
                    <h3 className="text-xs sm:text-sm font-[700] text-slate-900 leading-tight mb-1">
                      {detail.title}
                    </h3>
                    {detail.lines.map((line, lineIdx) => (
                      <span key={lineIdx} className="text-[11px] sm:text-xs font-[400] text-slate-500 leading-tight">
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}
