import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
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

const SECTIONS = [
  { id: 'home', label: 'Home', Component: Home },
  { id: 'projects', label: 'Projects', Component: Projects },
  { id: 'clients', label: 'Clients', Component: Clients },
  { id: 'services', label: 'Services', Component: Services },
  { id: 'about-us', label: 'About Us', Component: AboutUs01A },
  { id: 'milestones', label: 'Milestones', Component: AboutUs02 },
  { id: 'core-values', label: 'Core Values', Component: AboutUs03 },
  { id: 'contact-us', label: 'Contact Us', Component: ContactUs01 },
  { id: 'contact-form', label: 'Contact Form', Component: ContactUs02 },
  { id: 'testimonials', label: 'Testimonials', Component: Testimonials },
  { id: 'blogs', label: 'Blogs', Component: Blogs },
  { id: 'machinery', label: 'Machinery', Component: Machinery },
  { id: 'gallery', label: 'Gallery', Component: Gallery },
  { id: 'faqs', label: 'FAQs', Component: Faqs },
  { id: 'footer', label: 'Footer', Component: FooterCTA },
];

const LABEL_TO_ID = Object.fromEntries(SECTIONS.map((s) => [s.label, s.id]));

const sectionReveal = {
  hidden: (reduceMotion) =>
    reduceMotion
      ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
      : { opacity: 0, y: 56, scale: 0.97, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      opacity: { duration: 0.45 },
      filter: { duration: 0.55 },
    },
  },
};

function ScrollSection({ id, label, reduceMotion, children }) {
  return (
    <motion.section
      id={id}
      data-label={label}
      custom={reduceMotion}
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25, margin: '0px 0px -6% 0px' }}
      className="scroll-mt-[5.5rem] w-full h-[calc(100svh-5.5rem)] shrink-0 will-change-transform"
    >
      {children}
    </motion.section>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [navScrolled, setNavScrolled] = useState(false);
  const isScrollingToSection = useRef(false);
  const scrollTimeout = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollY.on('change', (y) => {
      setNavScrolled(y > 24);
    });
  }, [scrollY]);

  const handleNavigate = useCallback((pageLabel) => {
    const id = LABEL_TO_ID[pageLabel];
    if (!id) return;

    const el = document.getElementById(id);
    if (!el) return;

    isScrollingToSection.current = true;
    setActiveTab(pageLabel);
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });

    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isScrollingToSection.current = false;
    }, reduceMotion ? 100 : 900);
  }, [reduceMotion]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingToSection.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;

        const label = visible[0].target.getAttribute('data-label');
        if (label) setActiveTab(label);
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.15, 0.35, 0.55],
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#EBECF0] font-['Poppins'] antialiased text-slate-900 selection:bg-purple-600 selection:text-white">
      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC]"
        style={{ scaleX: progress }}
      />

      {/* Sticky nav with scroll depth */}
      <motion.div
        className={`sticky top-0 z-40 px-3 sm:px-4 pt-3 sm:pt-4 pb-2 backdrop-blur-md transition-[background-color,box-shadow] duration-300 ${
          navScrolled
            ? 'bg-[#EBECF0]/85 shadow-[0_8px_24px_rgba(184,185,190,0.35)]'
            : 'bg-[#EBECF0]/55'
        }`}
        initial={false}
        animate={
          reduceMotion
            ? undefined
            : { y: 0, opacity: 1 }
        }
      >
        <Navbar activePage={activeTab} onNavigate={handleNavigate} />
      </motion.div>

      <div className="max-w-[1440px] w-full mx-auto px-3 sm:px-4 pb-6 flex flex-col gap-5">
        {SECTIONS.map(({ id, label, Component }) => (
          <ScrollSection
            key={id}
            id={id}
            label={label}
            reduceMotion={reduceMotion}
          >
            <Component showNavbar={false} onNavigate={handleNavigate} />
          </ScrollSection>
        ))}
      </div>

      {/* Animated section dots */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="fixed right-4 bottom-6 z-50 flex flex-col items-center gap-2 bg-[#EBECF0]/90 backdrop-blur-sm p-2 rounded-full neu-lvl-1 border border-white/35"
      >
        {SECTIONS.map(({ id, label }) => {
          const isActive = activeTab === label;
          return (
            <button
              key={id}
              onClick={() => handleNavigate(label)}
              title={`Go to ${label}`}
              className="relative flex h-3 w-3 items-center justify-center cursor-pointer"
            >
              {isActive && (
                <motion.span
                  layoutId="scroll-dot-active"
                  className="absolute h-6 w-3 rounded-full bg-[#7C3AED] shadow-sm"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <motion.span
                className={`relative z-10 block rounded-full ${
                  isActive ? 'h-1.5 w-1.5 bg-white' : 'h-3 w-3 bg-slate-300'
                }`}
                whileHover={reduceMotion ? undefined : { scale: 1.25 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              />
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
