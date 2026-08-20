'use client';

import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';
import { formatDisplayPhone, getTelUrl, getWhatsAppUrl } from '@/lib/contact';

export default function FooterCTA({ settings }) {
  const phone = settings?.phone || '8074337407';
  const whatsapp = settings?.whatsapp || phone;

  return (
    <footer className="bg-gradient-to-r from-[#3B25B0] via-[#4C28C4] to-[#5B2DE0] rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 text-white overflow-hidden">
      <div className="max-w-xl">
        <h2 className="text-2xl sm:text-3xl font-[800] tracking-tight mb-2">Ready for stronger floors?</h2>
        <p className="text-sm text-purple-100 mb-5">
          Talk to ASVDF about VDF and industrial flooring for your next project.
        </p>
        <div className="flex flex-wrap gap-3 mb-8">
          <a href={getWhatsAppUrl(whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] rounded-lg px-5 py-3 text-sm font-[600]">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a href={getTelUrl(phone)} className="inline-flex items-center gap-2 bg-white text-slate-900 rounded-lg px-5 py-3 text-sm font-[600]">
            <Phone className="w-4 h-4" /> {formatDisplayPhone(phone)}
          </a>
        </div>
      </div>
      <div className="border-t border-white/15 pt-4 flex flex-wrap gap-4 text-xs text-purple-100">
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/services">Services</Link>
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <p className="text-[11px] text-purple-200/80 mt-3">© {new Date().getFullYear()} {settings?.company_name || 'ASVDF Flooring'}. All rights reserved.</p>
    </footer>
  );
}
