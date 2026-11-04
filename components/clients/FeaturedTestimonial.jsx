import { Quote } from 'lucide-react';

export default function FeaturedTestimonial({ testimonial, image }) {
  return (
    <figure className="relative isolate flex min-h-[18rem] sm:min-h-[20rem] max-sm:min-h-0 fit:min-h-[15rem] h-full overflow-hidden rounded-panel bg-slate-950 shadow-neu-md">
      {/* From sm the photo is enlarged from its left edge so its subject (right side) clears the quote text. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[72%_center] sm:origin-left sm:scale-[1.3]"
      />
      <div className="hero-scrim absolute inset-0 -z-10" aria-hidden />

      {testimonial ? (
        <div className="flex max-w-lg flex-col justify-center p-6 sm:p-8 max-sm:px-4 max-sm:py-4 lg:max-w-[26rem] lg:p-10 fit:max-w-[28rem] fit:px-8 fit:py-6">
          <Quote className="h-9 w-9 max-sm:h-6 max-sm:w-6 fit:h-7 fit:w-7 fill-current text-brand-highlight" aria-hidden />
          <blockquote className="mt-4 max-sm:mt-2 fit:mt-2.5">
            <p className="text-lg sm:text-xl max-sm:text-[15px] lg:text-[1.35rem] fit:text-[1.15rem] font-medium leading-relaxed max-sm:leading-snug fit:leading-snug text-white">
              {testimonial.quote}
            </p>
          </blockquote>
          <span className="my-5 max-sm:my-2.5 fit:my-3 block h-px w-24 bg-white/30" aria-hidden />
          <figcaption className="text-sm max-sm:text-xs leading-relaxed max-sm:leading-snug fit:leading-snug text-white/80">
            — {testimonial.name}
            {testimonial.role ? <span className="block">{testimonial.role}</span> : null}
          </figcaption>
        </div>
      ) : null}
    </figure>
  );
}
