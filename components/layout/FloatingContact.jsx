'use client';

import { Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/SocialIcons';
import { formatDisplayPhone, getTelUrl, getWhatsAppUrl } from '@/lib/contact';

/** Round button whose label slides out to the left on hover or keyboard focus. */
const pillClass =
  'group inline-flex h-12 items-center overflow-hidden rounded-full text-white shadow-neu-sm transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-neu-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
const labelClass =
  'max-w-0 whitespace-nowrap pl-0 text-sm font-semibold opacity-0 transition-[max-width,padding,opacity] duration-300 ease-out group-hover:max-w-40 group-hover:pl-5 group-hover:opacity-100 group-focus-visible:max-w-40 group-focus-visible:pl-5 group-focus-visible:opacity-100 motion-reduce:transition-none';
const iconBox = 'flex h-12 w-12 shrink-0 items-center justify-center';

/** Desktop floating contact — always available, does not appear as login */
export default function FloatingContact({ settings }) {
  const phone = settings?.phone || '9063222804';
  const whatsapp = settings?.whatsapp || phone;

  return (
    <div className="hidden md:flex fixed right-4 bottom-6 z-[55] flex-col items-end gap-2.5">
      <a
        href={getWhatsAppUrl(whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${pillClass} bg-[#15803D] focus-visible:ring-[#15803D]/50`}
        aria-label="Chat on WhatsApp (opens in a new tab)"
      >
        <span className={labelClass} aria-hidden>
          WhatsApp
        </span>
        <span className={iconBox}>
          <WhatsAppIcon className="h-6 w-6" />
        </span>
      </a>
      <a
        href={getTelUrl(phone)}
        className={`${pillClass} bg-brand-solid hover:bg-brand-highlight focus-visible:ring-brand/40`}
        aria-label={`Call ${formatDisplayPhone(phone)}`}
      >
        <span className={labelClass} aria-hidden>
          Call Now
        </span>
        <span className={iconBox}>
          <Phone className="h-5 w-5" />
        </span>
      </a>
    </div>
  );
}
