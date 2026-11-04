import { Quote } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';

/** One review: quote, rating, then the customer's name and "Position at Company". */
export default function TestimonialCard({ testimonial }) {
  const { quote, name, role, rating } = testimonial;

  return (
    <figure className="surface-raised shadow-neu-sm rounded-panel flex h-full flex-col p-5 sm:p-6 max-sm:p-3.5 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-neu-md">
      <div className="flex items-start gap-4 max-sm:gap-3">
        <span className="icon-well h-11 w-11 max-sm:h-9 max-sm:w-9">
          <Quote className="h-4 w-4 max-sm:h-3.5 max-sm:w-3.5 fill-current" strokeWidth={1.5} aria-hidden />
        </span>
        <div className="min-w-0 pt-1 max-sm:pt-0.5">
          <blockquote>
            <p className="text-sm max-sm:text-[13px] leading-relaxed max-sm:leading-snug text-ink">{quote}</p>
          </blockquote>
          <StarRating rating={rating} className="mt-3 max-sm:mt-2" />
        </div>
      </div>

      {/* Indented by the quote icon's width + gap so it lines up with the review text. */}
      <figcaption className="mt-auto min-h-11 max-sm:min-h-0 pl-15 max-sm:pl-12 pt-5 max-sm:pt-2.5">
        <span className="block text-sm max-sm:text-[13px] font-semibold text-ink">{name}</span>
        {role ? <span className="mt-0.5 block text-xs max-sm:text-[11px] leading-snug text-ink-muted">{role}</span> : null}
      </figcaption>
    </figure>
  );
}
