import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Building2,
  Filter,
  ArrowRight
} from 'lucide-react';
import Navbar from './Navbar';

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Manufacturing Plant Flooring",
    category: "Industrial",
    location: "Hyderabad, Telangana",
    area: "45,000 sq.ft",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Commercial Complex Flooring",
    category: "Commercial",
    location: "Bengaluru, Karnataka",
    area: "32,500 sq.ft",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Logistics Warehouse Flooring",
    category: "Infrastructure",
    location: "Chennai, Tamil Nadu",
    area: "60,000 sq.ft",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Automobile Unit Flooring",
    category: "Industrial",
    location: "Pune, Maharashtra",
    area: "28,000 sq.ft",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Retail Showroom Flooring",
    category: "Retail",
    location: "Mumbai, Maharashtra",
    area: "12,000 sq.ft",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Cold Storage Flooring",
    category: "Infrastructure",
    location: "Vijayawada, Andhra Pradesh",
    area: "18,500 sq.ft",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Parking Area Flooring",
    category: "Commercial",
    location: "Hyderabad, Telangana",
    area: "22,000 sq.ft",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Food Processing Unit Flooring",
    category: "Industrial",
    location: "Coimbatore, Tamil Nadu",
    area: "16,000 sq.ft",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop"
  }
];

const CATEGORIES = ["All Projects", "Industrial", "Commercial", "Infrastructure", "Retail", "Logistics"];

export default function Projects({ onNavigate, showNavbar = true }) {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = selectedCategory === "All Projects"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="h-full w-full font-['Poppins'] antialiased text-slate-900 flex flex-col justify-between overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {showNavbar && <Navbar activePage="Projects" onNavigate={onNavigate} />}

      {/* MAIN FLOATING CONTAINER */}
      <main className="flex-1 flex flex-col justify-between max-w-[1440px] w-full mx-auto bg-white rounded-[2rem] p-4 sm:p-6 lg:p-7 neu-lg border border-white/80 min-h-0 overflow-hidden">
        
        {/* HEADER SECTION */}
        <div className="shrink-0 flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-3">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-start max-w-xl"
          >
            <span className="text-[10px] font-[600] tracking-widest text-[#7C3AED] uppercase mb-1.5">
              OUR PROJECTS
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.04em] leading-[1.08] text-slate-900">
              Built with Precision.
              <br />
              Delivered with{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                Pride.
              </span>
            </h1>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8 flex-1 justify-end">
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed font-[400]"
            >
              Explore our diverse range of successful flooring projects across industries. Each project reflects our commitment to quality, innovation, and long-lasting performance.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center gap-3 shrink-0"
            >
              <div className="bg-[#F6F7FB] rounded-2xl p-3 sm:px-4 sm:py-3 neu-sm flex items-center gap-3 border border-white">
                <div className="w-10 h-10 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-[800] text-slate-900 leading-none mb-0.5">
                    100+
                  </span>
                  <span className="text-[10px] font-[500] text-slate-500 whitespace-nowrap">
                    Projects Completed
                  </span>
                </div>
              </div>

              <div className="bg-[#F6F7FB] rounded-2xl p-3 sm:px-4 sm:py-3 neu-sm flex items-center gap-3 border border-white">
                <div className="w-10 h-10 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-[800] text-slate-900 leading-none mb-0.5">
                    8+
                  </span>
                  <span className="text-[10px] font-[500] text-slate-500 whitespace-nowrap">
                    Industries Served
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FILTER BAR SECTION */}
        <div className="shrink-0 flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat, idx) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-[600] whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white shadow-md shadow-purple-900/20"
                      : "bg-[#FFFFFF] text-slate-600 neu-sm hover:-translate-y-0.5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <button className="hidden sm:inline-flex items-center gap-2 bg-[#FFFFFF] text-slate-700 text-xs font-[600] px-4 py-2 rounded-full neu-sm hover:-translate-y-0.5 transition-all cursor-pointer shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
        </div>

        {/* 8-PROJECT GRID SECTION */}
        <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-visible">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 h-full"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group bg-[#FFFFFF] rounded-2xl p-2.5 neu-md neu-md-hover border border-slate-100 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  <div className="relative w-full h-28 sm:h-32 lg:h-36 rounded-xl overflow-hidden mb-2.5 bg-slate-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-sm shadow-sm border border-slate-100">
                      <span className="text-[10px] font-[600] text-slate-800">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-2 px-1 pb-1">
                    <div className="flex flex-col">
                      <h3 className="text-xs sm:text-sm font-[600] text-slate-900 leading-snug group-hover:text-[#7C3AED] transition-colors mb-0.5">
                        {project.title}
                      </h3>
                      <span className="text-[11px] font-[400] text-slate-400">
                        {project.location}
                      </span>
                      <span className="text-[11px] font-[600] text-[#7C3AED] mt-0.5">
                        {project.area}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#FFFFFF] neu-sm flex items-center justify-center text-slate-700 group-hover:text-[#7C3AED] group-hover:translate-x-0.5 transition-all shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* PAGINATION SECTION */}
        <div className="shrink-0 flex items-center justify-center pt-3">
          <div className="inline-flex items-center gap-1.5 bg-[#FFFFFF] neu-sm p-1.5 rounded-2xl">
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 rounded-xl text-xs font-[600] transition-all cursor-pointer ${
                currentPage === 1
                  ? "bg-[#7C3AED] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              1
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className={`w-8 h-8 rounded-xl text-xs font-[600] transition-all cursor-pointer ${
                currentPage === 2
                  ? "bg-[#7C3AED] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              2
            </button>
            <button
              onClick={() => setCurrentPage(3)}
              className={`w-8 h-8 rounded-xl text-xs font-[600] transition-all cursor-pointer ${
                currentPage === 3
                  ? "bg-[#7C3AED] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              3
            </button>
            <span className="w-6 text-center text-xs font-[600] text-slate-400">
              ...
            </span>
            <button
              onClick={() => setCurrentPage(10)}
              className={`w-8 h-8 rounded-xl text-xs font-[600] transition-all cursor-pointer ${
                currentPage === 10
                  ? "bg-[#7C3AED] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              10
            </button>
            <button
              aria-label="Next page"
              className="w-8 h-8 rounded-xl text-xs font-[600] text-slate-600 hover:text-[#7C3AED] flex items-center justify-center transition-all cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
