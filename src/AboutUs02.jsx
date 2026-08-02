import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Users,
  Cog,
  ShieldCheck,
  Building,
  Target,
  Eye,
  UserCheck,
  Shield
} from 'lucide-react';
import Navbar from './Navbar';

const MILESTONES = [
  {
    year: "2012",
    title: "Company Founded",
    description: "ASVDF Flooring was established with a clear vision to deliver premium flooring solutions.",
    icon: Building2
  },
  {
    year: "2014",
    title: "First Major Projects",
    description: "Delivered our first large-scale industrial flooring projects, earning the trust of top clients.",
    icon: Users
  },
  {
    year: "2017",
    title: "Technology Upgrade",
    description: "Invested in advanced machinery and laser leveling technology to enhance precision and efficiency.",
    icon: Cog
  },
  {
    year: "2020",
    title: "Expanded Services",
    description: "Introduced specialized flooring solutions for diverse industries and strengthened our team.",
    icon: ShieldCheck
  },
  {
    year: "2024",
    title: "Stronger Than Ever",
    description: "100+ projects completed with a growing list of satisfied clients across India and expanding further.",
    icon: Building
  }
];

const PILLAR_CARDS = [
  {
    title: "Mission",
    icon: Target,
    text: "To deliver innovative and durable flooring solutions that enhance spaces and exceed expectations."
  },
  {
    title: "Vision",
    icon: Eye,
    text: "To be the most trusted flooring solutions provider, recognized for quality, innovation, and integrity."
  },
  {
    title: "Our Approach",
    icon: UserCheck,
    text: "We combine advanced technology, skilled workforce, and best practices to deliver results that last."
  },
  {
    title: "Why Choose Us?",
    icon: Shield,
    text: "Quality materials, timely delivery, safety-first approach, and unmatched customer support."
  }
];

export default function AboutUs02({ onNavigate, showNavbar = true }) {
  return (
    <div className="h-full w-full font-['Poppins'] antialiased text-slate-900 flex flex-col justify-between overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {showNavbar && <Navbar activePage="About Us" onNavigate={onNavigate} />}

      {/* MAIN FLOATING CONTAINER */}
      <main className="flex-1 flex flex-col justify-between max-w-[1440px] w-full mx-auto bg-white rounded-[2rem] p-4 sm:p-5 lg:p-6 neu-lg border border-white/80 min-h-0 overflow-hidden">
        
        {/* HEADER SECTION (Top Section: Title + Right Description Paragraph) */}
        <div className="shrink-0 flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2.5">
          
          {/* Left Column: Small Label + Big Heading */}
          <div className="flex flex-col items-start max-w-xl">
            {/* Small purple section label */}
            <span className="text-[10px] font-[600] tracking-widest text-[#7C3AED] uppercase mb-1">
              OUR JOURNEY
            </span>

            {/* Large Bold Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.04em] leading-[1.08] text-slate-900">
              Milestones That
              <br />
              Define{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                Our Growth
              </span>
            </h1>
          </div>

          {/* Right Column: Paragraph Description */}
          <div className="flex items-center max-w-md">
            <p className="text-xs font-[400] text-slate-500 leading-relaxed">
              From a promising start to becoming an industry leader, our journey has been built on trust, hard work, and an unwavering commitment to excellence.
            </p>
          </div>
        </div>

        {/* TOP HALF: TIMELINE SECTION (Horizontal Timeline with 5 Milestone Nodes) */}
        <div className="flex-1 flex flex-col justify-center min-h-0 py-1">
          
          {/* Top Horizontal Connecting Line & Node Circles Container */}
          <div className="relative w-full mb-3">
            {/* Dotted Horizontal Connecting Line */}
            <div className="absolute top-1/2 left-[8%] right-[8%] -translate-y-1/2 h-[2px] border-b-2 border-dashed border-purple-300/70 z-0" />

            {/* 5 Milestone Circular Icon Nodes Grid */}
            <div className="grid grid-cols-5 gap-2 relative z-10">
              {MILESTONES.map((milestone, idx) => {
                const IconComp = milestone.icon;
                return (
                  <div key={idx} className="flex flex-col items-center justify-center relative">
                    
                    {/* Circular Raised Icon Badge */}
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-[#F6F7FB] neu-sm flex items-center justify-center text-[#7C3AED] border border-white cursor-pointer shadow-md"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white neu-inset flex items-center justify-center">
                        <IconComp className="w-4 h-4 sm:w-4 sm:h-4" />
                      </div>
                    </motion.div>

                    {/* Small Connecting Dot on Line */}
                    {idx < MILESTONES.length - 1 && (
                      <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#7C3AED] border-2 border-white shadow-sm z-20" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Grid for Milestone Details */}
          <div className="grid grid-cols-5 gap-2 divide-x divide-slate-200/60">
            {MILESTONES.map((milestone, idx) => (
              <div key={idx} className={`flex flex-col items-center text-center px-1.5 sm:px-2 ${idx !== 0 ? "pl-2" : ""}`}>
                {/* Year in Bold Purple */}
                <span className="text-base sm:text-lg lg:text-xl font-[800] text-[#7C3AED] leading-none mb-1">
                  {milestone.year}
                </span>

                {/* Milestone Title */}
                <h3 className="text-[11px] sm:text-xs font-[700] text-slate-900 leading-tight mb-0.5">
                  {milestone.title}
                </h3>

                {/* Description */}
                <p className="text-[10px] font-[400] text-slate-500 leading-snug max-w-[180px] line-clamp-2">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* BOTTOM HALF: OUR STORY & 4 PILLAR CARDS (Exact match to About-Us-page-01B.png) */}
        <div className="shrink-0 bg-[#F6F7FB] rounded-2xl p-3.5 sm:p-4 neu-sm border border-white mt-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            
            {/* Left Column: OUR STORY Headline & Paragraph */}
            <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-2">
              <span className="text-[10px] font-[600] tracking-widest text-[#7C3AED] uppercase mb-1">
                OUR STORY
              </span>

              <h2 className="text-base sm:text-lg font-[800] tracking-tight text-slate-900 leading-tight mb-1">
                A Legacy of Quality
                <br />
                and Commitment.
              </h2>

              <div className="w-7 h-[2px] bg-[#7C3AED] rounded-full mb-2" />

              <p className="text-[10px] sm:text-[11px] font-[400] text-slate-500 leading-relaxed">
                Founded with a vision to redefine flooring standards, ASVDF Flooring has grown into a trusted name across industries. Our journey is built on hard work, technical expertise, and a relentless focus on delivering durable, high-performance flooring solutions.
              </p>
            </div>

            {/* Right Column: 4 Pillar Cards Grid (Mission, Vision, Our Approach, Why Choose Us?) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {PILLAR_CARDS.map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#FFFFFF] rounded-2xl p-3 neu-sm border border-slate-100 flex flex-col justify-between h-full"
                  >
                    <div>
                      {/* Header: Inset Circular Icon + Title */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-xl bg-[#F6F7FB] neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <h3 className="text-xs font-[700] text-slate-900 leading-tight">
                          {card.title}
                        </h3>
                      </div>

                      {/* Text Description */}
                      <p className="text-[10px] font-[400] text-slate-500 leading-snug">
                        {card.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
