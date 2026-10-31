import { Quote } from 'lucide-react';

export default function FeaturedTestimonial({ testimonial, image }) {
  return (
    <figure className="relative isolate flex min-h-[18rem] sm:min-h-[20rem] h-full overflow-hidden rounded-panel bg-slate-950 shadow-neu-md">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      <div className="hero-scrim absolute inset-0 -z-10" aria-hidden />

      {testimonial ? (
        <div className="flex max-w-lg flex-col justify-center p-6 sm:p-8 lg:p-10">
          <Quote className="h-9 w-9 fill-current text-brand-highlight" aria-hidden />
          <blockquote className="mt-4">
            <p className="text-lg sm:text-xl lg:text-[1.35rem] font-medium leading-relaxed text-white">
              {testimonial.quote}
            </p>
          </blockquote>
          <span className="my-5 block h-px w-24 bg-white/30" aria-hidden />
          <figcaption className="text-sm leading-relaxed text-white/80">
            — {testimonial.name}
            {testimonial.role ? <span className="block">{testimonial.role}</span> : null}
          </figcaption>
        </div>
      ) : null}
    </figure>
  );
}
