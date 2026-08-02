import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Layers,
  Wrench,
  FileText,
  TrendingUp
} from 'lucide-react';
import Navbar from './Navbar';

const BLOG_CATEGORIES = [
  { name: "All Posts", count: 24, icon: LayoutGrid },
  { name: "Industrial Flooring", count: 8, icon: Layers },
  { name: "Flooring Solutions", count: 6, icon: Wrench },
  { name: "Case Studies", count: 4, icon: FileText },
  { name: "Maintenance Tips", count: 4, icon: Wrench },
  { name: "Industry Insights", count: 2, icon: TrendingUp }
];

const POPULAR_TAGS = [
  "Epoxy Flooring",
  "Concrete Floors",
  "Polished Concrete",
  "Floor Maintenance",
  "Warehouse Flooring",
  "Sustainability"
];

const BLOG_ARTICLES = [
  {
    id: 1,
    category: "Industrial Flooring",
    date: "May 20, 2025",
    readTime: "5 min read",
    title: "Why Epoxy Flooring is Ideal for Industrial Facilities",
    excerpt: "Epoxy flooring offers unmatched durability, chemical resistance, and a seamless finish perfect for heavy-duty environments.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    category: "Flooring Solutions",
    date: "May 12, 2025",
    readTime: "6 min read",
    title: "Polished Concrete vs Epoxy Flooring: Which is Right for You?",
    excerpt: "A detailed comparison to help you choose the best flooring solution based on your needs, budget, and long-term goals.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    category: "Maintenance Tips",
    date: "May 05, 2025",
    readTime: "4 min read",
    title: "5 Essential Tips to Maintain Your Industrial Floors",
    excerpt: "Simple yet effective maintenance practices to extend the life and performance of your industrial flooring.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    category: "Case Studies",
    date: "Apr 28, 2025",
    readTime: "7 min read",
    title: "ASVDF Flooring Completes Mega Project for Leading Logistics Park",
    excerpt: "A look into our 1,00,000+ sq. ft. flooring project delivered with precision and on time.",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    category: "Industry Insights",
    date: "Apr 20, 2025",
    readTime: "5 min read",
    title: "Sustainable Flooring: Building a Better Tomorrow",
    excerpt: "How eco-friendly flooring solutions contribute to LEED certification and a greener planet.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    category: "Flooring Solutions",
    date: "Apr 15, 2025",
    readTime: "4 min read",
    title: "Safety First: Flooring Solutions That Protect",
    excerpt: "Explore flooring systems designed to improve safety, reduce slips, and withstand heavy impact.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Blogs({ onNavigate, showNavbar = true }) {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  const filteredArticles = BLOG_ARTICLES.filter(article => {
    const matchesCategory = selectedCategory === "All Posts" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full w-full font-['Poppins'] antialiased text-slate-900 flex flex-col justify-between overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {showNavbar && <Navbar activePage="Blogs" onNavigate={onNavigate} />}

      {/* MAIN FLOATING CONTAINER */}
      <main className="flex-1 flex flex-col justify-between max-w-[1440px] w-full mx-auto bg-white rounded-[2rem] p-4 sm:p-5 lg:p-6 neu-lg border border-white/80 min-h-0 overflow-hidden">
        
        {/* TOP HERO SECTION: Left Headline + Right Industrial Image Banner */}
        <div className="shrink-0 relative rounded-3xl overflow-hidden min-h-[140px] sm:min-h-[160px] flex items-center shadow-lg border border-slate-100 mb-3">
          {/* Industrial Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop')` }}
          />

          {/* Left Side Light Overlay Tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent w-full lg:w-3/5" />
          <div className="absolute inset-0 bg-slate-950/20" />

          {/* Hero Left Content */}
          <div className="relative z-10 p-5 sm:p-6 lg:p-8 max-w-xl flex flex-col items-start">
            <span className="text-[10px] font-[600] tracking-widest text-[#7C3AED] uppercase mb-1">
              OUR BLOG
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.04em] leading-[1.08] text-slate-900 mb-1.5">
              Insights. Innovations.
              <br />
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                Inspiration.
              </span>
            </h1>

            <div className="w-8 h-[2.5px] bg-[#7C3AED] rounded-full mb-2" />

            <p className="text-xs text-slate-500 font-[400] leading-relaxed max-w-md">
              Expert insights, industry trends, and practical tips on industrial flooring and infrastructure.
            </p>
          </div>
        </div>

        {/* MIDDLE CONTENT: Left Sidebar (Categories & Tags) + Right Articles Grid (3 Cols x 2 Rows) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0 overflow-hidden my-0.5">
          
          {/* Left Sidebar (Categories list + Popular Tags) */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-3 overflow-y-auto pr-1">
            
            {/* Categories Card */}
            <div className="bg-[#F6F7FB] rounded-2xl p-3.5 neu-sm border border-white flex flex-col gap-2">
              <h3 className="text-xs font-[800] text-slate-900 mb-1">
                Categories
              </h3>
              <div className="flex flex-col gap-1.5">
                {BLOG_CATEGORIES.map((cat, idx) => {
                  const IconComp = cat.icon;
                  const isActive = selectedCategory === cat.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-[600] transition-all cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white shadow-md shadow-purple-900/20"
                          : "bg-white text-slate-700 neu-sm hover:text-[#7C3AED]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <IconComp className="w-3.5 h-3.5" />
                        <span>{cat.name}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"}`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Popular Tags Card */}
            <div className="bg-[#F6F7FB] rounded-2xl p-3.5 neu-sm border border-white">
              <h3 className="text-xs font-[800] text-slate-900 mb-2">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_TAGS.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-white text-slate-600 text-[10px] font-[500] px-2.5 py-1 rounded-lg neu-sm hover:text-[#7C3AED] cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Main Articles Area */}
          <div className="lg:col-span-9 flex flex-col justify-between min-h-0">
            
            {/* Top Toolbar (Article Count + Search Bar + Filter Button) */}
            <div className="shrink-0 flex items-center justify-between gap-3 mb-2.5">
              <span className="text-xs font-[500] text-slate-500">
                Showing 1–6 of 24 articles
              </span>

              <div className="flex items-center gap-2">
                {/* Search Bar Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#F6F7FB] neu-inset rounded-full px-3.5 py-1.5 pr-8 text-xs font-[400] text-slate-800 placeholder:text-slate-400 focus:outline-none w-48 sm:w-64"
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

            {/* 6 Articles Grid (3 Columns x 2 Rows) */}
            <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-visible">
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 h-full"
              >
                <AnimatePresence>
                  {filteredArticles.map((article, idx) => (
                    <motion.div
                      key={article.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                      className="group bg-[#F6F7FB] rounded-2xl p-2.5 neu-sm neu-md-hover border border-white flex flex-col justify-between overflow-hidden cursor-pointer h-full"
                    >
                      {/* Top Thumbnail Image with Category Overlay */}
                      <div className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden mb-2 bg-slate-200">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Category Label Pill */}
                        <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-md bg-white/95 backdrop-blur-sm shadow-sm border border-slate-100">
                          <span className="text-[9.5px] font-[600] text-[#7C3AED]">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          {/* Date & Read Time */}
                          <div className="flex items-center justify-between text-[9.5px] text-slate-400 font-[400] mb-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              {article.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {article.readTime}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xs font-[700] text-slate-900 leading-snug group-hover:text-[#7C3AED] transition-colors mb-1 line-clamp-2">
                            {article.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-[10px] font-[400] text-slate-500 leading-relaxed line-clamp-2 mb-2">
                            {article.excerpt}
                          </p>
                        </div>

                        {/* Read More Link */}
                        <div className="flex items-center gap-1 text-[10.5px] font-[600] text-[#7C3AED] group-hover:translate-x-1 transition-transform">
                          <span>Read More</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

          </div>

        </div>

        {/* BOTTOM PAGINATION BAR */}
        <div className="shrink-0 flex items-center justify-center pt-2">
          <div className="inline-flex items-center gap-1.5 bg-[#FFFFFF] neu-sm p-1.5 rounded-2xl">
            <button
              onClick={() => setActivePage(Math.max(1, activePage - 1))}
              className="w-7 h-7 rounded-xl text-xs font-[600] text-slate-600 hover:text-[#7C3AED] flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`w-7 h-7 rounded-xl text-xs font-[600] transition-all cursor-pointer ${
                  activePage === page
                    ? "bg-[#7C3AED] text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setActivePage(Math.min(4, activePage + 1))}
              className="w-7 h-7 rounded-xl text-xs font-[600] text-slate-600 hover:text-[#7C3AED] flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
