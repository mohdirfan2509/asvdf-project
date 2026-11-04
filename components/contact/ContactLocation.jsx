import { ArrowUpRight } from 'lucide-react';
import { mapsEmbedUrl, mapsUrl } from '@/lib/seo/company';

export default function ContactLocation({ heading, companyName, address }) {
  return (
    <div className="flex h-full flex-col">
      <h2 className="text-2xl sm:text-[1.75rem] max-sm:text-lg font-bold tracking-tight text-ink">{heading}</h2>

      <div className="relative mt-6 fit:mt-4 max-sm:mt-3 flex flex-1 flex-col gap-3 max-sm:gap-2.5 sm:block">
        <div className="sm:absolute sm:left-4 sm:top-4 sm:z-10 sm:max-w-[19rem] surface-raised shadow-float rounded-card p-4 sm:p-5 max-sm:p-3">
          <p className="text-[15px] max-sm:text-sm font-bold text-ink">{companyName}</p>
          <address className="mt-2 max-sm:mt-1 text-xs max-sm:text-[11.5px] leading-relaxed max-sm:leading-snug text-ink-muted not-italic">{address}</address>
          <a
            href={mapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 max-sm:mt-1.5 inline-flex items-center gap-1 text-sm max-sm:text-[13px] font-semibold text-brand hover:underline"
          >
            View on Google Maps
            <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <div className="relative h-[18rem] max-sm:h-44 sm:h-full sm:min-h-[26rem] fit:min-h-[22rem] overflow-hidden rounded-card border border-edge bg-surface-sunken shadow-neu-sm">
          <iframe
            title={`Map showing the registered office of ${companyName} in Shamshabad, Telangana`}
            src={mapsEmbedUrl()}
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
