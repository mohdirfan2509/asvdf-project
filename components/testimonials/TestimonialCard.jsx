import { Quote } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';

function initials(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

/** One review: quote, admin rating, customer and (when linked) the client company's logo or name. */
export default function TestimonialCard({ testimonial, company }) {
  const { quote, name, role, avatar, rating } = testimonial;

  return (
    <figure className="surface-raised shadow-neu-sm rounded-panel flex h-full flex-col p-5 sm:p-6 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-neu-md">
      <div className="flex items-start gap-4">
        <span className="icon-well h-11 w-11">
          <Quote className="h-4 w-4 fill-current" strokeWidth={1.5} aria-hidden />
        </span>
        <div className="min-w-0 pt-1">
          <blockquote>
            <p className="text-sm leading-relaxed text-ink">{quote}</p>
          </blockquote>
          <StarRating rating={rating} className="mt-3" />
        </div>
      </div>

      <figcaption className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="flex min-w-0 items-center gap-3">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-11 w-11 shrink-0 rounded-full object-cover object-top ring-2 ring-white shadow-neu-sm"
            />
          ) : (
            <span
              aria-hidden
              className="icon-well h-11 w-11 text-sm font-semibold"
            >
              {initials(name)}
            </span>
          )}
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-ink">{name}</span>
            {role ? <span className="block truncate text-xs text-ink-muted">{role}</span> : null}
          </span>
        </span>

        {company ? (
          <span className="flex h-12 w-[5.5rem] shrink-0 items-center justify-center rounded-card border border-white/80 bg-white px-2 shadow-neu-sm">
            {company.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={company.logo}
                alt={company.name}
                loading="lazy"
                decoding="async"
                className="max-h-7 max-w-full object-contain"
              />
            ) : (
              <span className="line-clamp-2 text-center text-[11px] font-bold leading-tight text-ink">{company.name}</span>
            )}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
