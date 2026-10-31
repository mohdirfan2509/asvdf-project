import { ArrowRight, Award, MessageSquareText, Quote, ShieldCheck, Star, Users } from 'lucide-react';
import RequestQuoteLink from '@/components/contact/RequestQuoteLink';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import StarRating from '@/components/ui/StarRating';
import { COMPANY_VIDEO } from '@/lib/content/media';
import { TESTIMONIALS_COPY } from '@/lib/seo/page-content';
import { statValue } from '@/lib/stats';

const STATS = [
  { key: 'stat_clients', label: 'Happy Clients', icon: Users },
  { key: 'stat_projects', label: 'Projects Completed', icon: Star },
  { key: 'stat_satisfaction', label: 'Client Satisfaction', icon: ShieldCheck },
  { key: 'stat_years', label: 'Years of Excellence', icon: Award },
];

const STAT_COLUMNS = { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4' };

/** Resolves a review's optional `company` to a client record (for its logo), or to the typed name. */
function companyFor(testimonial, clients) {
  const name = String(testimonial.company || '').trim();
  if (!name) return null;
  const client = clients.find((c) => String(c.name || '').trim().toLowerCase() === name.toLowerCase());
  return { name: client?.name || name, logo: client?.logo || '' };
}

function averageRating(testimonials) {
  const ratings = testimonials.map((t) => Number(t.rating)).filter((r) => r > 0);
  return ratings.length ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : 0;
}

/** Testimonials hero, review grid, statistics and quote CTA. */
export default function TestimonialsSection({
  settings,
  testimonials = [],
  clients = [],
  id,
  headingAs: Heading = 'h2',
  className = '',
}) {
  const stats = STATS.map((stat) => ({ ...stat, value: statValue(settings, stat.key) })).filter((stat) => stat.value);
  const rating = averageRating(testimonials);

  return (
    <section id={id} aria-labelledby="testimonials-title" className={`space-y-4 lg:space-y-5 ${className}`}>
      <div className="relative isolate overflow-hidden rounded-panel border border-white/80 bg-surface shadow-neu-sm lg:grid lg:min-h-[19rem] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="relative z-10 p-5 sm:p-7 lg:py-9 lg:pl-9 lg:pr-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">{TESTIMONIALS_COPY.eyebrow}</p>
          <Heading
            id="testimonials-title"
            className="text-3xl sm:text-4xl lg:text-[2.2rem] xl:text-[2.5rem] font-bold leading-[1.18] tracking-tight text-ink"
          >
            {TESTIMONIALS_COPY.headingLine1}
            <br />
            <span className="text-brand">{TESTIMONIALS_COPY.headingHighlight}</span>
            {TESTIMONIALS_COPY.headingRest}
          </Heading>
          <span className="mt-5 block h-[3px] w-12 rounded-full bg-brand" aria-hidden />
          <p className="mt-5 max-w-md text-sm sm:text-[15px] leading-relaxed text-ink-muted">{TESTIMONIALS_COPY.intro}</p>
        </div>

        <div className="relative px-4 pb-5 sm:px-6 lg:static lg:p-0">
          <div className="relative h-56 sm:h-72 overflow-hidden rounded-card lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[60%] lg:rounded-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={COMPANY_VIDEO.poster}
              alt="ASVDF Flooring team finishing a concrete floor"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[50%_40%]"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-surface via-surface/60 to-transparent lg:block"
            />
          </div>

          <figure className="relative mx-auto -mt-14 w-[min(100%,21rem)] surface-raised shadow-neu-md rounded-card px-5 pb-5 pt-9 text-center sm:-mt-16 lg:absolute lg:right-8 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 xl:right-12 xl:w-[22rem]">
            <span className="icon-orb absolute -top-6 left-1/2 h-12 w-12 -translate-x-1/2">
              <Quote className="h-5 w-5 fill-current" strokeWidth={1.5} aria-hidden />
            </span>
            <blockquote>
              <p className="text-sm leading-relaxed text-ink">{TESTIMONIALS_COPY.statement}</p>
            </blockquote>
            <StarRating rating={rating} className="mt-4 justify-center" starClassName="h-[18px] w-[18px]" />
          </figure>
        </div>
      </div>

      <div>
        <h3 className="sr-only">{TESTIMONIALS_COPY.gridHeading}</h3>
        {testimonials.length ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {testimonials.map((testimonial) => (
              <li key={testimonial.id || testimonial.name} className="h-full">
                <TestimonialCard testimonial={testimonial} company={companyFor(testimonial, clients)} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="surface-raised shadow-neu-sm rounded-panel px-6 py-10 text-center text-sm text-ink-muted">
            {TESTIMONIALS_COPY.emptyText}
          </p>
        )}
      </div>

      <div className="grid gap-3 rounded-panel border border-white/80 bg-surface p-3 shadow-neu-sm lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-stretch">
        {stats.length ? (
          <dl className={`grid grid-cols-2 gap-y-5 px-2 py-4 sm:gap-y-0 sm:divide-x sm:divide-line ${STAT_COLUMNS[stats.length]}`}>
            {stats.map(({ key, label, icon: Icon, value }, index) => (
              <div
                key={key}
                className={`flex items-center gap-3 px-3 lg:justify-center ${
                  stats.length % 2 === 1 && index === stats.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <span className="icon-orb h-11 w-11">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="flex min-w-0 flex-col-reverse">
                  <dt className="mt-1 text-xs text-ink-muted">{label}</dt>
                  <dd className="text-xl sm:text-2xl font-bold leading-none text-ink">{value}</dd>
                </span>
              </div>
            ))}
          </dl>
        ) : (
          <span className="hidden lg:block" />
        )}

        <div className="flex items-center gap-4 rounded-card bg-gradient-to-br from-brand-highlight to-brand-strong p-5 sm:px-6 text-white shadow-brand">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]">
            <MessageSquareText className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-snug">{TESTIMONIALS_COPY.ctaHeading}</p>
            <p className="mt-1 text-xs sm:text-[13px] text-white/80">{TESTIMONIALS_COPY.ctaText}</p>
            <RequestQuoteLink className="group mt-3 inline-flex h-10 items-center gap-2 rounded-control bg-white px-4 text-sm font-semibold text-brand shadow-float transition-colors hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              {TESTIMONIALS_COPY.ctaButton}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </RequestQuoteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
