import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Users,
  Building2,
  ShieldCheck,
  Layers,
  Sun,
  Ruler,
  Shield,
  Droplet,
  Feather,
  Scissors,
  Wrench,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Navbar from './Navbar';

const SERVICES_DATA = [
  {
    id: 1,
    title: "VDF Flooring",
    category: "Industrial Flooring",
    description: "High-strength industrial flooring with superior durability and long-lasting performance.",
    icon: "layers",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "FM2 Laser Concrete Flooring",
    category: "Concrete Solutions",
    description: "Precision laser-levelled flooring for flatness, strength, and seamless finish.",
    icon: "sun",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Laser Screed Flooring",
    category: "Concrete Solutions",
    description: "Advanced laser screed technology for level and smooth concrete floors.",
    icon: "ruler",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Concrete Densification Flooring",
    category: "Concrete Solutions",
    description: "Densification improves surface hardness, dust resistance, and overall durability.",
    icon: "shield",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Epoxy Flooring",
    category: "Industrial Flooring",
    description: "Seamless, chemical-resistant epoxy floors for industrial and commercial spaces.",
    icon: "droplet",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Floor Hardener Application",
    category: "Concrete Solutions",
    description: "Enhances surface strength and wear resistance for heavy traffic areas.",
    icon: "feather",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Groove Cutting & Joint Filling",
    category: "Concrete Solutions",
    description: "Precision cutting and joint filling to control cracks and improve floor life.",
    icon: "scissors",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Concrete Repair & Restoration",
    category: "Concrete Solutions",
    description: "Restoring damaged concrete surfaces for safety, strength, and longevity.",
    icon: "wrench",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 9,
    title: "Floor Grinding & Polishing",
    category: "Industrial Flooring",
    description: "Achieves smooth, polished surfaces with enhanced aesthetics and durability.",
    icon: "sparkles",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&auto=format&fit=crop"
  }
];

const SERVICE_CATEGORIES = ["All Services", "Industrial Flooring", "Concrete Solutions"];

export default function Services({ onNavigate, showNavbar = true }) {
  const [selectedCategory, setSelectedCategory] = useState("All Services");

  const filteredServices = selectedCategory === "All Services"
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === selectedCategory);

  const renderServiceIcon = (iconName) => {
    const cls = "w-4 h-4";
    switch (iconName) {
      case 'layers': return <Layers className={cls} />;
      case 'sun': return <Sun className={cls} />;
      case 'ruler': return <Ruler className={cls} />;
      case 'shield': return <Shield className={cls} />;
      case 'droplet': return <Droplet className={cls} />;
      case 'feather': return <Feather className={cls} />;
      case 'scissors': return <Scissors className={cls} />;
      case 'wrench': return <Wrench className={cls} />;
      case 'sparkles': return <Sparkles className={cls} />;
      default: return <Layers className={cls} />;
    }
  };

  const topStats = [
    { value: "120+", label: "Projects Completed", icon: Award },
    { value: "100+", label: "Happy Clients", icon: Users },
    { value: "8+", label: "Industries Served", icon: Building2 },
    { value: "98%", label: "Client Satisfaction", icon: ShieldCheck }
  ];

  return (
    <div className="h-full w-full font-['Poppins'] antialiased text-slate-900 flex flex-col justify-between overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {showNavbar && <Navbar activePage="Services" onNavigate={onNavigate} />}

      {/* MAIN FLOATING CONTAINER */}
      <main className="flex-1 flex flex-col justify-between max-w-[1440px] w-full mx-auto bg-white rounded-[2rem] p-4 sm:p-5 lg:p-6 neu-lg border border-white/80 min-h-0 overflow-hidden">
        
        {/* HEADER SECTION (Top Heading + Subtext + 4 Top Stat Pills) */}
        <div className="shrink-0 flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2.5">
          
          {/* Left Column: Category Label + Big Heading + Subtext */}
          <div className="flex flex-col items-start max-w-xl">
            {/* Small purple section label */}
            <span className="text-[10px] font-[600] tracking-widest text-[#7C3AED] uppercase mb-1">
              OUR SERVICES
            </span>

            {/* Large Bold Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.04em] leading-[1.08] text-slate-900 mb-1.5">
              High-Performance Flooring.
              <br />
              Built for{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                Every Need.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xs sm:text-sm text-slate-500 font-[400] leading-relaxed">
              We deliver advanced flooring solutions tailored for industrial, commercial, and infrastructure spaces. Quality, durability, and precision in every layer.
            </p>
          </div>

          {/* Right Column: 4 Stat Cards in a Single Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
            {topStats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F6F7FB] rounded-2xl p-2.5 neu-sm flex items-center gap-2.5 border border-white min-w-[130px]"
                >
                  <div className="w-9 h-9 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-base font-[800] text-slate-900 mb-0.5">
                      {stat.value}
                    </span>
                    <span className="text-[9px] font-[500] text-slate-500 whitespace-nowrap">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MIDDLE BAR: Section Header ("Our Flooring Services") + Filter Chips Right */}
        <div className="shrink-0 flex items-center justify-between gap-3 mb-2.5">
          {/* Left Title with Accent Bar */}
          <div className="flex flex-col">
            <h2 className="text-base sm:text-lg font-[800] text-slate-900 tracking-tight">
              Our Flooring Services
            </h2>
            <div className="w-8 h-[2.5px] bg-[#7C3AED] rounded-full mt-0.5" />
          </div>

          {/* Right Filter Chips */}
          <div className="flex items-center gap-2">
            {SERVICE_CATEGORIES.map((cat, idx) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-[600] whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white shadow-md shadow-purple-900/20"
                      : "bg-[#F6F7FB] text-slate-600 neu-sm hover:-translate-y-0.5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 9-SERVICES GRID SECTION (3 Columns x 3 Rows, exactly as in Services-page.png) */}
        <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-visible">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 h-full"
          >
            <AnimatePresence>
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="group bg-[#F6F7FB] rounded-2xl p-2.5 neu-sm neu-md-hover border border-white flex items-center gap-3 overflow-hidden cursor-pointer"
                >
                  {/* Left Side Thumbnail Image */}
                  <div className="w-24 sm:w-28 lg:w-32 h-full min-h-[90px] rounded-xl overflow-hidden shrink-0 bg-slate-200">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Right Side Content & Icon */}
                  <div className="flex-1 flex flex-col justify-between h-full py-0.5 pr-1">
                    <div>
                      {/* Title + Circular Inset Icon */}
                      <div className="flex items-start justify-between gap-1.5 mb-1">
                        <h3 className="text-xs font-[700] text-slate-900 leading-snug group-hover:text-[#7C3AED] transition-colors">
                          {service.title}
                        </h3>
                        <div className="w-7 h-7 rounded-lg bg-white neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                          {renderServiceIcon(service.icon)}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[10px] font-[400] text-slate-500 leading-tight line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    {/* Circular Neumorphic Arrow Icon Button Bottom Right */}
                    <div className="self-end mt-1">
                      <div className="w-6 h-6 rounded-full bg-white neu-sm flex items-center justify-center text-slate-700 group-hover:text-[#7C3AED] group-hover:translate-x-0.5 transition-all">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </main>
    </div>
  );
}
