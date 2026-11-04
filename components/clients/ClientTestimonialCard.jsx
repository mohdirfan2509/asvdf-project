import { Quote } from 'lucide-react';

export default function ClientTestimonialCard({ testimonial }) {
  if (!testimonial) return null;

  return (
    <figure className="surface-raised shadow-neu-sm rounded-panel flex h-full items-center gap-4 sm:gap-5 max-sm:gap-3 p-5 sm:p-7 max-sm:p-3.5 fit:px-6 fit:py-3.5">
      <Quote className="h-8 w-8 max-sm:h-6 max-sm:w-6 shrink-0 self-start fill-current text-brand" aria-hidden />
      <div>
        <blockquote>
          <p className="text-sm sm:text-[15px] max-sm:text-[13px] fit:text-sm leading-relaxed max-sm:leading-snug fit:leading-snug text-ink-muted">{testimonial.quote}</p>
        </blockquote>
        <figcaption className="mt-3 max-sm:mt-1.5 fit:mt-2 text-sm max-sm:text-xs font-semibold text-brand">
          — {[testimonial.name, testimonial.role].filter(Boolean).join(', ')}
        </figcaption>
      </div>
    </figure>
  );
}
