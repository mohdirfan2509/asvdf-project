import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  ShieldCheck,
  Target,
  Zap,
  Users,
  Settings,
  Ruler,
  Sliders,
  Cpu,
  RotateCw,
  Wind
} from 'lucide-react';
import Navbar from './Navbar';

const MACHINERY_FLEET = [
  {
    id: 1,
    title: "Ride-On Power Trowel",
    description: "High-efficiency ride-on trowels for large-scale surface finishing.",
    spec1Label: "Working Width",
    spec1Value: "1200 mm",
    spec2Label: "Power",
    spec2Value: "24 HP",
    icon: Settings,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Laser Screed",
    description: "Laser-guided screed for high precision and level floors.",
    spec1Label: "Screed Width",
    spec1Value: "2500 mm",
    spec2Label: "Power",
    spec2Value: "18 HP",
    icon: Ruler,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Walk-Behind Trowel",
    description: "Durable and reliable trowels for medium to small areas.",
    spec1Label: "Working Width",
    spec1Value: "900 mm",
    spec2Label: "Power",
    spec2Value: "9 HP",
    icon: Sliders,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Floor Grinder",
    description: "Heavy-duty grinders for surface preparation and polishing.",
    spec1Label: "Grinding Width",
    spec1Value: "650 mm",
    spec2Label: "Power",
    spec2Value: "15 HP",
    icon: RotateCw,
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Shot Blaster",
    description: "Removes surface impurities for better adhesion and finish.",
    spec1Label: "Blasting Width",
    spec1Value: "400 mm",
    spec2Label: "Power",
    spec2Value: "10 HP",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Industrial Vacuum",
    description: "Powerful dust extraction for a clean and safe work environment.",
    spec1Label: "Tank Capacity",
    spec1Value: "75 L",
    spec2Label: "Power",
    spec2Value: "3 HP",
    icon: Wind,
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=600&auto=format&fit=crop"
  }
];

