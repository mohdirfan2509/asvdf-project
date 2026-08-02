import React from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Users,
  Award,
  ShieldCheck,
  Building2,
  ArrowRight,
  MessageSquareQuote
} from 'lucide-react';
import Navbar from './Navbar';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    quote: "ASVDF Flooring transformed our warehouse with their high-performance flooring. The finish, strength, and durability are beyond our expectations.",
    name: "Rajesh Kumar",
    role: "Operations Manager",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    logoSvg: (
      <div className="bg-[#FFCC00] px-2.5 py-1 rounded flex items-center justify-center">
        <span className="font-black italic text-xs text-[#D40511] tracking-tighter">DHL</span>
      </div>
    )
  },
  {
    id: 2,
    quote: "Their team showed outstanding professionalism and attention to detail. The project was delivered on time with flawless execution.",
    name: "Sneha Patil",
    role: "Project Director",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    logoSvg: (
      <div className="flex items-center gap-0.5 justify-center">
        <span className="font-black italic text-xs text-[#004B87]">JSW</span>
      </div>
    )
  },
  {
    id: 3,
    quote: "The flooring quality and surface finish are excellent. ASVDF's solutions have significantly improved the safety and efficiency of our facility.",
    name: "Amit Verma",
    role: "Plant Head",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    logoSvg: (
      <div className="flex flex-col items-center justify-center">
        <span className="font-extrabold text-[#00529C] text-[10px] tracking-wider">TATA</span>
      </div>
    )
  },
  {
    id: 4,
    quote: "From consultation to completion, the entire experience was seamless. ASVDF understands client needs and delivers exactly what they promise.",
    name: "Vikram Singh",
    role: "Director – Infrastructure",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    logoSvg: (
      <div className="flex flex-col items-center justify-center">
        <span className="font-bold italic text-[#003B73] text-[9px] tracking-tight">L&T</span>
      </div>
    )
  },
  {
    id: 5,
    quote: "Their industrial flooring is top-notch! Withstands heavy loads and daily wear perfectly. Highly recommended for any large-scale project.",
    name: "Pooja Mehta",
    role: "Facilities Manager",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    logoSvg: (
      <div className="flex items-center justify-center">
        <span className="font-black text-xs text-[#E31837] tracking-tight">Hero</span>
      </div>
    )
  },
  {
    id: 6,
    quote: "Reliable, efficient, and committed to quality – ASVDF Flooring is our go-to partner for all our flooring requirements.",
    name: "Mohammed Iqbal",
    role: "Procurement Manager",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    logoSvg: (
      <div className="flex items-center justify-center">
        <span className="font-black text-xs text-slate-900 tracking-tight">amazon</span>
      </div>
    )
  }
];

