'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { formatDisplayPhone, getTelUrl, getWhatsAppUrl } from '@/lib/contact';

export default function MobileContactBar({ settings }) {
  const phone = settings?.phone || '9063222804';
  const whatsapp = settings?.whatsapp || phone;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[55] md:hidden pointer-events-none">
      <div className="pointer-events-auto mx-3 mb-3 grid grid-cols-2 gap-2 rounded-card bg-surface-raised/95 backdrop-blur-md p-2 border border-edge shadow-neu-lg">
        <a
          href={getWhatsAppUrl(whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-control bg-[#25D366] text-white font-semibold text-sm py-3.5 active:translate-y-px transition-transform"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </a>
        <a
          href={getTelUrl(phone)}
          className="btn-primary text-sm py-3.5"
          aria-label={`Call ${formatDisplayPhone(phone)}`}
        >
          <Phone className="w-5 h-5" />
          Call Now
        </a>
      </div>
    </div>
  );
}
