import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  Wrench,
  Package,
  HardHat,
  Cog,
  FolderKanban,
  Headphones,
  ArrowRight,
  FileText,
  Phone,
  Mail,
  Clock
} from 'lucide-react';
import Navbar from './Navbar';

const FAQ_CATEGORIES = [
  { name: "All Questions", count: 18, icon: LayoutGrid },
  { name: "Services", count: 5, icon: Wrench },
  { name: "Materials", count: 4, icon: Package },
  { name: "Installation", count: 4, icon: HardHat },
  { name: "Maintenance", count: 3, icon: Cog },
  { name: "Projects", count: 2, icon: FolderKanban }
];

const FAQS_DATA = [
  {
    id: 1,
    category: "Services",
    question: "What types of flooring solutions do you offer?",
    answer: "We offer a wide range of industrial flooring solutions including epoxy flooring, polished concrete, PU flooring, anti-static flooring, and more—tailored to meet your specific requirements."
  },
  {
    id: 2,
    category: "Services",
    question: "What industries do you serve?",
    answer: "We serve diverse industries including automotive, warehousing & logistics, pharmaceuticals, manufacturing, retail complexes, and commercial infrastructure across India."
  },
  {
    id: 3,
    category: "Installation",
    question: "How long does the installation process take?",
    answer: "Project timelines depend on the facility area and flooring type. Typically, standard industrial epoxy or concrete projects range from 3 to 7 days with quick curing options available."
  },
  {
    id: 4,
    category: "Materials",
    question: "What is the lifespan of your flooring systems?",
    answer: "Our heavy-duty industrial flooring systems are engineered for longevity, lasting 10 to 20+ years with basic routine maintenance."
  },
  {
    id: 5,
    category: "Maintenance",
    question: "Do you provide maintenance services?",
    answer: "Yes, we offer comprehensive post-installation care, surface inspection, periodic polishing, and maintenance packages to keep your floors in peak condition."
  },
  {
    id: 6,
    category: "Materials",
    question: "Are your flooring solutions environmentally friendly?",
    answer: "Yes, we prioritize low-VOC materials, sustainable concrete polishing processes, and eco-compliant systems that contribute toward LEED certification."
  }
];

