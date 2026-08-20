'use client';

import React from 'react';
import { ArrowRight, Play, Award, Building2, Clock, Shield } from 'lucide-react';
import SectionFrame from '@/components/layout/SectionFrame';

export default function AboutUs01A({ onNavigate, about = null, settings = null }) {
  const headline = about?.headline || 'Building Stronger Foundations.';
  const body =
    about?.body ||
    'ASVDF Flooring specializes in high-performance VDF and industrial flooring systems. We combine modern machinery, skilled teams, and strict quality control to deliver floors that last.';
  const image =
    about?.image ||
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1400&auto=format&fit=crop';

  const stats = [
    { value: settings?.stat_projects || '120+', label: 'Projects Completed', icon: Award },
    { value: settings?.stat_industries || '8+', label: 'Industries Served', icon: Building2 },
    { value: settings?.stat_years || '12+', label: 'Years Experience', icon: Clock },
    { value: settings?.stat_sqft || '1M+', label: 'Sq.ft Delivered', icon: Shield },
  ];

  return (
    <SectionFrame backgroundImage={image} overlay="light" panel>
      <div className="h-full min-h-0 flex flex-col justify-between gap-4">
        <div className="flex-1 min-h-0 flex flex-col justify-center max-w-2xl">
          <p className="text-xs font-[700] tracking-[0.2em] text-[#7C3AED] uppercase mb-2 sm:mb-3">
            About ASVDF
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-[800] tracking-[-0.04em] leading-[1.05] text-slate-900 mb-3 sm:mb-4">
            {headline}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8">
            {body}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate?.('Contact Us')}
              className="inline-flex items-center gap-2 text-white text-sm font-[600] px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl neu-btn-primary"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('Milestones')}
              className="inline-flex items-center gap-2 text-slate-800 text-sm font-[600] px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white/90 border border-slate-200"
            >
              <Play className="w-3.5 h-3.5 fill-slate-800" />
              Our Journey
            </button>
          </div>
        </div>

        <div className="shrink-0 bg-white/95 rounded-2xl p-3 sm:p-4 border border-white shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
