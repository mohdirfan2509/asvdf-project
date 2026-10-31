'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { formatDisplayPhone, getTelUrl, getWhatsAppUrl } from '@/lib/contact';

export default function FooterCTA({ settings }) {
  const phone = settings?.phone || '9063222804';
  const whatsapp = settings?.whatsapp || phone;

  return (
    <section aria-label="Contact ASVDF Flooring" className="bg-brand rounded-panel p-5 sm:p-8 text-white overflow-hidden shadow-neu-md">
      <div className="max-w-xl">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Ready for stronger floors?</h2>
        <p className="text-sm text-white/85 mb-5">
          Talk to ASVDF about VDF and industrial flooring for your next project.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href={getWhatsAppUrl(whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] rounded-control px-5 py-3 text-sm font-semibold">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a href={getTelUrl(phone)} className="inline-flex items-center gap-2 bg-white text-ink rounded-control px-5 py-3 text-sm font-semibold">
            <Phone className="w-4 h-4" /> {formatDisplayPhone(phone)}
          </a>
        </div>
      </div>
    </section>
  );
}
