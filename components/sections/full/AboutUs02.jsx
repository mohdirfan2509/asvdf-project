'use client';

import React from 'react';
import { Building2, Users, Cog, ShieldCheck, Target } from 'lucide-react';
import SectionFrame from '@/components/layout/SectionFrame';
import { resolveIcon } from '@/lib/icons';

const MILESTONES = [
  { year: '2012', title: 'Company Founded', description: 'ASVDF Flooring established to deliver premium industrial floors.', icon: Building2 },
  { year: '2014', title: 'First Major Projects', description: 'Large-scale industrial flooring delivered for leading clients.', icon: Users },
  { year: '2017', title: 'Technology Upgrade', description: 'Advanced machinery and laser leveling added to the fleet.', icon: Cog },
  { year: '2020', title: 'Expanded Services', description: 'Specialized systems for diverse industries and heavier loads.', icon: ShieldCheck },
  { year: '2025', title: 'Pan-India Delivery', description: 'Serving industrial and commercial clients nationwide.', icon: Target },
];

const BG = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop';

export default function AboutUs02({ milestones = null }) {
  const source = milestones?.length ? milestones : MILESTONES;

  return (
    <SectionFrame
      eyebrow="Our Journey"
      title="Milestones that"
      highlight="define our growth."
      subtitle="From a focused start to trusted industrial flooring delivery across India."
      backgroundImage={BG}
      overlay="light"
    >
      <div className="h-full min-h-0 flex flex-col justify-center gap-4 sm:gap-6 overflow-y-auto">
        <div className="relative">
          <div className="hidden sm:block absolute top-8 left-[6%] right-[6%] h-px border-t border-dashed border-purple-300/80" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {source.map((m, idx) => {
              const Icon = resolveIcon(m.icon, Building2);
              return (
                <div key={m.id || idx} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white neu-sm flex items-center justify-center text-[#7C3AED] border border-white mb-2 sm:mb-3 relative z-10">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-lg sm:text-xl font-[800] text-[#7C3AED] leading-none mb-1">{m.year}</p>
                  <h3 className="text-xs sm:text-sm font-[700] text-slate-900 mb-1">{m.title}</h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-snug line-clamp-3">
                    {m.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
