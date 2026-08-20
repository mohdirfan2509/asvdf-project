'use client';

import React from 'react';
import { ArrowRight, Briefcase, Building2, Clock, Shield } from 'lucide-react';
import SectionFrame from '@/components/layout/SectionFrame';

const DEFAULT = {
  badgeText: 'PREMIUM FLOORING SOLUTIONS',
  headingLine1: 'Stronger Floors.',
  headingLine2: 'Stronger ',
  headingHighlight: 'Foundations.',
  subtext:
    'High-performance flooring solutions for industrial, commercial and infrastructure projects. Built for durability. Designed to last.',
  bgImage: '/banner.png',
  ctaPrimary: 'Explore Our Services',
  ctaSecondary: 'View Our Projects',
};

const STATS_DEFAULT = [
  { key: 'stat_projects', value: '120+', label: 'Projects Completed', icon: Briefcase },
  { key: 'stat_industries', value: '8+', label: 'Industries Served', icon: Building2 },
  { key: 'stat_years', value: '12+', label: 'Years Experience', icon: Clock },
  { key: 'stat_sqft', value: '1M+', label: 'Sq.ft Delivered', icon: Shield },
];

export default function Home({ onNavigate, settings = null }) {
  const badge = settings?.hero_badge || DEFAULT.badgeText;
  const h1 = settings?.hero_heading_1 || DEFAULT.headingLine1;
  const h2 = settings?.hero_heading_2 || DEFAULT.headingLine2;
  const highlight = settings?.hero_highlight || DEFAULT.headingHighlight;
  const subtext = settings?.hero_subtext || DEFAULT.subtext;
  const bg = settings?.hero_image || DEFAULT.bgImage;
  const cta1 = settings?.cta_primary || DEFAULT.ctaPrimary;
  const cta2 = settings?.cta_secondary || DEFAULT.ctaSecondary;
  const stats = STATS_DEFAULT.map((s) => ({
    ...s,
    value: settings?.[s.key] || s.value,
  }));

  return (
    <SectionFrame backgroundImage={bg} overlay="dark" panel={false} className="!rounded-[1.25rem] sm:!rounded-[1.75rem] lg:!rounded-[2rem] border border-white/30 overflow-hidden">
      <div className="h-full min-h-0 flex flex-col justify-between gap-4">
        <div className="flex-1 min-h-0 flex flex-col justify-center max-w-3xl">
          <p className="text-xs sm:text-sm font-[700] tracking-[0.22em] text-purple-200 uppercase mb-3 sm:mb-4">
            {badge}
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-[800] tracking-[-0.045em] leading-[1.02] text-white mb-4 sm:mb-5 drop-shadow-lg">
            {h1}
            <br />
            {h2}
            <span className="bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#D8B4FE] bg-clip-text text-transparent">
              {highlight}
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-100/90 leading-relaxed mb-6 sm:mb-8 max-w-xl">
            {subtext}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate?.('Services')}
              className="inline-flex items-center gap-2 text-white text-sm font-[600] px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl neu-btn-primary"
            >
              {cta1}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('Projects')}
              className="inline-flex items-center gap-2 text-slate-900 text-sm font-[600] px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white/95 hover:bg-white shadow-lg"
            >
              {cta2}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="shrink-0 bg-white/95 backdrop-blur-md rounded-2xl px-3 sm:px-5 py-3 sm:py-4 border border-white/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F6F7FB] neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg sm:text-xl font-[800] text-[#7C3AED] leading-none">{stat.value}</p>
                    <p className="text-[10px] sm:text-[11px] font-[500] text-slate-500 mt-0.5 truncate">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
