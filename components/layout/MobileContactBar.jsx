'use client';

import { Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/SocialIcons';
import { formatDisplayPhone, getTelUrl, getWhatsAppUrl } from '@/lib/contact';

export default function MobileContactBar({ settings }) {
  const phone = settings?.phone || '9063222804';
  const whatsapp = settings?.whatsapp || phone;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[55] md:hidden pointer-events-none">
      <div className="pointer-events-auto mx-2.5 mb-[max(0.375rem,env(safe-area-inset-bottom))] grid grid-cols-2 gap-1.5 rounded-card bg-surface-raised/95 backdrop-blur-md p-1.5 border border-edge shadow-neu-lg">
        <a
          href={getWhatsAppUrl(whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-control bg-[#25D366] text-white font-semibold text-[13px] py-2.5 active:translate-y-px transition-transform"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon className="w-[18px] h-[18px]" />
          WhatsApp
        </a>
        <a
          href={getTelUrl(phone)}
          className="btn-primary text-[13px] py-2.5"
          aria-label={`Call ${formatDisplayPhone(phone)}`}
        >
          <Phone className="w-[18px] h-[18px]" />
          Call Now
        </a>
      </div>
    </div>
  );
}