export default function Faqs({ onNavigate, showNavbar = true }) {
  const [selectedCategory, setSelectedCategory] = useState("All Questions");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState(1); // First FAQ open by default as in design

  const filteredFaqs = FAQS_DATA.filter(faq => {
    const matchesCategory = selectedCategory === "All Questions" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="h-full w-full font-['Poppins'] antialiased text-slate-900 flex flex-col justify-between overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {showNavbar && <Navbar activePage="FAQs" onNavigate={onNavigate} />}

      {/* MAIN FLOATING CONTAINER */}
      <main className="flex-1 flex flex-col justify-between max-w-[1440px] w-full mx-auto bg-white rounded-[2rem] p-4 sm:p-5 lg:p-6 neu-lg border border-white/80 min-h-0 overflow-hidden">
        
        {/* TOP HERO SECTION: Left Title + Right 3D FAQ Industrial Hero Image */}
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
              FAQS
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.04em] leading-[1.08] text-slate-900 mb-1.5">
              Find Answers.
              <br />
              Make{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                Informed
              </span>{" "}
              Decisions.
            </h1>

            <div className="w-8 h-[2.5px] bg-[#7C3AED] rounded-full mb-2" />

            <p className="text-xs text-slate-500 font-[400] leading-relaxed max-w-md">
              Everything you need to know about our flooring solutions, services, and processes.
            </p>
          </div>

          {/* Right 3D "FAQ" Purple Letters Overlay */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center">
            <span className="text-6xl lg:text-7xl font-[900] tracking-wider text-purple-600/90 drop-shadow-xl select-none">
              FAQ
            </span>
          </div>
        </div>

        {/* MIDDLE SECTION: Left Sidebar (Categories + Still have questions card) + Right Accordion */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0 overflow-hidden my-0.5">
          
          {/* Left Sidebar (Categories + Contact Box) */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-3 overflow-y-auto pr-1">
            
            {/* Categories Card */}
            <div className="bg-[#F6F7FB] rounded-2xl p-3.5 neu-sm border border-white flex flex-col gap-2">
              <h3 className="text-xs font-[800] text-slate-900 mb-1">
                Categories
              </h3>
              <div className="flex flex-col gap-1.5">
                {FAQ_CATEGORIES.map((cat, idx) => {
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

            {/* "Still have questions?" Card */}
            <div className="bg-[#F6F7FB] rounded-2xl p-3.5 neu-sm border border-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-xs font-[700] text-slate-900 leading-tight">
                  Still have questions?
                </h4>
                <span className="text-[10px] font-[400] text-slate-500 leading-tight mb-1">
                  Our team is here to help you.
                </span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate("Contact Us");
                  }}
                  className="text-[10.5px] font-[600] text-[#7C3AED] inline-flex items-center gap-1 hover:underline"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Accordion Main Area */}
          <div className="lg:col-span-9 flex flex-col justify-between min-h-0">
            
            {/* Top Toolbar (Section Header Left + Search Input Right) */}
            <div className="shrink-0 flex items-center justify-between gap-3 mb-2.5">
              <h2 className="text-sm sm:text-base font-[800] text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>

              {/* Search Questions Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#F6F7FB] neu-inset rounded-full px-3.5 py-1.5 pr-8 text-xs font-[400] text-slate-800 placeholder:text-slate-400 focus:outline-none w-52 sm:w-72"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Accordion Questions List */}
            <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    layout
                    transition={{ duration: 0.2 }}
                    className={`rounded-2xl border transition-all cursor-pointer ${
                      isOpen
                        ? "bg-[#F3F0FF] border-purple-200 p-4 shadow-sm"
                        : "bg-[#F6F7FB] border-white p-3.5 neu-sm hover:border-slate-200"
                    }`}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    {/* Header Row: Plus/Minus Badge + Question Text + Chevron */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Plus / Minus Circular Pill */}
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isOpen ? "bg-[#7C3AED] text-white" : "bg-purple-100 text-[#7C3AED]"
                        }`}>
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>

                        {/* Question Title */}
                        <h3 className={`text-xs sm:text-sm font-[700] leading-tight ${
                          isOpen ? "text-[#7C3AED]" : "text-slate-900"
                        }`}>
                          {faq.question}
                        </h3>
                      </div>

                      {/* Chevron Right Indicator */}
                      <div className="text-slate-400 shrink-0">
                        {isOpen ? <ChevronUp className="w-4 h-4 text-[#7C3AED]" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>

                    {/* Expandable Answer Paragraph */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pt-2 pl-10"
                        >
                          <p className="text-xs font-[400] text-slate-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: "Can't find what you're looking for?" BAR */}
        <div className="shrink-0 bg-[#F6F7FB] rounded-2xl p-3.5 sm:p-4 neu-sm border border-white mt-2">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Left Title & Text */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center shrink-0 shadow-md">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-xs sm:text-sm font-[800] text-slate-900 leading-tight">
                  Can't find what you're looking for?
                </h4>
                <span className="text-[11px] font-[400] text-slate-500 leading-tight">
                  Contact our experts for personalized assistance.
                </span>
              </div>
            </div>

            {/* Center Phone, Email, Hours Info Pills */}
            <div className="flex items-center gap-6 divide-x divide-slate-200/60 text-xs font-[600] text-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+91 98765 43210</span>
              </div>

              <div className="pl-6 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED]">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>info@asvdflooring.com</span>
              </div>

              <div className="pl-6 hidden sm:flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white neu-inset flex items-center justify-center text-[#7C3AED]">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-600 font-[400]">Mon - Sat : 9:00 AM – 6:00 PM</span>
              </div>
            </div>

            {/* Right Contact Us Button */}
            <button
              onClick={() => onNavigate && onNavigate("Contact Us")}
              className="inline-flex items-center justify-center gap-2 text-white text-xs font-[600] px-5 py-2.5 rounded-xl neu-btn-primary cursor-pointer shrink-0"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>
        </div>

      </main>
    </div>
  );
}
