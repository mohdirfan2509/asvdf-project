'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroVideo from '@/components/sections/full/HeroVideo';
import HomeFeatures from '@/components/sections/full/HomeFeatures';
import HomeStats from '@/components/sections/full/HomeStats';
import { HOME_HERO_COPY } from '@/lib/seo/page-content';

export default function Home({ settings = null }) {
  const {
    badge,
    headingLine1: h1,
    headingLine2: h2,
    headingHighlight: highlight,
    subtext,
    ctaPrimary: cta1,
    ctaSecondary: cta2,
  } = HOME_HERO_COPY;

  return (
    <div className="home-fit">
      <div className="home-fit__hero relative isolate overflow-hidden rounded-panel bg-slate-950 shadow-neu-md">
        <HeroVideo className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_60%]" />
        <div className="hero-scrim absolute inset-0 -z-10" aria-hidden />

        <div className="home-fit__content mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32 max-sm:px-4 max-sm:pt-9 max-sm:pb-16 min-h-[28rem] sm:min-h-[32rem] max-sm:min-h-[22rem] lg:min-h-[clamp(34rem,46vw,46rem)] flex flex-col justify-center">
          <div className="max-w-3xl max-sm:mx-auto max-sm:w-full max-sm:min-w-0 max-sm:text-center">
            <h1 className="home-fit__badge inline-flex items-center rounded-full border border-brand-light/40 bg-slate-950/30 px-3.5 py-1.5 max-sm:px-3 max-sm:py-1 text-[11px] sm:text-xs max-sm:text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-light mb-5 sm:mb-6 max-sm:mb-4">
              {badge}
            </h1>
            <p className="home-fit__title text-[2.25rem] sm:text-5xl max-sm:text-[1.75rem] lg:text-[3.5rem] xl:text-[3.75rem] font-bold leading-[1.1] max-sm:leading-[1.15] tracking-[-0.03em] text-white mb-5 max-sm:mb-3 [text-shadow:0_2px_18px_rgb(9_12_22/0.35)]">
              {h1}
              <br />
              {h2}
              <span className="text-brand-light">{highlight}</span>
            </p>
            <p className="home-fit__text max-w-[37rem] max-sm:mx-auto max-sm:max-w-[22rem] text-base max-sm:text-[13px] lg:text-lg leading-relaxed text-white/90 mb-8 max-sm:mb-5 [text-shadow:0_1px_12px_rgb(9_12_22/0.4)]">
              {subtext}
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 max-sm:mx-auto max-sm:grid max-sm:max-w-[22rem] max-sm:grid-cols-2 max-[339px]:grid-cols-1 max-sm:gap-2">
              <Link
                href="/#services"
                className="home-fit__button group btn-primary h-12 px-6 text-[15px] max-sm:h-10 max-sm:min-w-0 max-sm:px-2 max-sm:text-[clamp(11px,3.4vw,13px)] max-sm:whitespace-nowrap"
              >
                {cta1}
                <ArrowRight className="w-4 h-4 max-sm:hidden transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/#projects"
                className="home-fit__button group btn-secondary bg-white text-slate-900 hover:text-brand-solid shadow-float h-12 px-6 text-[15px] max-sm:h-10 max-sm:min-w-0 max-sm:px-2 max-sm:text-[clamp(11px,3.4vw,13px)] max-sm:whitespace-nowrap"
              >
                {cta2}
                <ArrowRight className="w-4 h-4 max-sm:hidden transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="home-fit__cards relative z-10 mx-auto w-full max-w-[1440px] px-3 sm:px-8 lg:px-12 -mt-10 sm:-mt-14 lg:-mt-16">
        <HomeFeatures />
        <div className="home-fit__gap mt-4 sm:mt-5 lg:mt-6">
          <HomeStats settings={settings} />
        </div>
      </div>
    </div>
  );
}
