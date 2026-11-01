import { ArrowRight, Phone } from 'lucide-react';
import RequestQuoteLink from '@/components/contact/RequestQuoteLink';
import { FINAL_CTA_IMAGE } from '@/lib/content/media';
import { FINAL_CTA_COPY } from '@/lib/seo/page-content';
import { formatDisplayPhone, getTelUrl } from '@/lib/contact';

/** Curved left edge of the photo (objectBoundingBox units, so it scales with the banner). */
const CURVE = 'M0.052,0 C0.03,0.04 0.02,0.1 0.016,0.2 C0.012,0.35 0.012,0.5 0.02,0.62 C0.03,0.78 0.055,0.92 0.1,1';
const CLIP = `${CURVE} L1,1 L1,0 Z`;

export default function FinalCta({ settings, className = '' }) {
  const phone = settings?.phone;

  return (
    <section
      id="footer-cta"
      aria-labelledby="footer-cta-title"
      className={`relative isolate overflow-hidden rounded-panel bg-[linear-gradient(105deg,#1b1748_0%,#2b1f78_42%,#4f36c8_78%,#6845e8_100%)] text-white shadow-neu-md lg:min-h-[19rem] ${className}`}
    >
      <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
        <defs>
          <clipPath id="footer-cta-curve" clipPathUnits="objectBoundingBox">
            <path d={CLIP} />
          </clipPath>
        </defs>
      </svg>

      <div className="relative z-10 px-6 pt-8 pb-6 sm:px-10 sm:pt-10 lg:w-[50%] lg:py-12 lg:pl-12 lg:pr-6">
        <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.08em] text-white ring-1 ring-white/20 shadow-[0_10px_24px_-12px_rgb(0_0_0/0.6)]">
          {FINAL_CTA_COPY.eyebrow}
        </span>
        <h2
          id="footer-cta-title"
          className="mt-5 text-[1.75rem] sm:text-4xl lg:text-[2.35rem] xl:text-[2.6rem] font-bold leading-[1.2] tracking-tight"
        >
          {FINAL_CTA_COPY.headingLine1}
          <br />
          {FINAL_CTA_COPY.headingLine2}
          <span className="text-brand-light">{FINAL_CTA_COPY.headingHighlight}</span>
        </h2>
        <p className="mt-4 max-w-md text-sm sm:text-[15px] leading-relaxed text-white/85">{FINAL_CTA_COPY.text}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <RequestQuoteLink className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-control bg-gradient-to-b from-brand-highlight to-brand-solid px-6 text-sm sm:text-[15px] font-semibold text-white ring-1 ring-white/15 shadow-[0_14px_30px_-12px_rgb(129_92_235/0.95)] transition-[filter,transform] duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            {FINAL_CTA_COPY.button}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </RequestQuoteLink>
          {phone ? (
            <a
              href={getTelUrl(phone)}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-control bg-white/95 px-6 text-sm sm:text-[15px] font-semibold text-brand-strong shadow-neu-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Phone className="h-[18px] w-[18px] text-brand" strokeWidth={1.75} aria-hidden />
              {formatDisplayPhone(phone)}
            </a>
          ) : null}
        </div>
      </div>

      <div className="relative mx-4 mb-4 h-52 sm:mx-6 sm:mb-6 sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:m-0 lg:h-auto lg:w-[52%]">
        <div className="absolute inset-0 overflow-hidden rounded-card lg:rounded-none lg:[clip-path:url(#footer-cta-curve)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={FINAL_CTA_IMAGE}
            alt={FINAL_CTA_COPY.imageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <svg
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          aria-hidden
          focusable="false"
        >
          <path d={CURVE} fill="none" stroke="rgb(255 255 255 / 0.9)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </section>
  );
}
