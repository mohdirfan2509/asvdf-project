import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Handshake,
  Building2,
  Award,
  Users,
  Target,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import Navbar from './Navbar';

const CLIENT_LOGOS = [
  {
    name: "TATA PROJECTS",
    subtitle: "TATA",
    logoSvg: (
      <div className="flex flex-col items-center justify-center">
        <svg viewBox="0 0 100 35" className="h-6 w-auto" fill="#00529C">
          <path d="M15 5 L35 5 L25 25 Z" fill="#00529C" />
        </svg>
        <span className="font-extrabold text-[#00529C] text-xs tracking-wider">TATA</span>
        <span className="font-bold text-[#00529C] text-[8px] tracking-widest mt-0.5">TATA PROJECTS</span>
      </div>
    )
  },
  {
    name: "LARSEN & TOUBRO",
    logoSvg: (
      <div className="flex flex-col items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#003B73] flex items-center justify-center mb-0.5">
          <span className="font-black text-[#003B73] text-xs">L&T</span>
        </div>
        <span className="font-bold italic text-[#003B73] text-[9px] tracking-tight">LARSEN & TOUBRO</span>
      </div>
    )
  },
  {
    name: "Adani Group",
    logoSvg: (
      <div className="flex flex-col items-center justify-center">
        <span className="font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-[#2065AC] via-[#359B98] to-[#E3547D] bg-clip-text text-transparent">
          adani
        </span>
        <span className="font-medium text-slate-500 text-[8px] tracking-wider">Adani Group</span>
      </div>
    )
  },
  {
    name: "Godrej Properties",
    logoSvg: (
      <div className="flex items-center gap-1.5 justify-center">
        <span className="font-serif italic text-xl font-bold text-[#C52B5B]">Godrej</span>
        <span className="text-[10px] text-slate-400 font-light">| PROPERTIES</span>
      </div>
    )
  },
  {
    name: "Mahindra Rise",
    logoSvg: (
      <div className="flex flex-col items-center justify-center">
        <span className="font-black text-lg text-[#E31837] tracking-tight">Mahindra</span>
        <span className="text-[8px] text-slate-500 font-medium tracking-widest self-end -mt-1">Rise.</span>
      </div>
    )
  },
  {
    name: "DHL Express",
    logoSvg: (
      <div className="bg-[#FFCC00] px-3 py-1.5 rounded flex items-center justify-center">
        <span className="font-black italic text-lg text-[#D40511] tracking-tighter">DHL</span>
        <span className="font-bold italic text-[8px] text-[#D40511] ml-1 tracking-widest">EXPRESS</span>
      </div>
    )
  },
  {
    name: "Maruti Suzuki",
    logoSvg: (
      <div className="flex items-center gap-1.5 justify-center">
        <div className="w-5 h-5 bg-[#ED1C24] rotate-45 flex items-center justify-center shrink-0">
          <span className="text-white text-[8px] font-black -rotate-45">S</span>
        </div>
        <span className="font-black text-[#0A2540] text-xs tracking-tight">MARUTI SUZUKI</span>
      </div>
    )
  },
  {
    name: "Amazon",
    logoSvg: (
      <div className="flex flex-col items-center justify-center">
        <span className="font-black text-xl text-slate-900 tracking-tight leading-none">amazon</span>
        <svg viewBox="0 0 50 10" className="w-10 h-2 mt-0.5 text-[#FF9900]" fill="currentColor">
          <path d="M5 2 Q25 9 45 2 L42 0 Q25 7 8 0 Z" />
        </svg>
      </div>
    )
  },
  {
    name: "Reliance Industries",
    logoSvg: (
      <div className="flex flex-col items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-[#E4A025] flex items-center justify-center mb-0.5">
          <span className="text-white text-[9px] font-bold">R</span>
        </div>
        <span className="font-serif font-bold text-xs text-slate-900 leading-tight">Reliance</span>
        <span className="text-[7px] text-slate-500 font-medium">Industries Limited</span>
      </div>
    )
  },
  {
    name: "Saint-Gobain",
    logoSvg: (
      <div className="flex flex-col items-center justify-center">
        <svg viewBox="0 0 60 20" className="w-12 h-5 text-[#0055A5]" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 15 L15 5 L25 15 L35 5 L45 15 L55 5" />
        </svg>
        <span className="font-bold text-[#0055A5] text-[10px] tracking-tight mt-0.5">SAINT-GOBAIN</span>
      </div>
    )
  },
  {
    name: "JSW Steel",
    logoSvg: (
      <div className="flex items-center gap-1 justify-center">
        <span className="font-black italic text-lg text-[#004B87]">JSW</span>
        <span className="font-bold text-xs text-slate-600">Steel</span>
      </div>
    )
  },
  {
    name: "UltraTech Cement",
    logoSvg: (
      <div className="bg-[#FFD100] px-3 py-1.5 rounded flex flex-col items-center justify-center border border-yellow-400">
        <span className="font-extrabold italic text-slate-900 text-xs tracking-tight">UltraTech</span>
        <span className="font-black italic text-[7px] text-[#D40511] tracking-wider">CEMENT</span>
      </div>
    )
  }
];

