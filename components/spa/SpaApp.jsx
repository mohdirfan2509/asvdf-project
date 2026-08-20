'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SpaNavbar from '@/components/layout/SpaNavbar';
import MobileContactBar from '@/components/layout/MobileContactBar';
import FloatingContact from '@/components/layout/FloatingContact';
import Home from '@/components/sections/full/Home';
import Projects from '@/components/sections/full/Projects';
import Clients from '@/components/sections/full/Clients';
import Services from '@/components/sections/full/Services';
import AboutUs01A from '@/components/sections/full/AboutUs01A';
import AboutUs02 from '@/components/sections/full/AboutUs02';
import AboutUs03 from '@/components/sections/full/AboutUs03';
import ContactUs02 from '@/components/sections/full/ContactUs02';
import Testimonials from '@/components/sections/full/Testimonials';
import Blogs from '@/components/sections/full/Blogs';
import Machinery from '@/components/sections/full/Machinery';
import Gallery from '@/components/sections/full/Gallery';
import Faqs from '@/components/sections/full/Faqs';
import FooterCTA from '@/components/sections/full/FooterCTA';

const SECTION_DEFS = [
  { id: 'home', label: 'Home', key: 'home' },
  { id: 'projects', label: 'Projects', key: 'projects' },
  { id: 'clients', label: 'Clients', key: 'clients' },
  { id: 'services', label: 'Services', key: 'services' },
  { id: 'machinery', label: 'Machinery', key: 'machinery' },
  { id: 'about-us', label: 'About Us', key: 'about' },
  { id: 'milestones', label: 'Milestones', key: 'milestones' },
  { id: 'core-values', label: 'Core Values', key: 'values' },
  { id: 'contact-us', label: 'Contact Us', key: 'contact' },
  { id: 'testimonials', label: 'Testimonials', key: 'testimonials' },
  { id: 'blogs', label: 'Blogs', key: 'blogs' },
  { id: 'gallery', label: 'Gallery', key: 'gallery' },
  { id: 'faqs', label: 'FAQs', key: 'faqs' },
  { id: 'footer', label: 'Footer', key: 'footer' },
];

export default function SpaApp({ content }) {
  const {
    settings,
    sections = [],
    projects = [],
    services = [],
    clients = [],
    testimonials = [],
    blogs = [],
    gallery = [],
    machinery = [],
    faqs = [],
    milestones = [],
    values = [],
    about = {},
  } = content || {};

  const enabledKeys = useMemo(() => {
    if (!sections?.length) return new Set(SECTION_DEFS.map((s) => s.key));
    const keys = new Set(
      sections
        .filter((s) => s.enabled !== false && s.key !== 'contact_form')
        .map((s) => s.key)
    );
    keys.delete('contact_form');
    return keys;
  }, [sections]);

  const visibleSections = useMemo(
    () => SECTION_DEFS.filter((s) => enabledKeys.has(s.key)),
    [enabledKeys]
  );

  const [activeTab, setActiveTab] = useState(visibleSections[0]?.label || 'Home');
  const scrollingRef = useRef(false);

  const handleNavigate = useCallback(
    (pageLabel) => {
      const alias =
        pageLabel === 'Contact Form' || pageLabel === 'Contact'
          ? 'Contact Us'
          : pageLabel;
      const section = visibleSections.find((s) => s.label === alias);
      if (!section) return;
      const el = document.getElementById(section.id);
      if (!el) return;
      scrollingRef.current = true;
      setActiveTab(section.label);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${section.id}`);
      setTimeout(() => {
        scrollingRef.current = false;
      }, 900);
    },
    [visibleSections]
  );

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'contact-form') {
      setTimeout(() => handleNavigate('Contact Us'), 120);
      return;
    }
    if (hash) {
      const section = visibleSections.find((s) => s.id === hash);
      if (section) setTimeout(() => handleNavigate(section.label), 120);
    }
  }, [visibleSections, handleNavigate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const id = visible[0].target.id;
        const section = visibleSections.find((s) => s.id === id);
        if (section) setActiveTab(section.label);
      },
      { rootMargin: '-30% 0px -45% 0px', threshold: [0.2, 0.45] }
    );
    visibleSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [visibleSections]);

  return (
    <div className="spa-shell font-['Poppins'] antialiased text-slate-900 selection:bg-purple-600 selection:text-white">
      <div className="spa-nav-sticky">
        <div className="w-full max-w-[1440px] mx-auto">
          <SpaNavbar activePage={activeTab} onNavigate={handleNavigate} settings={settings} />
        </div>
      </div>

      <div className="spa-stack">
        {visibleSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            data-label={section.label}
            className="spa-section"
          >
            {section.label === 'Home' && (
              <Home onNavigate={handleNavigate} settings={settings} />
            )}
            {section.label === 'Projects' && (
              <Projects projects={projects} settings={settings} />
            )}
            {section.label === 'Clients' && <Clients clients={clients} />}
            {section.label === 'Services' && <Services services={services} />}
            {section.label === 'Machinery' && <Machinery machinery={machinery} />}
            {section.label === 'About Us' && (
              <AboutUs01A onNavigate={handleNavigate} about={about} settings={settings} />
            )}
            {section.label === 'Milestones' && <AboutUs02 milestones={milestones} />}
            {section.label === 'Core Values' && <AboutUs03 values={values} />}
            {section.label === 'Contact Us' && <ContactUs02 settings={settings} />}
            {section.label === 'Testimonials' && (
              <Testimonials testimonials={testimonials} />
            )}
            {section.label === 'Blogs' && <Blogs blogs={blogs} />}
            {section.label === 'Gallery' && <Gallery images={gallery} />}
            {section.label === 'FAQs' && (
              <Faqs faqs={faqs} onNavigate={handleNavigate} />
            )}
            {section.label === 'Footer' && (
              <FooterCTA onNavigate={handleNavigate} settings={settings} />
            )}
          </section>
        ))}
      </div>

      <MobileContactBar settings={settings} />
      <FloatingContact settings={settings} />
    </div>
  );
}
