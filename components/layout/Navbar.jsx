'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import BrandLogo from '@/components/brand/BrandLogo';
import { formatDisplayPhone, getTelUrl } from '@/lib/contact';

// Each item scrolls to its homepage section; `route` is the dedicated page it highlights on.
const NAV = [
  { label: 'Home', id: 'home', route: '/' },
  { label: 'Projects', id: 'projects', route: '/projects' },
  { label: 'Clients', id: 'clients', route: '/clients' },
  { label: 'Services', id: 'services', route: '/services' },
  { label: 'About Us', id: 'about', route: '/about' },
  { label: 'Contact Us', id: 'contact', route: '/contact' },
];

// Tracked in page order; sections without a menu link (Gallery, Testimonials, Blogs, FAQs) leave no item highlighted.
const TRACKED_SECTIONS = [...NAV.map((item) => item.id), 'gallery', 'testimonials', 'blogs', 'faqs'];

const MENU_ID = 'site-mobile-menu';
const PROBE = 0.3;
const CLICK_LOCK_MS = 2000;

function isRouteActive(path, route) {
  if (route === '/') return path === '/';
  return path === route || path.startsWith(`${route}/`);
}

/** Last section whose top has passed the probe line near the top of the viewport. */
function sectionAtProbe() {
  const line = window.innerHeight * PROBE;
  let current = TRACKED_SECTIONS[0];
  for (const id of TRACKED_SECTIONS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= line) current = id;
  }
  return current;
}

export default function Navbar({ settings, activePath = '/' }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const path = usePathname() || activePath;
  const onHome = path === '/';
  const [activeId, setActiveId] = useState(NAV[0].id);
  const lockRef = useRef(null);
  const phone = settings?.phone || '9063222804';

  useEffect(() => {
    if (!onHome) return undefined;
    const sections = TRACKED_SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const sync = () => {
      if (!lockRef.current) setActiveId(sectionAtProbe());
    };

    // A thin band at the probe line; crossings re-evaluate the active section without touching scroll.
    const observer = new IntersectionObserver(sync, {
      rootMargin: `-${PROBE * 100}% 0px -${100 - PROBE * 100 - 1}% 0px`,
    });
    sections.forEach((section) => observer.observe(section));
    // Late layout shifts (images, hash jumps on load) can move sections without a band crossing.
    const resizeObserver = new ResizeObserver(sync);
    resizeObserver.observe(document.body);
    const events = ['scrollend', 'hashchange', 'resize'];
    events.forEach((name) => window.addEventListener(name, sync, { passive: true }));
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      events.forEach((name) => window.removeEventListener(name, sync));
      lockRef.current?.();
    };
  }, [onHome]);

  // Keeps the clicked item highlighted while the smooth scroll passes other sections.
  const selectSection = (id) => {
    setOpen(false);
    if (!onHome) return;
    lockRef.current?.();
    setActiveId(id);
    const release = () => {
      clearTimeout(timer);
      window.removeEventListener('scrollend', release);
      lockRef.current = null;
    };
    const timer = setTimeout(release, CLICK_LOCK_MS);
    window.addEventListener('scrollend', release);
    lockRef.current = release;
  };

  const isActive = (link) => (onHome ? activeId === link.id : isRouteActive(path, link.route));

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (e) => {
      if (menuRef.current?.contains(e.target) || buttonRef.current?.contains(e.target)) return;
      setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <header className="w-full max-w-[1440px] mx-auto shrink-0 relative">
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 h-14 sm:h-16 lg:h-[72px]">
        <div className="surface-raised rounded-panel flex-1 min-w-0 h-full flex items-center gap-4 px-3 sm:px-5 lg:px-6">
          <Link href="/" className="flex items-center shrink-0" aria-label="AS VDF Flooring home">
            <BrandLogo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex flex-1 h-full items-stretch justify-center gap-0.5 xl:gap-2">
            {NAV.map((link) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.id}
                  href={`/#${link.id}`}
                  onClick={() => selectSection(link.id)}
                  aria-current={active ? (onHome ? 'location' : 'page') : undefined}
                  className={`relative inline-flex items-center px-3 xl:px-4 text-[15px] font-medium transition-colors duration-200 ${
                    active ? 'text-brand' : 'text-ink hover:text-brand'
                  }`}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute left-3 right-3 xl:left-4 xl:right-4 bottom-0 h-[2px] rounded-full bg-brand" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="surface-raised rounded-panel h-full shrink-0 flex items-center gap-2 sm:gap-3 px-2 sm:px-3 lg:px-4">
          <a
            href={getTelUrl(phone)}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-brand"
            aria-label={`Call ${formatDisplayPhone(phone)}`}
          >
            <span className="icon-well w-10 h-10 lg:w-11 lg:h-11">
              <Phone className="w-[18px] h-[18px]" />
            </span>
            <span className="hidden xl:inline pr-1">{formatDisplayPhone(phone)}</span>
          </a>
          <Link
            href="/#contact"
            onClick={() => selectSection('contact')}
            className="group btn-primary hidden sm:inline-flex rounded-full h-10 lg:h-11 px-4 lg:px-5 text-[13px] lg:text-sm"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <button
            ref={buttonRef}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls={MENU_ID}
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden icon-well w-10 h-10 transition-colors hover:text-brand ${open ? 'text-brand' : 'text-ink'}`}
          >
            {open ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          ref={menuRef}
          id={MENU_ID}
          className="lg:hidden absolute left-0 right-0 top-full mt-2 z-50 surface-raised shadow-neu-lg rounded-panel p-3 flex flex-col gap-0.5"
        >
          <nav aria-label="Site menu" className="flex flex-col gap-0.5">
            {NAV.map((link) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.id}
                  href={`/#${link.id}`}
                  onClick={() => selectSection(link.id)}
                  aria-current={active ? (onHome ? 'location' : 'page') : undefined}
                  className={`px-3 py-2.5 rounded-control text-sm font-medium transition-colors ${
                    active ? 'bg-brand-soft text-brand' : 'text-ink hover:bg-surface hover:text-brand'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <a
            href={getTelUrl(phone)}
            className="mt-1 px-3 py-2.5 rounded-control text-sm font-semibold text-brand flex items-center gap-2 border-t border-line"
          >
            <Phone className="w-4 h-4" /> Call {formatDisplayPhone(phone)}
          </a>
        </div>
      )}
    </header>
  );
}