export default function Testimonials({ onNavigate, showNavbar = true }) {
  const bottomStats = [
    { value: "250+", label: "Happy Clients", icon: Users },
    { value: "500+", label: "Projects Completed", icon: Award },
    { value: "98%", label: "Client Satisfaction", icon: ShieldCheck },
    { value: "10+", label: "Years of Excellence", icon: Building2 }
  ];

  return (
    <div className="h-full w-full font-['Poppins'] antialiased text-slate-900 flex flex-col justify-between overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {showNavbar && <Navbar activePage="Testimonials" onNavigate={onNavigate} />}

      {/* MAIN FLOATING CONTAINER */}
      <main className="flex-1 flex flex-col justify-between max-w-[1440px] w-full mx-auto bg-white rounded-[2rem] p-4 sm:p-5 lg:p-6 neu-lg border border-white/80 min-h-0 overflow-hidden">
        
        {/* TOP HERO SECTION: Left Headline + Right Featured Image Box */}
        <div className="shrink-0 relative rounded-3xl overflow-hidden min-h-[160px] sm:min-h-[190px] flex items-center shadow-lg border border-slate-100 mb-3">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop')` }}
          />

          {/* Left Side Light Overlay Tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent w-full lg:w-3/5" />
          <div className="absolute inset-0 bg-slate-950/20" />

          {/* Hero Left Content */}
          <div className="relative z-10 p-6 sm:p-8 max-w-xl flex flex-col items-start">
            <span className="text-[10px] font-[600] tracking-widest text-[#7C3AED] uppercase mb-1">
              TESTIMONIALS
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.04em] leading-[1.08] text-slate-900 mb-1.5">
              Trusted by Clients.
              <br />
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                Proven
              </span>{" "}
              by Results.
            </h1>

            <div className="w-8 h-[2.5px] bg-[#7C3AED] rounded-full mb-2" />

            <p className="text-xs text-slate-500 font-[400] leading-relaxed max-w-md">
              We take pride in delivering high-performance flooring solutions that exceed expectations. Here’s what our clients have to say about their experience with ASVDF.
            </p>
          </div>

          {/* Hero Right Featured Floating Quote Box */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center justify-center bg-white/95 backdrop-blur-md rounded-2xl p-5 neu-md border border-white max-w-xs text-center shadow-xl">
            <div className="w-9 h-9 rounded-full bg-[#7C3AED] flex items-center justify-center text-white mb-2 shadow-md">
              <span className="text-lg font-serif font-bold leading-none">“</span>
            </div>
            <p className="text-xs font-[400] text-slate-600 leading-snug mb-3">
              Our commitment to quality, precision, and reliability has earned the trust of leading businesses across industries.
            </p>
            <div className="flex items-center gap-1 text-[#7C3AED]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#7C3AED]" />
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: 6 TESTIMONIAL CARDS GRID (3 Columns x 2 Rows) */}
        <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-visible my-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 h-full">
            {TESTIMONIALS_DATA.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-[#F6F7FB] rounded-2xl p-3.5 sm:p-4 neu-sm border border-white flex flex-col justify-between h-full"
              >
                <div>
                  {/* Top Quote Icon & 5 Stars */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED]">
                      <span className="text-base font-serif font-bold leading-none">“</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-[#7C3AED]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#7C3AED]" />
                      ))}
                    </div>
                  </div>

                  {/* Quote Text */}
                  <p className="text-[11px] font-[400] text-slate-600 leading-relaxed mb-3">
                    {t.quote}
                  </p>
                </div>

                {/* Card Footer: Author Avatar & Info + Company Logo Badge */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-8 h-8 rounded-full object-cover border border-white shadow-sm"
                    />
                    <div className="flex flex-col">
                      <h4 className="text-xs font-[700] text-slate-900 leading-tight">
                        {t.name}
                      </h4>
                      <span className="text-[9.5px] font-[400] text-slate-400 leading-tight">
                        {t.role}
                      </span>
                    </div>
                  </div>

                  {/* Client Logo Pill */}
                  <div className="bg-white neu-sm rounded-xl px-2.5 py-1 flex items-center justify-center border border-slate-100">
                    {t.logoSvg}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION: 4 Stats Items Bar + Solid Purple CTA Card */}
        <div className="shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-3 items-center pt-2">
          
          {/* Left 4 Stats Bar */}
          <div className="lg:col-span-8 bg-[#F6F7FB] rounded-2xl p-3 sm:p-4 neu-sm border border-white">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
              {bottomStats.map((stat, idx) => {
                const IconComp = stat.icon;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 ${
                      idx !== 0 ? "lg:pl-4" : ""
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-[800] text-slate-900 leading-none mb-0.5">
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-[500] text-slate-500 whitespace-nowrap">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Solid Purple CTA Banner */}
          <div className="lg:col-span-4 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] rounded-2xl p-3.5 neu-btn-primary flex items-center justify-between text-white border border-purple-400/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                <MessageSquareQuote className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-[700] text-white">
                  Ready to experience the ASVDF difference?
                </span>
                <span className="text-[10px] font-[400] text-purple-200">
                  Let's build something exceptional together.
                </span>
              </div>
            </div>

            <button className="hidden sm:inline-flex items-center gap-1.5 bg-white text-[#7C3AED] hover:bg-slate-100 text-[11px] font-[700] px-3.5 py-2 rounded-full shadow-md cursor-pointer transition-all hover:scale-105 shrink-0 ml-2">
              <span>Request a Quote</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}
