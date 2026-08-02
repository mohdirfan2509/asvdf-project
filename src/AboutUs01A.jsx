import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Users,
  Building2,
  ShieldCheck,
  Star,
  Play,
  ArrowRight
} from 'lucide-react';
import Navbar from './Navbar';

export default function AboutUs01A({ onNavigate, showNavbar = true }) {
  const statsList = [
    { value: "120+", label: "Projects Completed", icon: Award },
    { value: "100+", label: "Happy Clients", icon: Users },
    { value: "8+", label: "Industries Served", icon: Building2 },
    { value: "98%", label: "Client Satisfaction", icon: ShieldCheck }
  ];

  return (
    <div className="h-full w-full font-['Poppins'] antialiased text-slate-900 flex flex-col justify-between overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {showNavbar && <Navbar activePage="About Us" onNavigate={onNavigate} />}

      {/* MAIN FLOATING CONTAINER */}
      <main className="flex-1 flex flex-col justify-between max-w-[1440px] w-full mx-auto bg-white rounded-[2rem] p-5 sm:p-6 lg:p-7 neu-lg border border-white/80 min-h-0 overflow-hidden">
        
        {/* TOP HERO SECTION: Left Column Content + Right Column Image Banner */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-0">
          
          {/* Left Column: Category Label, Heading, Description & Buttons */}
          <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-4">
            
            {/* Small purple section label */}
            <span className="text-[10px] font-[600] tracking-widest text-[#7C3AED] uppercase mb-1.5">
              ABOUT ASVDF FLOORING
            </span>

            {/* Large Bold Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-[800] tracking-[-0.04em] leading-[1.08] text-slate-900 mb-2.5">
              Building Stronger Foundations.
              <br />
              Creating{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                Lasting Value.
              </span>
            </h1>

            {/* Purple Accent Bar */}
            <div className="w-8 h-[2.5px] bg-[#7C3AED] rounded-full mb-4" />

            {/* Paragraph Descriptions */}
            <p className="text-xs sm:text-sm text-slate-500 font-[400] leading-relaxed mb-3 max-w-xl">
              ASVDF Flooring Private Limited (ASVDF) is a leading provider of high-performance flooring solutions for industrial, commercial, and infrastructure projects.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 font-[400] leading-relaxed mb-7 max-w-xl">
              With a commitment to quality, innovation, and customer satisfaction, we deliver floors that stand the test of time and performance.
            </p>

            {/* Two Action Buttons */}
            <div className="flex items-center gap-3.5">
              {/* Request a Quote Primary Button */}
              <button className="inline-flex items-center gap-2 text-white text-xs font-[600] px-6 py-3.5 rounded-full neu-btn-primary cursor-pointer">
                <span>Request a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Watch Our Story Secondary Button */}
              <button className="inline-flex items-center gap-2.5 text-slate-800 text-xs font-[600] px-6 py-3.5 rounded-full neu-btn-secondary cursor-pointer">
                <div className="w-5 h-5 rounded-full bg-[#F6F7FB] neu-inset flex items-center justify-center text-slate-800">
                  <Play className="w-2.5 h-2.5 fill-slate-800 ml-0.5" />
                </div>
                <span>Watch Our Story</span>
              </button>
            </div>
          </div>

          {/* Right Column: Industrial Warehouse Image Banner with Floating 12+ Years Card Overlay */}
          <div className="lg:col-span-6 relative rounded-[1.75rem] overflow-hidden h-full min-h-[260px] lg:min-h-[320px] flex items-center shadow-lg border border-slate-100">
            {/* Warehouse Floor Image */}
            <img
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop"
              alt="ASVDF Industrial Flooring Warehouse"
              className="w-full h-full object-cover"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 to-transparent" />

            {/* Floating 12+ Years Card Overlay (Bottom Left inside image frame) */}
            <div className="absolute left-6 bottom-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 neu-md border border-white flex items-center gap-3.5 max-w-xs shadow-xl">
              <div className="w-11 h-11 rounded-xl bg-[#F6F7FB] neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                <Star className="w-5 h-5 fill-[#7C3AED]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-[800] text-slate-900 leading-tight">
                  12+ Years
                </span>
                <span className="text-[11px] font-[600] text-slate-900 leading-tight">
                  of Excellence
                </span>
                <span className="text-[9.5px] font-[400] text-slate-500 leading-tight mt-0.5">
                  Delivering quality flooring solutions since 2012
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: 4 Stat Items Bar */}
        <div className="shrink-0 bg-[#F6F7FB] rounded-2xl p-4 neu-sm border border-white mt-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
            {statsList.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-4 ${
                    idx !== 0 ? "lg:pl-8" : ""
                  }`}
                >
                  <div className="w-11 h-11 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-[800] text-[#7C3AED] leading-none mb-0.5">
                      {stat.value}
                    </span>
                    <span className="text-xs font-[500] text-slate-500">
                      {stat.label}
                    </span>
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
