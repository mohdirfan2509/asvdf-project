import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Home from './Home';
import Projects from './Projects';
import Clients from './Clients';
import Services from './Services';
import AboutUs01A from './AboutUs01A';
import AboutUs02 from './AboutUs02';
import AboutUs03 from './AboutUs03';
import ContactUs01 from './ContactUs01';
import ContactUs02 from './ContactUs02';
import Testimonials from './Testimonials';
import Blogs from './Blogs';
import Machinery from './Machinery';
import Gallery from './Gallery';
import Faqs from './Faqs';
import FooterCTA from './FooterCTA';

// Navigation order: Home -> Projects -> Clients -> Services -> About Us -> Milestones -> Core Values -> Contact Us -> Contact Form -> Testimonials -> Blogs -> Machinery -> Gallery -> FAQs -> Footer CTA
const PAGES = ["Home", "Projects", "Clients", "Services", "About Us", "Milestones", "Core Values", "Contact Us", "Contact Form", "Testimonials", "Blogs", "Machinery", "Gallery", "FAQs", "Footer"];

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNavigate = (pageLabel) => {
    if (pageLabel === activeTab || isAnimating) return;
    const currentIndex = PAGES.indexOf(activeTab);
    const targetIndex = PAGES.indexOf(pageLabel);

    if (targetIndex !== -1) {
      setDirection(targetIndex > currentIndex ? 1 : -1);
      setIsAnimating(true);
      setActiveTab(pageLabel);
    }
  };

  useEffect(() => {
    let lastWheelTime = 0;
    const handleWheel = (e) => {
      const now = Date.now();
      if (now - lastWheelTime < 800 || isAnimating) return;

      if (e.deltaY > 40) {
        const currentIndex = PAGES.indexOf(activeTab);
        if (currentIndex < PAGES.length - 1) {
          lastWheelTime = now;
          handleNavigate(PAGES[currentIndex + 1]);
        }
      } else if (e.deltaY < -40) {
        const currentIndex = PAGES.indexOf(activeTab);
        if (currentIndex > 0) {
          lastWheelTime = now;
          handleNavigate(PAGES[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeTab, isAnimating]);

  const contentVariants = {
    initial: (dir) => ({
      opacity: 0,
      y: dir > 0 ? 40 : -40,
      scale: 0.98,
    }),
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        y: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (dir) => ({
      opacity: 0,
      y: dir > 0 ? -30 : 30,
      scale: 0.98,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  return (
    <div className="h-screen w-screen bg-[#F5F7FB] font-['Poppins'] antialiased text-slate-900 flex flex-col justify-between p-3 sm:p-4 overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {/* 1. PERMANENT STATIONARY NAVBAR */}
      <Navbar activePage={activeTab} onNavigate={handleNavigate} />

      {/* 2. DYNAMIC PAGE CONTENT AREA */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto relative min-h-0">
        <AnimatePresence 
          initial={false} 
          custom={direction} 
          mode="wait"
          onExitComplete={() => setIsAnimating(false)}
        >
          <motion.div
            key={activeTab}
            custom={direction}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full w-full absolute inset-0"
          >
            {activeTab === "Home" && <Home showNavbar={false} onNavigate={handleNavigate} />}
            {activeTab === "Projects" && <Projects showNavbar={false} onNavigate={handleNavigate} />}
            {activeTab === "Clients" && <Clients showNavbar={false} onNavigate={handleNavigate} />}
            {activeTab === "Services" && <Services showNavbar={false} onNavigate={handleNavigate} />}
            {activeTab === "About Us" && <AboutUs01A showNavbar={false} onNavigate={handleNavigate} />}
            {activeTab === "Milestones" && <AboutUs02 showNavbar={false} onNavigate={handleNavigate} />}
            {activeTab === "Core Values" && <AboutUs03 showNavbar={false} onNavigate={handleNavigate} />}
            {activeTab === "Contact Us" && <ContactUs01 showNavbar={false} onNavigate={handleNavigate} />}
            {activeTab === "Contact Form" && <ContactUs02 showNavbar={false} onNavigate={handleNavigate} />}
            {activeTab === "Testimonials" && <Testimonials showNavbar={false} onNavigate={handleNavigate} />}
            {activeTab === "Blogs" && <Blogs showNavbar={false} onNavigate={handleNavigate} />}
            {activeTab === "Machinery" && <Machinery showNavbar={false} onNavigate={handleNavigate} />}
            {activeTab === "Gallery" && <Gallery showNavbar={false} onNavigate={handleNavigate} />}
            {activeTab === "FAQs" && <Faqs showNavbar={false} onNavigate={handleNavigate} />}
            {activeTab === "Footer" && <FooterCTA showNavbar={false} onNavigate={handleNavigate} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Modern Scroll Indicator */}
      <div className="fixed right-4 bottom-6 z-50 flex flex-col items-center gap-2 bg-[#F5F7FB] p-2 rounded-full neu-lvl-1 border border-white/70">
        {PAGES.map((page) => {
          const isActive = activeTab === page;
          return (
            <button
              key={page}
              onClick={() => handleNavigate(page)}
              title={`Go to ${page}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-[#7C3AED] h-6 shadow-sm"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
