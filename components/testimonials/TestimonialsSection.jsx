import { ArrowRight, Award, MessageSquareText, Quote, ShieldCheck, Star, Users } from 'lucide-react';
import RequestQuoteLink from '@/components/contact/RequestQuoteLink';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import CountUp from '@/components/ui/CountUp';
import Marquee from '@/components/ui/Marquee';
import StarRating from '@/components/ui/StarRating';
import { TESTIMONIALS_HERO_IMAGE } from '@/lib/content/media';
import { TESTIMONIALS_COPY } from '@/lib/seo/page-content';
import { statValue } from '@/lib/stats';

const STATS = [
  { key: 'stat_clients', label: 'Happy Clients', icon: Users },
  { key: 'stat_projects', label: 'Projects Completed', icon: Star },
  { key: 'stat_satisfaction', label: 'Client Satisfaction', icon: ShieldCheck },
  { key: 'stat_years', label: 'Years of Excellence', icon: Award },
];

const STAT_COLUMNS = { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4' };
const PHONE_STAT_COLUMNS = { 1: 'max-sm:grid-cols-1', 2: 'max-sm:grid-cols-2', 3: 'max-sm:grid-cols-3', 4: 'max-sm:grid-cols-4' };

function averageRating(reviews) {
  const ratings = reviews.map((review) => Number(review.rating)).filter((r) => r > 0);
  return ratings.length ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : 0;
}

/** Testimonials hero, hard-coded review marquee, statistics and quote CTA. */
export default function TestimonialsSection({ settings, id, headingAs: Heading = 'h2', className = '' }) {
  const testimonials = TESTIMONIALS_COPY.reviews;
  const stats = STATS.map((stat) => ({ ...stat, value: statValue(settings, stat.key) })).filter((stat) => stat.value);
  const rating = averageRating(testimonials);

  return (
    <section id={id} aria-labelledby="testimonials-title" className={`space-y-4 lg:space-y-5 max-sm:space-y-3 fit:space-y-4 ${className}`}>
      <div className="relative isolate overflow-hidden rounded-panel border border-edge bg-surface shadow-neu-sm lg:grid lg:min-h-[19rem] fit:min-h-[16rem] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="relative z-10 p-5 sm:p-7 max-sm:p-3.5 lg:py-9 lg:pl-9 lg:pr-4 fit:py-7">
          <p className="mb-2 max-sm:mb-1 text-xs max-sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">{TESTIMONIALS_COPY.eyebrow}</p>
          <Heading
            id="testimonials-title"
            className="text-3xl sm:text-4xl max-sm:text-[1.45rem] lg:text-[2.2rem] xl:text-[2.5rem] fit:text-[2.1rem] font-bold leading-[1.18] max-sm:leading-[1.25] tracking-tight text-ink"
          >
            {TESTIMONIALS_COPY.headingLine1}
            <br />
            <span className="text-brand">{TESTIMONIALS_COPY.headingHighlight}</span>
            {TESTIMONIALS_COPY.headingRest}
          </Heading>
          <span className="mt-5 max-sm:mt-2.5 fit:mt-4 block h-[3px] w-12 rounded-full bg-brand" aria-hidden />
          <p className="mt-5 max-sm:mt-2.5 fit:mt-4 max-w-md text-sm sm:text-[15px] max-sm:text-[13px] leading-relaxed max-sm:leading-snug text-ink-muted">{TESTIMONIALS_COPY.intro}</p>
        </div>

        <div className="relative px-4 pb-5 sm:px-6 max-sm:px-3 max-sm:pb-3.5 lg:static lg:p-0">
          <div className="relative h-56 sm:h-72 max-sm:h-36 overflow-hidden rounded-card lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[60%] lg:rounded-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={TESTIMONIALS_HERO_IMAGE}
              alt="Warehouse aisle with a polished industrial concrete floor"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-surface via-surface/60 to-transparent lg:block"
            />
          </div>

          <figure className="relative mx-auto -mt-14 max-sm:-mt-10 w-[min(100%,21rem)] max-sm:w-[min(100%,19rem)] surface-raised shadow-neu-md rounded-card px-5 pb-5 pt-9 max-sm:px-4 max-sm:pb-3 max-sm:pt-7 text-center sm:-mt-16 lg:absolute lg:right-8 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 xl:right-12 xl:w-[22rem]">
            <span className="icon-orb absolute -top-6 max-sm:-top-5 left-1/2 h-12 w-12 max-sm:h-10 max-sm:w-10 -translate-x-1/2">
              <Quote className="h-5 w-5 max-sm:h-4 max-sm:w-4 fill-current" strokeWidth={1.5} aria-hidden />
            </span>
            <blockquote>
              <p className="text-sm max-sm:text-[13px] leading-relaxed max-sm:leading-snug text-ink">{TESTIMONIALS_COPY.statement}</p>
            </blockquote>
            <StarRating rating={rating} className="mt-4 max-sm:mt-2 justify-center" starClassName="h-[18px] w-[18px] max-sm:h-4 max-sm:w-4" />
          </figure>
        </div>
      </div>

      <div>
        <h3 className="sr-only">{TESTIMONIALS_COPY.gridHeading}</h3>
        {testimonials.length ? (
          <Marquee
            items={testimonials}
            getKey={(testimonial) => testimonial.id || testimonial.name}
            renderItem={(testimonial) => (
              <div className="h-full w-[min(19rem,calc(100vw-4rem))] max-sm:w-[min(16rem,calc(100vw-5rem))] sm:w-[22rem]">
                <TestimonialCard testimonial={testimonial} />
              </div>
            )}
            duration={Math.max(45, testimonials.length * 15)}
            minItems={6}
            label={TESTIMONIALS_COPY.gridHeading}
            className="-my-3"
          />
        ) : (
          <p className="surface-raised shadow-neu-sm rounded-panel px-6 py-10 text-center text-sm text-ink-muted">
            {TESTIMONIALS_COPY.emptyText}
          </p>
        )}
      </div>

      <div className="grid gap-3 max-sm:gap-2 rounded-panel border border-edge bg-surface p-3 max-sm:p-2 shadow-neu-sm lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-stretch">
        {stats.length ? (
          <dl
            className={`grid grid-cols-2 gap-y-5 px-2 py-4 fit:py-3 sm:gap-y-0 sm:divide-x sm:divide-line max-sm:gap-y-0 max-sm:px-0 max-sm:py-2 max-sm:divide-x max-sm:divide-line ${STAT_COLUMNS[stats.length]} ${PHONE_STAT_COLUMNS[stats.length]}`}
          >
            {stats.map(({ key, label, icon: Icon, value }, index) => (
              <div
                key={key}
                className={`flex items-center gap-3 px-3 lg:justify-center max-sm:flex-col max-sm:justify-center max-sm:gap-0 max-sm:px-1 max-sm:text-center ${
                  stats.length % 2 === 1 && index === stats.length - 1 ? 'col-span-2 sm:col-span-1 max-sm:col-span-1' : ''
                }`}
              >
                <span className="icon-orb h-11 w-11 max-sm:hidden">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="flex min-w-0 flex-col-reverse">
                  <dt className="mt-1 text-xs max-sm:text-[10.5px] max-sm:leading-tight text-ink-muted">{label}</dt>
                  <dd className="text-xl sm:text-2xl max-sm:text-lg font-bold leading-none text-ink">
                    <CountUp value={value} />
                  </dd>
                </span>
              </div>
            ))}
          </dl>
        ) : (
          <span className="hidden lg:block" />
        )}

        <div className="flex items-center gap-4 max-sm:gap-3 rounded-card bg-gradient-to-br from-brand-highlight to-brand-strong p-5 sm:px-6 max-sm:p-3.5 text-white shadow-brand">
          <span className="inline-flex h-12 w-12 max-sm:h-10 max-sm:w-10 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]">
            <MessageSquareText className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] max-sm:text-sm font-semibold leading-snug">{TESTIMONIALS_COPY.ctaHeading}</p>
            <p className="mt-1 max-sm:mt-0.5 text-xs sm:text-[13px] text-white/80">{TESTIMONIALS_COPY.ctaText}</p>
            <RequestQuoteLink className="group mt-3 max-sm:mt-2 inline-flex h-10 max-sm:h-9 max-sm:text-[13px] items-center gap-2 rounded-control bg-white px-4 text-sm font-semibold text-brand-solid shadow-float transition-colors hover:bg-brand-soft dark:hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              {TESTIMONIALS_COPY.ctaButton}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </RequestQuoteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
