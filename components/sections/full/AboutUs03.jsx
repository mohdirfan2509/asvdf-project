'use client';

import React from 'react';
import { ShieldCheck, Award, HardHat, Lightbulb, Handshake, Users } from 'lucide-react';
import SectionFrame from '@/components/layout/SectionFrame';
import { resolveIcon } from '@/lib/icons';

const CORE_VALUES = [
  { title: 'Integrity', description: 'We conduct business with honesty and transparency.', icon: ShieldCheck },
  { title: 'Quality', description: 'We never compromise on materials or workmanship.', icon: Award },
  { title: 'Safety', description: 'Safety first on every site and every shift.', icon: HardHat },
  { title: 'Innovation', description: 'Modern methods for better floors and faster delivery.', icon: Lightbulb },
  { title: 'Commitment', description: 'Long-term partnerships built on reliable delivery.', icon: Handshake },
  { title: 'Teamwork', description: 'Skilled crews aligned around one standard of excellence.', icon: Users },
];

const BG = 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop';

export default function AboutUs03({ values = null }) {
  const source = values?.length ? values : CORE_VALUES;

  return (
    <SectionFrame
      eyebrow="Core Values"
      title="Principles that"
      highlight="drive everything we do."
      subtitle="Our values shape how we plan, pour, finish, and stand behind every floor."
      backgroundImage={BG}
      overlay="light"
    >
      <div className="h-full min-h-0 overflow-y-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-4 h-full content-center">
          {source.map((val, idx) => {
            const Icon = resolveIcon(val.icon, ShieldCheck);
            return (
              <div
                key={val.id || idx}
                className="bg-white/95 rounded-2xl p-3.5 sm:p-5 border border-slate-100 shadow-sm flex flex-col items-center text-center min-h-[140px] sm:min-h-[160px] justify-center"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F6F7FB] neu-sm flex items-center justify-center text-[#7C3AED] mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-[800] text-slate-900 mb-1">{val.title}</h3>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">{val.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </SectionFrame>
  );
}
