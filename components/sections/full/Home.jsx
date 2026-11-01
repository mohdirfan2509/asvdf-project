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
    <div>
      <div className="relative isolate overflow-hidden rounded-panel bg-slate-950 shadow-neu-md">
        <HeroVideo className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_60%]" />
        <div className="hero-scrim absolute inset-0 -z-10" aria-hidden />

        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32 min-h-[28rem] sm:min-h-[32rem] lg:min-h-[clamp(34rem,46vw,46rem)] flex flex-col justify-center">
          <div className="max-w-3xl">
            <p className="inline-flex items-center rounded-full border border-brand-light/40 bg-slate-950/30 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-brand-light mb-5 sm:mb-6">
              {badge}
            </p>
            <h1 className="text-[2.25rem] sm:text-5xl lg:text-[3.5rem] xl:text-[3.75rem] font-bold leading-[1.1] tracking-[-0.03em] text-white mb-5 [text-shadow:0_2px_18px_rgb(9_12_22/0.35)]">
              {h1}
              <br />
              {h2}
              <span className="text-brand-light">{highlight}</span>
            </h1>
            <p className="max-w-[37rem] text-base lg:text-lg leading-relaxed text-white/90 mb-8 [text-shadow:0_1px_12px_rgb(9_12_22/0.4)]">
              {subtext}
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/#services"
                className="group btn-primary h-12 px-6 text-[15px]"
              >
                {cta1}
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/#projects"
                className="group btn-secondary bg-white text-slate-900 hover:text-brand-solid shadow-float h-12 px-6 text-[15px]"
              >
                {cta2}
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-3 sm:px-8 lg:px-12 -mt-10 sm:-mt-14 lg:-mt-16">
        <HomeFeatures />
        <div className="mt-4 sm:mt-5 lg:mt-6">
          <HomeStats settings={settings} />
        </div>
      </div>
    </div>
  );
}
