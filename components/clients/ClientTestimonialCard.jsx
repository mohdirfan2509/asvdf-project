import { Quote } from 'lucide-react';

export default function ClientTestimonialCard({ testimonial }) {
  if (!testimonial) return null;

  return (
    <figure className="surface-raised shadow-neu-sm rounded-panel flex h-full items-center gap-4 sm:gap-5 p-5 sm:p-7">
      <Quote className="h-8 w-8 shrink-0 self-start fill-current text-brand" aria-hidden />
      <div>
        <blockquote>
          <p className="text-sm sm:text-[15px] leading-relaxed text-ink-muted">{testimonial.quote}</p>
        </blockquote>
        <figcaption className="mt-3 text-sm font-semibold text-brand">
          — {[testimonial.name, testimonial.role].filter(Boolean).join(', ')}
        </figcaption>
      </div>
    </figure>
  );
}
