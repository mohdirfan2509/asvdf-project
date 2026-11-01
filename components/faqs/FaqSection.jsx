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

function StripItem({ icon: Icon, children }) {
  return (
    <div className="flex min-w-0 items-center gap-3 lg:px-6">
      <span className="icon-well h-11 w-11">
        <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
      </span>
      <span className="min-w-0 text-sm text-ink">{children}</span>
    </div>
  );
}

/** FAQ hero, searchable categorised accordion, and the contact strip; content stays in the HTML for crawlers. */
export default function FaqSection({ settings, id, headingAs: Heading = 'h2', className = '' }) {
  const items = [...FAQ_ENTRIES].sort((a, b) => a.sort_order - b.sort_order).map(toFaqItem);
  const phone = settings?.phone;
  const email = settings?.email;
  const hours = String(settings?.working_hours || '').trim();

  return (
    <section id={id} aria-labelledby="faqs-title" className={`space-y-4 lg:space-y-5 ${className}`}>
      {items.length ? <JsonLd data={graph([faqNode(items)])} /> : null}

      <div className="relative isolate overflow-hidden rounded-panel border border-edge bg-surface shadow-neu-sm lg:min-h-[16rem]">
        <div className="relative z-10 p-5 sm:p-7 lg:max-w-[46%] lg:py-9 lg:pl-9 lg:pr-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">{FAQS_COPY.eyebrow}</p>
          <Heading
            id="faqs-title"
            className="text-3xl sm:text-4xl lg:text-[2.2rem] xl:text-[2.5rem] font-bold leading-[1.18] tracking-tight text-ink"
          >
            {FAQS_COPY.headingLine1}
            <br />
            {FAQS_COPY.headingLine2Start}
            <span className="text-brand">{FAQS_COPY.headingHighlight}</span>
            {FAQS_COPY.headingLine2End}
          </Heading>
          <span className="mt-5 block h-[3px] w-12 rounded-full bg-brand" aria-hidden />
          <p className="mt-5 max-w-md text-sm sm:text-[15px] leading-relaxed text-ink-muted">{FAQS_COPY.intro}</p>
        </div>

        <div className="relative mx-4 mb-4 h-48 sm:mx-6 sm:mb-6 sm:h-64 overflow-hidden rounded-card lg:absolute lg:inset-y-0 lg:right-0 lg:m-0 lg:h-auto lg:w-[60%] lg:rounded-none">
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

      <div className="rounded-panel border border-edge bg-surface p-4 sm:p-6 shadow-neu-sm">
        <FaqExplorer items={items} />
      </div>

      <div className="grid gap-5 rounded-panel border border-edge bg-surface p-5 sm:grid-cols-2 sm:p-6 shadow-neu-sm lg:flex lg:items-center lg:gap-0 lg:divide-x lg:divide-line lg:py-5">
        <div className="flex min-w-0 items-center gap-4 sm:col-span-2 lg:flex-1 lg:pr-6">
          <span className="icon-orb h-12 w-12">
            <FileText className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-[15px] font-semibold text-ink">{FAQS_COPY.stripHeading}</span>
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
          <StripItem icon={Mail}>
            <a href={`mailto:${email}`} className="break-all font-medium transition-colors hover:text-brand">
              {email}
            </a>
          </StripItem>
        ) : null}
        {hours ? <StripItem icon={Clock}>{hours}</StripItem> : null}
        <div className="sm:col-span-2 lg:pl-6">
          <RequestQuoteLink className="group btn-primary h-11 w-full rounded-control px-6 text-sm sm:w-auto">
            {FAQS_COPY.contactCta}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </RequestQuoteLink>
        </div>
      </div>
    </section>
  );
}
