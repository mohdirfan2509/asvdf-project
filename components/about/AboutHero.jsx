import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import StoryVideoButton from '@/components/about/StoryVideoButton';

export default function AboutHero({ copy, image, headingAs: Heading = 'h1', headingId }) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand">{copy.eyebrow}</p>
        <Heading
          id={headingId}
          className="text-3xl sm:text-4xl lg:text-[2.3rem] xl:text-[2.6rem] font-bold leading-[1.15] tracking-tight text-ink"
        >
          {copy.h1Line1}
          <br />
          {copy.h1Line2}
          <span className="text-brand">{copy.h1Highlight}</span>
        </Heading>
        <span className="mt-5 block h-[3px] w-12 rounded-full bg-brand" aria-hidden />
        <div className="mt-5 max-w-xl space-y-3 text-sm sm:text-[15px] leading-relaxed text-ink-muted">
          {copy.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
          <Link href="/#contact" className="group btn-primary h-12 px-6 text-sm">
            Request a Quote
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <StoryVideoButton />
        </div>
      </div>

      <figure className="relative">
        <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-panel bg-surface-sunken shadow-neu-md">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt="Industrial flooring by ASVDF Flooring"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          ) : null}
        </div>
        <figcaption className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 flex max-w-[15.5rem] items-start gap-3 surface-raised shadow-float rounded-card p-3.5 sm:p-4">
          <span className="icon-well h-10 w-10 sm:h-11 sm:w-11">
            <Star className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-sm sm:text-base font-semibold leading-snug text-ink">{copy.badgeTitle}</span>
            <span className="mt-1 block text-xs leading-relaxed text-ink-muted">{copy.badgeText}</span>
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
