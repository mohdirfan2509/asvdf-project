'use client';

import React from 'react';
import { Star } from 'lucide-react';
import SectionFrame from '@/components/layout/SectionFrame';
import QuadCarousel from '@/components/ui/QuadCarousel';

const TESTIMONIALS_DATA = [
  { id: 1, quote: 'ASVDF Flooring transformed our warehouse with high-performance flooring. The finish and durability exceeded expectations.', name: 'Rajesh Kumar', role: 'Operations Manager', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
  { id: 2, quote: 'Outstanding professionalism and attention to detail. Delivered on time with flawless execution.', name: 'Sneha Patil', role: 'Project Director', rating: 5, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop' },
  { id: 3, quote: 'Their VDF system handled our heavy forklift traffic with zero issues after years of use.', name: 'Amit Shah', role: 'Plant Head', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' },
  { id: 4, quote: 'Clean site management, skilled crew, and a floor that still looks new.', name: 'Priya Nair', role: 'Facilities Lead', rating: 5, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop' },
  { id: 5, quote: 'Best industrial flooring partner we have worked with across multiple sites.', name: 'Vikram Rao', role: 'Procurement Manager', rating: 5, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop' },
  { id: 6, quote: 'From quote to handover, communication was clear and quality was consistent.', name: 'Neha Gupta', role: 'Site Engineer', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop' },
  { id: 7, quote: 'Laser screed flatness made racking installation smoother than any previous project.', name: 'Karthik Menon', role: 'Logistics Director', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
  { id: 8, quote: 'Reliable timelines and a surface finish that impressed our auditors.', name: 'Ananya Iyer', role: 'Quality Head', rating: 5, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' },
];

const BG = 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop';

export default function Testimonials({ testimonials = null }) {
  const source = testimonials?.length
    ? testimonials.map((t) => ({
        id: t.id,
        quote: t.quote,
        name: t.name,
        role: t.role,
        rating: t.rating || 5,
        avatar: t.avatar,
      }))
    : TESTIMONIALS_DATA;

  return (
    <SectionFrame
      eyebrow="Testimonials"
      title="Voices that"
      highlight="trust our floors."
      backgroundImage={BG}
      overlay="light"
    >
      <QuadCarousel
        items={source}
        renderItem={(t) => (
          <article className="h-full min-h-[180px] bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex gap-0.5 text-[#7C3AED] mb-2.5">
                {[...Array(Number(t.rating) || 5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#7C3AED]" />
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-[500] line-clamp-5">
                “{t.quote}”
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'}
                alt={t.name || ''}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="text-sm font-[800] text-slate-900 truncate">{t.name}</p>
                <p className="text-xs text-slate-500 truncate">{t.role}</p>
              </div>
            </div>
          </article>
        )}
      />
    </SectionFrame>
  );
}
