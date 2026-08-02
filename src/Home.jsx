import React, { useState } from 'react';
import {
  ArrowRight,
  Search,
  Menu,
  Shield,
  Users,
  ShieldCheck,
  Clock,
  Briefcase,
  Building2,
  Pause,
  Play
} from 'lucide-react';
import Navbar from './Navbar';

const DEFAULT_CONTENT = {
  brand: {
    name: "ASVDF",
    subtext: "FLOORING",
    badgeText: "PREMIUM FLOORING SOLUTIONS"
  },
  hero: {
    headingLine1: "Stronger Floors.",
    headingLine2: "Stronger ",
    headingHighlight: "Foundations.",
    subtext: "High-performance flooring solutions for industrial, commercial and infrastructure projects. Built for durability. Designed to last.",
    bgImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
    ctaPrimary: "Explore Our Services",
    ctaSecondary: "View Our Projects"
  },
  features: [
    {
      id: 1,
      icon: "shield",
      title: "Advanced Technology",
      description: "World-class machinery and modern techniques."
    },
    {
      id: 2,
      icon: "users",
      title: "Experienced Team",
      description: "Skilled professionals delivering precision and quality."
    },
    {
      id: 3,
      icon: "shield-check",
      title: "Quality Assurance",
      description: "Committed to safety, quality and timely delivery."
    },
    {
      id: 4,
      icon: "clock",
      title: "On-time Delivery",
      description: "We value time and ensure projects stay on schedule."
    }
  ],
  stats: [
    {
      id: 1,
      icon: "briefcase",
      number: "100+",
      label: "Projects Completed"
    },
    {
      id: 2,
      icon: "users",
      number: "50+",
      label: "Happy Clients"
    },
    {
      id: 3,
      icon: "clock",
      number: "10+",
      label: "Years Experience"
    },
    {
      id: 4,
      icon: "building",
      number: "8+",
      label: "Industries Served"
    }
  ]
};

export default function Home({ content = DEFAULT_CONTENT, showNavbar = true, onNavigate }) {
  const { brand, hero, features, stats } = {
    ...DEFAULT_CONTENT,
    ...content
  };

  const [activeDot, setActiveDot] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const renderIcon = (iconName, className = "w-5 h-5") => {
    switch (iconName) {
      case 'shield':
        return <Shield className={className} />;
      case 'users':
        return <Users className={className} />;
      case 'shield-check':
        return <ShieldCheck className={className} />;
      case 'clock':
        return <Clock className={className} />;
      case 'briefcase':
        return <Briefcase className={className} />;
      case 'building':
        return <Building2 className={className} />;
      default:
        return <Shield className={className} />;
    }
  };

  return (
    <div className="h-full w-full font-['Poppins'] antialiased text-slate-900 flex flex-col justify-between overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {showNavbar && <Navbar activePage="Home" onNavigate={onNavigate} />}

      {/* MAIN VIEWPORT CONTENT */}
      <div className="flex-1 flex flex-col justify-between gap-2.5 max-w-[1440px] w-full mx-auto min-h-0">
        
        {/* HERO SECTION */}
        <section className="relative flex-1 rounded-[2rem] overflow-hidden flex items-center neu-lg min-h-0 border border-white/60">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${hero.bgImage}')` }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/20" />

          <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-4 sm:py-6 max-w-2xl flex flex-col justify-center items-start">
            <div className="inline-flex items-center px-3 py-0.5 rounded-full border border-white/10 bg-slate-950/50 mb-3 neu-inset">
              <span className="text-[10px] font-[600] tracking-widest text-purple-200 uppercase">
                {brand.badgeText}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[800] tracking-[-0.04em] leading-[1.08] text-white mb-3">
              {hero.headingLine1}
              <br />
              {hero.headingLine2}
              <span className="bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#D8B4FE] bg-clip-text text-transparent">
                {hero.headingHighlight}
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-[400] leading-relaxed mb-5 max-w-lg">
              {hero.subtext}
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="inline-flex items-center justify-center gap-2 text-white text-xs font-[600] px-6 py-3 rounded-full neu-btn-primary cursor-pointer">
                <span>{hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                onClick={() => onNavigate && onNavigate("Projects")}
                className="inline-flex items-center justify-center gap-2 text-slate-900 text-xs font-[600] px-6 py-3 rounded-full neu-btn-secondary cursor-pointer"
              >
                <span>{hero.ctaSecondary}</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </button>
            </div>
          </div>

          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-2.5 bg-slate-950/40 p-2.5 rounded-full neu-inset border border-white/10">
            {[0, 1, 2, 3, 4].map((index) => {
              const isActive = activeDot === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveDot(index)}
                  aria-label={`Slide ${index + 1}`}
                  className={`transition-all duration-200 rounded-full flex items-center justify-center cursor-pointer ${
                    isActive
                      ? "w-5 h-5 bg-purple-600 border border-purple-300"
                      : "w-3 h-3 bg-white/50 hover:bg-white"
                  }`}
                >
                  {isActive && <span className="w-2 h-2 rounded-full bg-white" />}
                </button>
              );
            })}

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="mt-1 w-8 h-8 rounded-full bg-[#FFFFFF] text-slate-900 flex items-center justify-center neu-sm cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-slate-900" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-slate-900 ml-0.5" />
              )}
            </button>
          </div>
        </section>

        {/* FEATURE STRIP */}
        <section className="shrink-0 -mt-6 sm:-mt-8 relative z-30 px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-3.5">
            {features.map((item) => (
              <div
                key={item.id}
                className="bg-[#FFFFFF] rounded-2xl p-3.5 sm:p-4 neu-md neu-md-hover flex items-center gap-3.5"
              >
                <div className="w-10 h-10 rounded-full bg-[#F6F7FB] neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                  {renderIcon(item.icon, "w-4 h-4")}
                </div>

                <div className="flex flex-col">
                  <h3 className="text-xs font-[600] text-slate-900 leading-snug mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-[400] text-slate-500 leading-tight">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STATS BAR */}
        <section className="shrink-0">
          <div className="bg-[#FFFFFF] rounded-2xl px-6 py-3.5 neu-lg border border-white/80">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
              {stats.map((stat, idx) => (
                <div
                  key={stat.id}
                  className={`flex items-center gap-3.5 ${
                    idx !== 0 ? "lg:pl-6" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#F6F7FB] neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                    {renderIcon(stat.icon, "w-4 h-4")}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-lg font-[800] text-[#7C3AED] leading-none mb-0.5">
                      {stat.number}
                    </span>
                    <span className="text-[11px] font-[500] text-slate-500">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
