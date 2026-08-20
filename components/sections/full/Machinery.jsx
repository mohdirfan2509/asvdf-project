'use client';

import React from 'react';
import SectionFrame from '@/components/layout/SectionFrame';
import QuadCarousel from '@/components/ui/QuadCarousel';

const MACHINERY_FLEET = [
  { id: 1, title: 'Ride-On Power Trowel', description: 'High-efficiency finishing for large-scale slabs.', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop' },
  { id: 2, title: 'Laser Screed', description: 'Laser-guided leveling for precision flatness.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=900&auto=format&fit=crop' },
  { id: 3, title: 'Vacuum Dewatering Unit', description: 'Removes excess water for denser VDF floors.', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=900&auto=format&fit=crop' },
  { id: 4, title: 'Concrete Grinder', description: 'Surface preparation and polishing for a refined finish.', image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=900&auto=format&fit=crop' },
  { id: 5, title: 'Joint Cutter', description: 'Controlled cutting to manage cracks and joints.', image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=900&auto=format&fit=crop' },
  { id: 6, title: 'Floor Hardener Spreader', description: 'Even application for abrasion-resistant surfaces.', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=900&auto=format&fit=crop' },
  { id: 7, title: 'Ride-On Screed', description: 'Faster placement with consistent levels.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=900&auto=format&fit=crop' },
  { id: 8, title: 'Polishing Machine', description: 'Delivers smooth, reflective concrete finishes.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900&auto=format&fit=crop' },
];

const BG = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop';

export default function Machinery({ machinery = null }) {
  const source = machinery?.length
    ? machinery.map((m) => ({
        id: m.id,
        title: m.title || m.name,
        description: m.description || m.specs || '',
        image: m.image,
      }))
    : MACHINERY_FLEET;

  return (
    <SectionFrame
      eyebrow="Machinery"
      title="Equipment that"
      highlight="powers precision."
      backgroundImage={BG}
      overlay="light"
    >
      <QuadCarousel
        items={source}
        renderItem={(m) => (
          <article className="h-full min-h-[200px] rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm flex flex-col">
            <div className="h-[40%] min-h-[100px] overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3.5 sm:p-4 flex-1 min-h-0">
              <h3 className="text-base sm:text-lg font-[800] text-slate-900 mb-1">{m.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">{m.description}</p>
            </div>
          </article>
        )}
      />
    </SectionFrame>
  );
}
