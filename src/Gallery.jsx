import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image,
  FolderKanban,
  Building2,
  Award,
  Filter,
  Maximize2,
  ArrowRight,
  X
} from 'lucide-react';
import Navbar from './Navbar';

const GALLERY_IMAGES = [
  {
    id: 1,
    title: "Industrial Warehouse Polished Floor",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Commercial Complex Atrium Flooring",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Logistics Facility Heavy Duty Floor",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Luxury Mall Retail Floor",
    category: "Retail",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Underground Commercial Parking Area",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Cold Storage Warehouse Concrete",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Automobile Manufacturing Facility",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Port Logistics Container Yard",
    category: "Logistics",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 9,
    title: "Corporate Office Entrance Hall",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 10,
    title: "Premium Showroom Epoxy Floor",
    category: "Retail",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 11,
    title: "Heavy Equipment Assembly Plant",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 12,
    title: "Multi-Level Basement Parking",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800&auto=format&fit=crop"
  }
];

const CATEGORIES = ["All Projects", "Industrial", "Commercial", "Infrastructure", "Retail", "Logistics"];

export default function Gallery({ onNavigate, showNavbar = true }) {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [activePage, setActivePage] = useState(1);
  const [lightboxImage, setLightboxImage] = useState(null);

  const filteredImages = selectedCategory === "All Projects"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category.toLowerCase() === selectedCategory.toLowerCase());

  const stats = [
    { value: "250+", label: "Images", icon: Image },
    { value: "50+", label: "Projects", icon: FolderKanban },
    { value: "8+", label: "Industries", icon: Building2 },
    { value: "100%", label: "Quality", icon: Award }
  ];

  return (
    <div className="h-full w-full font-['Poppins'] antialiased text-slate-900 flex flex-col justify-between overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {showNavbar && <Navbar activePage="Gallery" onNavigate={onNavigate} />}

      {/* MAIN FLOATING CONTAINER */}
      <main className="flex-1 flex flex-col justify-between max-w-[1440px] w-full mx-auto bg-white rounded-[2rem] p-4 sm:p-5 lg:p-6 neu-lg border border-white/80 min-h-0 overflow-hidden">
        
        {/* HEADER SECTION (Left Title & Subtext + Right 4 Stat Cards) */}
        <div className="shrink-0 flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2.5">
          
          {/* Left Column: Category Label + Big Heading + Subtext */}
          <div className="flex flex-col items-start max-w-xl">
            {/* Small purple section label */}
            <span className="text-[10px] font-[600] tracking-widest text-[#7C3AED] uppercase mb-1">
              OUR GALLERY
            </span>

            {/* Large Bold Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.04em] leading-[1.08] text-slate-900 mb-1">
              Flooring Excellence
              <br />
              In Every{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                Detail.
              </span>
            </h1>

            {/* Purple Accent Bar */}
            <div className="w-8 h-[2.5px] bg-[#7C3AED] rounded-full mb-2" />

            {/* Subtext */}
            <p className="text-xs sm:text-sm text-slate-500 font-[400] leading-relaxed">
              Explore our completed projects and see how we transform spaces with precision, quality, and lasting performance.
            </p>
          </div>

          {/* Right Column: 4 Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F6F7FB] rounded-2xl p-3 sm:px-4 sm:py-3 neu-sm flex flex-col items-center justify-center text-center border border-white min-w-[110px]"
                >
                  <div className="w-9 h-9 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED] mb-1.5 shrink-0">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-base sm:text-lg font-[800] text-slate-900 leading-none mb-0.5">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-[500] text-slate-500 whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* FILTER CHIPS & FILTER BUTTON BAR */}
        <div className="shrink-0 flex items-center justify-between gap-3 mb-2.5">
          {/* Category Chips */}
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
                      : "bg-[#F6F7FB] text-slate-600 neu-sm hover:-translate-y-0.5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Filter Action Button */}
          <button className="hidden sm:inline-flex items-center gap-2 bg-[#FFFFFF] text-slate-700 text-xs font-[600] px-4 py-2 rounded-full neu-sm hover:-translate-y-0.5 transition-all cursor-pointer shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
        </div>

        {/* 12-IMAGE GALLERY GRID (4 Columns x 3 Rows, exactly as in gallery-page.png) */}
        <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-visible">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-3.5 h-full"
          >
            <AnimatePresence>
              {filteredImages.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className="group relative bg-slate-100 rounded-2xl overflow-hidden neu-sm border border-slate-100 cursor-pointer h-24 sm:h-28 lg:h-32"
                  onClick={() => setLightboxImage(item)}
                >
                  {/* Gallery Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Dark Hover Tint Overlay */}
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" />

                  {/* Circular Expand Icon Button (Bottom Right) */}
                  <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center text-slate-700 group-hover:text-[#7C3AED] group-hover:scale-110 transition-all">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* PAGINATION BAR SECTION */}
        <div className="shrink-0 flex items-center justify-center pt-2">
          <div className="inline-flex items-center gap-1.5 bg-[#FFFFFF] neu-sm p-1.5 rounded-2xl">
            {/* Page 1 (Active Purple Pill) */}
            <button
              onClick={() => setActivePage(1)}
              className={`w-7 h-7 rounded-xl text-xs font-[600] transition-all cursor-pointer ${
                activePage === 1
                  ? "bg-[#7C3AED] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              1
            </button>

            {/* Page 2 */}
            <button
              onClick={() => setActivePage(2)}
              className={`w-7 h-7 rounded-xl text-xs font-[600] transition-all cursor-pointer ${
                activePage === 2
                  ? "bg-[#7C3AED] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              2
            </button>

            {/* Page 3 */}
            <button
              onClick={() => setActivePage(3)}
              className={`w-7 h-7 rounded-xl text-xs font-[600] transition-all cursor-pointer ${
                activePage === 3
                  ? "bg-[#7C3AED] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              3
            </button>

            {/* Ellipsis */}
            <span className="w-5 text-center text-xs font-[600] text-slate-400">
              ...
            </span>

            {/* Page 10 */}
            <button
              onClick={() => setActivePage(10)}
              className={`w-7 h-7 rounded-xl text-xs font-[600] transition-all cursor-pointer ${
                activePage === 10
                  ? "bg-[#7C3AED] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              10
            </button>

            {/* Next Arrow */}
            <button
              aria-label="Next page"
              className="w-7 h-7 rounded-xl text-xs font-[600] text-slate-600 hover:text-[#7C3AED] flex items-center justify-center transition-all cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </main>

      {/* Fullscreen Image Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="relative bg-white rounded-3xl p-4 max-w-4xl w-full neu-lg flex flex-col items-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F6F7FB] neu-sm flex items-center justify-center text-slate-700 hover:text-[#7C3AED] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImage.image}
              alt={lightboxImage.title}
              className="w-full max-h-[70vh] object-cover rounded-2xl mb-3"
            />
            <h3 className="text-base font-[700] text-slate-900">
              {lightboxImage.title}
            </h3>
            <span className="text-xs font-[600] text-[#7C3AED]">
              {lightboxImage.category}
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
