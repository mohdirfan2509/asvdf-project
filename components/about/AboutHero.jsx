import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import StoryVideoButton from '@/components/about/StoryVideoButton';

export default function AboutHero({ copy, image, headingAs: Heading = 'h1', headingId }) {
  return (
    <div className="grid items-center gap-8 max-sm:gap-4 lg:grid-cols-2 lg:gap-10 xl:gap-14">
      <div>
        <p className="mb-3 max-sm:mb-1 text-xs max-sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">{copy.eyebrow}</p>
        <Heading
          id={headingId}
          className="text-3xl sm:text-4xl max-sm:text-[1.45rem] lg:text-[2.3rem] xl:text-[2.6rem] fit:text-[2.2rem] font-bold leading-[1.15] max-sm:leading-[1.25] tracking-tight text-ink"
        >
          {copy.h1Line1}
          <br />
          {copy.h1Line2}
          <span className="text-brand">{copy.h1Highlight}</span>
        </Heading>
        <span className="mt-5 max-sm:mt-3 fit:mt-4 block h-[3px] w-12 rounded-full bg-brand" aria-hidden />
        <div className="mt-5 max-sm:mt-3 fit:mt-4 max-w-xl space-y-3 max-sm:space-y-2 text-sm sm:text-[15px] max-sm:text-[13px] leading-relaxed max-sm:leading-snug text-ink-muted">
          {copy.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-7 max-sm:mt-4 fit:mt-5 flex flex-wrap max-sm:flex-nowrap max-[359px]:flex-wrap items-center gap-3 sm:gap-4 max-sm:gap-2">
          <Link href="/#contact" className="group btn-primary h-12 max-sm:h-10 px-6 max-sm:px-4 text-sm max-sm:text-[13px] max-sm:whitespace-nowrap">
            Request a Quote
            <ArrowRight className="h-4 w-4 max-sm:hidden transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <StoryVideoButton />
        </div>
      </div>

      <figure className="relative">
        <div className="relative aspect-[4/3] sm:aspect-[16/10] max-sm:aspect-[16/9] fit:aspect-[16/9] overflow-hidden rounded-panel bg-surface-sunken shadow-neu-md">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt="Industrial warehouse with a polished concrete floor"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          ) : null}
        </div>
        <figcaption className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 max-sm:bottom-2 max-sm:left-2 flex max-w-[15.5rem] max-sm:max-w-[13rem] items-start max-sm:items-center gap-3 max-sm:gap-2 surface-raised shadow-float rounded-card p-3.5 sm:p-4 max-sm:p-2">
          <span className="icon-well h-10 w-10 sm:h-11 sm:w-11 max-sm:h-8 max-sm:w-8">
            <Star className="h-[18px] w-[18px] max-sm:h-4 max-sm:w-4" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-sm sm:text-base max-sm:text-[13px] font-semibold leading-snug text-ink">{copy.badgeTitle}</span>
            <span className="mt-1 max-sm:mt-0 block text-xs max-sm:text-[11px] leading-relaxed max-sm:leading-snug text-ink-muted">{copy.badgeText}</span>
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
