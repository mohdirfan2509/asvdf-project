'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { formatDisplayPhone, getTelUrl, getWhatsAppUrl } from '@/lib/contact';

/** Desktop floating contact — always available, does not appear as login */
export default function FloatingContact({ settings }) {
  const phone = settings?.phone || '9063222804';
  const whatsapp = settings?.whatsapp || phone;

  return (
    <div className="hidden md:flex fixed right-4 bottom-6 z-[55] flex-col gap-2">
      <a
        href={getWhatsAppUrl(whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
        aria-label="WhatsApp"
        title="WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
      <a
        href={getTelUrl(phone)}
        className="w-12 h-12 rounded-full neu-btn-primary text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
        aria-label={`Call ${formatDisplayPhone(phone)}`}
        title={formatDisplayPhone(phone)}
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
