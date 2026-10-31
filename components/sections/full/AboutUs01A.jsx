'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Award, Building2, Clock, Shield } from 'lucide-react';
import SectionFrame from '@/components/layout/SectionFrame';
import { statValue } from '@/lib/stats';

export default function AboutUs01A({ onNavigate, about = null, settings = null }) {
  const headline = about?.headline || 'Building Stronger Foundations.';
  const body =
    about?.body ||
    'ASVDF Flooring specializes in high-performance VDF and industrial flooring systems. We combine modern machinery, skilled teams, and strict quality control to deliver floors that last.';
  const image =
    about?.image ||
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1400&auto=format&fit=crop';

  const stats = [
    { value: statValue(settings, 'stat_projects'), label: 'Projects Completed', icon: Award },
    { value: statValue(settings, 'stat_industries'), label: 'Industries Served', icon: Building2 },
    { value: statValue(settings, 'stat_years'), label: 'Years Experience', icon: Clock },
    { value: statValue(settings, 'stat_sqft'), label: 'Sq.ft Delivered', icon: Shield },
  ];

  return (
    <SectionFrame backgroundImage={image} overlay="light" panel>
      <div className="h-full min-h-0 flex flex-col justify-between gap-4">
        <div className="flex-1 min-h-0 flex flex-col justify-center max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase mb-2 sm:mb-3">
            About ASVDF
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.08] text-ink mb-3 sm:mb-4">
            {headline}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-ink-muted leading-relaxed mb-6 sm:mb-8">
            {body}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="btn-primary text-sm px-5 sm:px-6 py-3 sm:py-3.5"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => onNavigate?.('Milestones')}
              className="btn-secondary text-sm px-5 sm:px-6 py-3 sm:py-3.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Our Journey
            </button>
          </div>
        </div>

        <div className="shrink-0 bg-surface-raised rounded-card p-3 sm:p-4 border border-white/80 shadow-neu-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2.5 sm:gap-3">
                  <span className="icon-well w-9 h-9 sm:w-10 sm:h-10">
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-lg sm:text-xl font-bold text-brand leading-none">{stat.value}</p>
                    <p className="text-[11px] font-medium text-ink-muted mt-0.5 truncate">
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