export default function Machinery({ onNavigate, showNavbar = true }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFleet = MACHINERY_FLEET.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const bottomHighlights = [
    {
      title: "Well Maintained",
      description: "Regularly serviced machines for peak performance.",
      icon: ShieldCheck
    },
    {
      title: "High Precision",
      description: "Advanced technology for accurate and consistent results.",
      icon: Target
    },
    {
      title: "High Efficiency",
      description: "Faster execution with optimal productivity.",
      icon: Zap
    },
    {
      title: "Skilled Operators",
      description: "Trained professionals ensuring quality in every project.",
      icon: Users
    }
  ];

  return (
    <div className="h-full w-full font-['Poppins'] antialiased text-slate-900 flex flex-col justify-between overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {showNavbar && <Navbar activePage="Machinery" onNavigate={onNavigate} />}

      {/* MAIN FLOATING CONTAINER */}
      <main className="flex-1 flex flex-col justify-between max-w-[1440px] w-full mx-auto bg-white rounded-[2rem] p-4 sm:p-5 lg:p-6 neu-lg border border-white/80 min-h-0 overflow-hidden">
        
        {/* TOP HERO BANNER: Left Content + Right Ride-On Trowel Machinery Banner Image */}
        <div className="shrink-0 relative rounded-3xl overflow-hidden min-h-[150px] sm:min-h-[180px] flex items-center shadow-lg border border-slate-100 mb-3">
          {/* Machinery Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop')` }}
          />

          {/* Left Side Light Overlay Tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent w-full lg:w-3/5" />
          <div className="absolute inset-0 bg-slate-950/20" />

          {/* Hero Left Content */}
          <div className="relative z-10 p-5 sm:p-6 lg:p-8 max-w-xl flex flex-col items-start">
            <span className="text-[10px] font-[600] tracking-widest text-[#7C3AED] uppercase mb-1">
              OUR MACHINERY
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.04em] leading-[1.08] text-slate-900 mb-1.5">
              Powerful Machines.
              <br />
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                Precision
              </span>{" "}
              Results.
            </h1>

            <div className="w-8 h-[2.5px] bg-[#7C3AED] rounded-full mb-2" />

            <p className="text-xs text-slate-500 font-[400] leading-relaxed max-w-md">
              Our state-of-the-art machinery enables us to deliver high-performance flooring solutions with unmatched accuracy, efficiency, and reliability.
            </p>
          </div>
        </div>

        {/* MIDDLE SECTION: OUR MACHINERY FLEET (Toolbar + 6 Cards Grid) */}
        <div className="flex-1 flex flex-col justify-between min-h-0 my-0.5">
          
          {/* Toolbar: Section Title & Subtitle Left + Search Bar & Filter Right */}
          <div className="shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-[800] text-slate-900 tracking-tight">
                  Our Machinery Fleet
                </h2>
                <div className="w-8 h-[2.5px] bg-[#7C3AED] rounded-full mt-0.5" />
              </div>
              <span className="hidden lg:inline-block text-xs font-[400] text-slate-400 border-l border-slate-200 pl-4">
                Advanced equipment. Skilled operators. Superior surfaces.
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Search Machinery Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Machinery..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#F6F7FB] neu-inset rounded-full px-3.5 py-1.5 pr-8 text-xs font-[400] text-slate-800 placeholder:text-slate-400 focus:outline-none w-44 sm:w-60"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Filter Button */}
              <button className="bg-white text-slate-700 text-xs font-[600] px-3.5 py-1.5 rounded-full neu-sm flex items-center gap-1.5 cursor-pointer hover:text-[#7C3AED]">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* 6 Machinery Cards Grid (6 Columns) */}
          <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-visible">
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 h-full"
            >
              <AnimatePresence>
                {filteredFleet.map((machine, idx) => {
                  const IconComp = machine.icon;
                  return (
                    <motion.div
                      key={machine.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                      className="group bg-[#F6F7FB] rounded-2xl p-3 neu-sm neu-md-hover border border-white flex flex-col justify-between overflow-hidden cursor-pointer h-full"
                    >
                      <div>
                        {/* Top Machinery Image & Inset Icon Badge Overlay */}
                        <div className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden mb-2.5 bg-white p-2 flex items-center justify-center">
                          <img
                            src={machine.image}
                            alt={machine.title}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Circular Purple Icon Badge */}
                          <div className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-md">
                            <IconComp className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xs font-[700] text-slate-900 leading-tight group-hover:text-[#7C3AED] transition-colors mb-1">
                          {machine.title}
                        </h3>

                        {/* Short Description */}
                        <p className="text-[10px] font-[400] text-slate-500 leading-tight line-clamp-2 mb-2">
                          {machine.description}
                        </p>
                      </div>

                      {/* Technical Specs Footer */}
                      <div className="pt-2 border-t border-slate-200/60 flex flex-col gap-1 text-[9.5px]">
                        <div className="flex items-center justify-between text-slate-500">
                          <span className="font-[400]">{machine.spec1Label}</span>
                          <span className="font-[700] text-slate-800">{machine.spec1Value}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500">
                          <span className="font-[400]">{machine.spec2Label}</span>
                          <span className="font-[700] text-slate-800">{machine.spec2Value}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>

        {/* BOTTOM SECTION: 4 HIGHLIGHT FEATURE CARDS BAR */}
        <div className="shrink-0 bg-[#F6F7FB] rounded-2xl p-3.5 sm:p-4 neu-sm border border-white mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
            {bottomHighlights.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 ${
                    idx !== 0 ? "sm:pl-4" : ""
                  }`}
                >
                  {/* Sunken Icon Badge */}
                  <div className="w-10 h-10 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                    <IconComp className="w-4 h-4" />
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col">
                    <h4 className="text-xs font-[700] text-slate-900 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[10px] font-[400] text-slate-500 leading-tight mt-0.5">
                      {item.description}
                    </p>
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
