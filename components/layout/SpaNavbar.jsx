'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Home as HomeIcon,
  Briefcase,
  Users,
  Wrench,
  Info,
  Phone,
  MessageSquareQuote,
  FileText,
  Settings,
  Image,
  HelpCircle
} from 'lucide-react';
import BrandLogo from '@/components/brand/BrandLogo';
import SiteSearch from '@/components/layout/SiteSearch';

const MENU_ID = 'spa-site-menu';

export default function Navbar({ onNavigate, searchIndex = [] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const navLinks = [
    { label: "Home", href: "/", spaLabel: "Home" },
    { label: "Projects", href: "/projects", spaLabel: "Projects" },
    { label: "Clients", href: "/clients", spaLabel: "Clients" },
    { label: "Services", href: "/services", spaLabel: "Services" },
    { label: "About Us", href: "/about", spaLabel: "About Us" },
    { label: "Contact Us", href: "/contact", spaLabel: "Contact Us" }
  ];

  const fullMenuItems = [
    { label: "Home", icon: HomeIcon, href: "/", spaLabel: "Home" },
    { label: "Projects", icon: Briefcase, href: "/projects", spaLabel: "Projects" },
    { label: "Clients", icon: Users, href: "/clients", spaLabel: "Clients" },
    { label: "Services", icon: Wrench, href: "/services", spaLabel: "Services" },
    { label: "Machinery", icon: Settings, href: "/#machinery", spaLabel: "Machinery" },
    { label: "About Us", icon: Info, href: "/about", spaLabel: "About Us" },
    { label: "Milestones", icon: Info, href: "/about", spaLabel: "Milestones" },
    { label: "Core Values", icon: Info, href: "/about", spaLabel: "Core Values" },
    { label: "Contact Us", icon: Phone, href: "/contact", spaLabel: "Contact Us" },
    { label: "Testimonials", icon: MessageSquareQuote, href: "/#testimonials", spaLabel: "Testimonials" },
    { label: "Blogs", icon: FileText, href: "/blog", spaLabel: "Blogs" },
    { label: "Gallery", icon: Image, href: "/#gallery", spaLabel: "Gallery" },
    { label: "FAQs", icon: HelpCircle, href: "/#faqs", spaLabel: "FAQs" },
  ];

  // Dedicated pages use normal routing; only "/" and "/#section" targets scroll within the homepage.
  const goSpa = (e, href, spaLabel) => {
    const inPage = href === '/' || href.startsWith('/#');
    if (inPage && pathname === '/' && onNavigate && spaLabel) {
      e.preventDefault();
      onNavigate(spaLabel);
    }
    setMobileMenuOpen(false);
  };

  const isActive = (href) => {
    if (href.includes('#')) return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (e) => {
      if (menuRef.current?.contains(e.target) || menuButtonRef.current?.contains(e.target)) return;
      setMobileMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [mobileMenuOpen]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="relative w-full max-w-[1440px] mx-auto h-full flex items-center">
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-full h-14 sm:h-16 lg:h-[72px]">

        <div className="surface-raised rounded-panel flex-1 min-w-0 h-full flex items-center gap-4 px-3 sm:px-5 lg:px-6">
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="AS VDF Flooring home"
            onClick={(e) => goSpa(e, "/", "Home")}
          >
            <BrandLogo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex flex-1 h-full items-stretch justify-center gap-1 xl:gap-3">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  onClick={(e) => goSpa(e, link.href, link.spaLabel)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative inline-flex items-center px-3 xl:px-4 text-[15px] font-medium transition-colors duration-200 ${
                    active ? "text-brand" : "text-ink hover:text-brand"
                  }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <motion.span
                      layoutId="spaNavActiveIndicator"
                      className="absolute left-3 right-3 xl:left-4 xl:right-4 bottom-0 h-[2px] rounded-full bg-brand"
                      transition={{ type: "tween", ease: [0.2, 0, 0, 1], duration: 0.25 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="surface-raised rounded-panel h-full shrink-0 flex items-center gap-2 sm:gap-3 px-2 sm:px-3 lg:px-4">
          <Link
            href="/contact"
            onClick={(e) => goSpa(e, "/contact", "Contact Us")}
            className="group btn-primary hidden min-[420px]:inline-flex rounded-full h-10 lg:h-11 px-4 lg:px-5 text-[13px] lg:text-sm shrink-0"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            aria-label="Search"
            aria-haspopup="dialog"
            onClick={() => setSearchOpen(true)}
            className="icon-well w-10 h-10 lg:w-11 lg:h-11 text-ink transition-colors hover:text-brand"
          >
            <Search className="w-[18px] h-[18px]" />
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls={MENU_ID}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`icon-well w-10 h-10 lg:w-11 lg:h-11 transition-colors hover:text-brand ${
              mobileMenuOpen ? "text-brand" : "text-ink"
            }`}
          >
            {mobileMenuOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            id={MENU_ID}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
            className="absolute right-0 top-full mt-2 z-50 w-[min(18rem,calc(100vw-1rem))] surface-raised shadow-neu-lg rounded-panel p-3 flex flex-col gap-2.5"
          >
            <div className="flex items-center justify-between px-1.5 pb-2.5 border-b border-line">
              <span className="text-[11px] font-semibold text-ink uppercase tracking-wider">
                Theme
              </span>
              <button
                type="button"
                onClick={toggleDarkMode}
                className="flex items-center gap-1.5 surface-inset px-2.5 py-1 rounded-lg text-xs font-medium text-ink transition-colors hover:text-brand"
              >
                {isDarkMode ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-brand" />
                    <span>Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Light</span>
                  </>
                )}
              </button>
            </div>

            <nav aria-label="Site menu" className="flex flex-col gap-0.5 max-h-[min(60vh,26rem)] overflow-y-auto pr-0.5">
              <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-widest px-1.5 mb-1">
                Navigation Menu
              </span>

              {fullMenuItems.map((item) => {
                const IconComp = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => goSpa(e, item.href, item.spaLabel)}
                    aria-current={active ? 'page' : undefined}
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded-control text-sm font-medium transition-colors ${
                      active
                        ? "bg-brand-soft text-brand"
                        : "text-ink hover:bg-surface hover:text-brand"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        active ? "bg-brand text-white" : "surface-inset text-ink-muted"
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} index={searchIndex} />
    </header>
  );
}
