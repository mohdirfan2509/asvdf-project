import { ArrowRight, Clock, FileText, Mail, Phone } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';
import RequestQuoteLink from '@/components/contact/RequestQuoteLink';
import FaqExplorer from '@/components/faqs/FaqExplorer';
import { toFaqItem } from '@/lib/faqs';
import { formatDisplayPhone, getTelUrl } from '@/lib/contact';
import { FAQ_ENTRIES } from '@/lib/content/faq-entries';
import { FAQS_HERO_IMAGE } from '@/lib/content/media';
import { FAQS_COPY } from '@/lib/seo/page-content';
import { faqNode, graph } from '@/lib/seo/schema';

function StripItem({ icon: Icon, children, className = '' }) {
  return (
    <div className={`flex min-w-0 items-center gap-3 max-sm:gap-2 lg:px-6 ${className}`}>
      <span className="icon-well h-11 w-11 max-sm:h-8 max-sm:w-8 fit:h-10 fit:w-10">
        <Icon className="h-5 w-5 max-sm:h-4 max-sm:w-4" strokeWidth={1.6} aria-hidden />
      </span>
      <span className="min-w-0 text-sm max-sm:text-xs fit:text-[13px] text-ink">{children}</span>
    </div>
  );
}

/**
 * FAQ hero, searchable categorised accordion, and the contact strip; content stays in the HTML for crawlers.
 * `fitScreen` (homepage only) trims the list so the section fits one screen on laptops and desktops.
 */
export default function FaqSection({ settings, id, headingAs: Heading = 'h2', className = '', fitScreen = false }) {
  const items = [...FAQ_ENTRIES].sort((a, b) => a.sort_order - b.sort_order).map(toFaqItem);
  const phone = settings?.phone;
  const email = settings?.email;
  const hours = String(settings?.working_hours || '').trim();

  return (
    <section id={id} aria-labelledby="faqs-title" className={`space-y-4 lg:space-y-5 max-sm:space-y-3 fit:space-y-3.5 ${className}`}>
      {items.length ? <JsonLd data={graph([faqNode(items)])} /> : null}

      <div className="relative isolate overflow-hidden rounded-panel border border-edge bg-surface shadow-neu-sm lg:min-h-[16rem] fit:min-h-0">
        <div className="relative z-10 p-5 sm:p-7 max-sm:p-3.5 lg:max-w-[46%] lg:py-9 lg:pl-9 lg:pr-4 fit:max-w-[52%] fit:py-5">
          <p className="mb-2 max-sm:mb-1 fit:mb-1.5 text-xs max-sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">{FAQS_COPY.eyebrow}</p>
          <Heading
            id="faqs-title"
            className="text-3xl sm:text-4xl max-sm:text-[1.45rem] lg:text-[2.2rem] xl:text-[2.5rem] fit:text-[1.9rem] font-bold leading-[1.18] max-sm:leading-[1.25] tracking-tight text-ink"
          >
            {FAQS_COPY.headingLine1}{' '}
            <br className="fit:hidden" />
            {FAQS_COPY.headingLine2Start}
            <span className="text-brand">{FAQS_COPY.headingHighlight}</span>
            {FAQS_COPY.headingLine2End}
          </Heading>
          <span className="mt-5 max-sm:mt-2.5 fit:mt-3 block h-[3px] w-12 rounded-full bg-brand" aria-hidden />
          <p className="mt-5 max-sm:mt-2.5 fit:mt-3 max-w-md text-sm sm:text-[15px] max-sm:text-[13px] fit:text-sm leading-relaxed max-sm:leading-snug text-ink-muted">{FAQS_COPY.intro}</p>
        </div>

        <div className="relative mx-4 mb-4 h-48 max-sm:mx-3 max-sm:mb-3 max-sm:h-28 sm:mx-6 sm:mb-6 sm:h-64 overflow-hidden rounded-card lg:absolute lg:inset-y-0 lg:right-0 lg:m-0 lg:h-auto lg:w-[60%] lg:rounded-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={FAQS_HERO_IMAGE}
            alt={FAQS_COPY.heroImageAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Narrower than the other heroes so the "FAQ" letters in the photo stay unfaded. */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-surface via-surface/60 to-transparent lg:block"
          />
        </div>
      </div>

      <div className="rounded-panel border border-edge bg-surface p-4 sm:p-6 max-sm:p-3 fit:p-5 shadow-neu-sm">
        <FaqExplorer items={items} fitScreen={fitScreen} />
      </div>

      <div className="grid gap-5 max-sm:grid-flow-row-dense max-sm:grid-cols-2 max-sm:gap-x-2 max-sm:gap-y-2.5 rounded-panel border border-edge bg-surface p-5 max-sm:p-3.5 sm:grid-cols-2 sm:p-6 shadow-neu-sm lg:flex lg:items-center lg:gap-0 lg:divide-x lg:divide-line lg:py-5 fit:py-3.5">
        <div className="flex min-w-0 items-center gap-4 max-sm:gap-2.5 sm:col-span-2 max-sm:col-span-2 lg:flex-1 lg:pr-6">
          <span className="icon-orb h-12 w-12 max-sm:h-9 max-sm:w-9 fit:h-11 fit:w-11">
            <FileText className="h-5 w-5 max-sm:h-4 max-sm:w-4" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-[15px] max-sm:text-sm fit:text-sm font-semibold text-ink">{FAQS_COPY.stripHeading}</span>
            <span className="mt-0.5 block text-xs sm:text-[13px] text-ink-muted">{FAQS_COPY.stripText}</span>
          </span>
        </div>
        {phone ? (
          <StripItem icon={Phone}>
            <a href={getTelUrl(phone)} className="font-medium transition-colors hover:text-brand">
              {formatDisplayPhone(phone)}
            </a>
          </StripItem>
        ) : null}
        {email ? (
          <StripItem icon={Mail} className="max-sm:col-span-2">
            <a href={`mailto:${email}`} className="break-all font-medium transition-colors hover:text-brand">
              {email}
            </a>
          </StripItem>
        ) : null}
        {hours ? <StripItem icon={Clock}>{hours}</StripItem> : null}
        <div className="sm:col-span-2 max-sm:col-span-2 lg:pl-6">
          <RequestQuoteLink className="group btn-primary h-11 max-sm:h-10 w-full rounded-control px-6 text-sm max-sm:text-[13px] sm:w-auto">
            {FAQS_COPY.contactCta}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </RequestQuoteLink>
        </div>
      </div>
    </section>
  );
}
