'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import { formatDisplayPhone, getTelUrl } from '@/lib/contact';

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar({ settings, activePath = '/' }) {
  const [open, setOpen] = useState(false);
  const phone = settings?.phone || '9063222804';

  return (
    <header className="w-full max-w-[1440px] mx-auto shrink-0 font-['Poppins'] relative">
      <div className="flex items-center justify-between gap-3 h-[64px] sm:h-[68px]">
        <div className="flex items-center justify-between bg-[#EBECF0] px-4 sm:px-6 h-full rounded-xl neu-lvl-1 flex-1 min-w-0">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#EBECF0] neu-inset flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none" aria-hidden>
                <defs>
                  <linearGradient id="logoGradNav" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="50%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
                <path d="M20 4L36 34H26L20 22L14 34H4L20 4Z" fill="url(#logoGradNav)" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-[800] text-base sm:text-lg tracking-tight text-slate-900">ASVDF</span>
              <span className="text-[9px] font-[600] tracking-[0.2em] text-slate-400 mt-0.5">FLOORING</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2 lg:gap-4 text-[14px] font-[600] text-slate-700">
            {NAV.map((link) => {
              const active = activePath === link.href || (link.href !== '/' && activePath.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    active ? 'text-[#7C3AED] bg-[#EDE9FE]' : 'hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 bg-[#EBECF0] px-2.5 sm:px-3.5 h-full rounded-xl neu-lvl-1 shrink-0">
          <a
            href={getTelUrl(phone)}
            className="hidden sm:inline-flex items-center gap-1.5 text-[#7C3AED] text-xs font-[600] px-3 py-2"
            aria-label={`Call ${formatDisplayPhone(phone)}`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{formatDisplayPhone(phone)}</span>
          </a>
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 text-white text-xs font-[600] px-4 py-2.5 rounded-lg neu-btn-primary"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-9 h-9 rounded-full neu-sm flex items-center justify-center text-slate-700"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden absolute left-0 right-0 top-[72px] z-50 bg-[#EBECF0] neu-lvl-3 rounded-2xl p-3 flex flex-col gap-1">
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-[600] text-slate-800 hover:bg-[#EDE9FE] hover:text-[#7C3AED]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={getTelUrl(phone)}
            className="px-3 py-2.5 rounded-lg text-sm font-[600] text-[#7C3AED] flex items-center gap-2"
          >
            <Phone className="w-4 h-4" /> Call {formatDisplayPhone(phone)}
          </a>
        </div>
      )}
    </header>
  );
}