export default function Clients({ onNavigate, showNavbar = true }) {
  const [activeTestimonialDot, setActiveTestimonialDot] = useState(0);

  const statsList = [
    { label: "Happy Clients", value: "100+", icon: Handshake },
    { label: "Industries Served", value: "8+", icon: Building2 },
    { label: "Projects Completed", value: "120+", icon: Award },
    { label: "Client Satisfaction", value: "98%", icon: Users }
  ];

  return (
    <div className="h-full w-full font-['Poppins'] antialiased text-slate-900 flex flex-col justify-between overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {showNavbar && <Navbar activePage="Clients" onNavigate={onNavigate} />}

      {/* MAIN FLOATING CONTAINER */}
      <main className="flex-1 flex flex-col justify-between max-w-[1440px] w-full mx-auto bg-white rounded-[2rem] p-4 sm:p-5 lg:p-6 neu-lg border border-white/80 min-h-0 overflow-hidden">
        
        {/* TOP SECTION */}
        <div className="shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center mb-3">
          
          <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-4">
            <span className="text-[10px] font-[600] tracking-widest text-[#7C3AED] uppercase mb-1">
              OUR CLIENTS
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.04em] leading-[1.08] text-slate-900 mb-2">
              Trusted by Industry Leaders.
              <br />
              Built on{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                Trust.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 font-[400] leading-relaxed mb-4 max-w-lg">
              We take pride in partnering with forward-thinking companies across industries. Their trust inspires us to deliver excellence in every square foot.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
              {statsList.map((stat, idx) => {
                const IconComp = stat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#F6F7FB] rounded-2xl p-2.5 neu-sm flex flex-col items-center justify-center text-center border border-white"
                  >
                    <div className="w-9 h-9 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED] mb-1.5">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-base font-[800] text-slate-900 leading-none mb-0.5">
                      {stat.value}
                    </span>
                    <span className="text-[9px] font-[500] text-slate-500 whitespace-nowrap">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-full min-h-[220px] lg:min-h-[240px] flex items-center shadow-lg border border-slate-800">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop')` }}
            />
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs" />

            <div className="relative z-10 p-6 flex flex-col justify-between h-full w-full">
              <div className="text-4xl font-serif font-bold text-purple-400/80 leading-none mb-2">
                “
              </div>

              <p className="text-xs sm:text-sm text-slate-100 font-[400] leading-relaxed mb-4 italic">
                ASVDF Flooring delivered beyond our expectations with unparalleled quality and professionalism.
              </p>

              <div className="flex flex-col border-t border-white/10 pt-3">
                <span className="text-xs font-[600] text-slate-200">
                  – Operations Head
                </span>
                <span className="text-[10px] font-[400] text-slate-400">
                  Leading Automotive Manufacturer
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* MIDDLE SECTION */}
        <div className="flex-1 flex flex-col justify-center min-h-0 my-1">
          <div className="flex flex-col items-center mb-3">
            <h2 className="text-base sm:text-lg font-[800] text-slate-900 tracking-tight">
              Our Esteemed Clients
            </h2>
            <div className="w-8 h-[2.5px] bg-[#7C3AED] rounded-full mt-1" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {CLIENT_LOGOS.map((client, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="bg-[#FFFFFF] rounded-2xl py-3 px-3 neu-sm neu-md-hover border border-slate-100/80 flex items-center justify-center h-16 sm:h-18 cursor-pointer"
              >
                {client.logoSvg}
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-3 items-center pt-2">
          
          <div className="lg:col-span-5 bg-[#F6F7FB] rounded-2xl p-3.5 neu-sm flex items-start gap-3 border border-white">
            <div className="text-3xl font-serif font-bold text-[#7C3AED] leading-none shrink-0">
              “
            </div>
            <div className="flex flex-col">
              <p className="text-[11px] font-[400] text-slate-600 leading-snug mb-1">
                Working with ASVDF Flooring has been a seamless experience. Their commitment to quality, safety, and timely delivery is truly commendable.
              </p>
              <span className="text-[10px] font-[600] text-[#7C3AED]">
                – Project Manager, Tata Projects
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#F6F7FB] rounded-2xl p-3 neu-sm flex flex-col justify-between border border-white">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pr-2">
                <div className="w-9 h-9 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[11px] font-[600] text-slate-900 leading-tight">
                    Quality Focused
                  </h4>
                  <p className="text-[10px] font-[400] text-slate-500 leading-tight mt-0.5">
                    We ensure the highest standards in every project.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
                <div className="w-9 h-9 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[11px] font-[600] text-slate-900 leading-tight">
                    On-Time Delivery
                  </h4>
                  <p className="text-[10px] font-[400] text-slate-500 leading-tight mt-0.5">
                    Committed to completing projects on schedule.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-3">
                <div className="w-9 h-9 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[11px] font-[600] text-slate-900 leading-tight">
                    Long-Term Partnership
                  </h4>
                  <p className="text-[10px] font-[400] text-slate-500 leading-tight mt-0.5">
                    Building lasting relationships through trust and results.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 mt-2">
              <button 
                onClick={() => setActiveTestimonialDot(0)}
                aria-label="Dot 1"
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${activeTestimonialDot === 0 ? "w-4 bg-[#7C3AED]" : "bg-slate-300"}`}
              />
              <button 
                onClick={() => setActiveTestimonialDot(1)}
                aria-label="Dot 2"
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${activeTestimonialDot === 1 ? "w-4 bg-[#7C3AED]" : "bg-slate-300"}`}
              />
              <button 
                onClick={() => setActiveTestimonialDot(2)}
                aria-label="Dot 3"
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${activeTestimonialDot === 2 ? "w-4 bg-[#7C3AED]" : "bg-slate-300"}`}
              />
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
