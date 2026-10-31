import { ArrowUpRight } from 'lucide-react';
import { COMPANY, mapsEmbedUrl, mapsUrl } from '@/lib/seo/company';

export default function ContactLocation({ heading, companyName, address }) {
  return (
    <div className="flex h-full flex-col">
      <h2 className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-ink">{heading}</h2>

      <div className="relative mt-6 flex flex-1 flex-col gap-3 sm:block">
        <div className="sm:absolute sm:left-4 sm:top-4 sm:z-10 sm:max-w-[19rem] surface-raised shadow-float rounded-card p-4 sm:p-5">
          <p className="text-[15px] font-bold text-ink">{companyName}</p>
          <address className="mt-2 text-xs leading-relaxed text-ink-muted not-italic">{address}</address>
          <a
            href={mapsUrl(COMPANY.mapsArea)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
          >
            View on Google Maps
            <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <div className="relative h-[18rem] sm:h-full sm:min-h-[26rem] overflow-hidden rounded-card border border-white/80 bg-surface-sunken shadow-neu-sm">
          <iframe
            title={`Map of Shamshabad, Telangana, where the registered office of ${companyName} is located`}
            src={mapsEmbedUrl(COMPANY.mapsArea)}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
