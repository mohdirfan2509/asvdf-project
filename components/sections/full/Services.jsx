'use client';

import React from 'react';
import SectionFrame from '@/components/layout/SectionFrame';
import QuadCarousel from '@/components/ui/QuadCarousel';

const SERVICES_DATA = [
  { id: 1, title: 'VDF Flooring', description: 'High-strength vacuum dewatered floors built for heavy industrial use.', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=900&auto=format&fit=crop' },
  { id: 2, title: 'FM2 Laser Concrete', description: 'Precision laser-levelled slabs for flatness and seamless finish.', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop' },
  { id: 3, title: 'Laser Screed Flooring', description: 'Advanced screed technology for level, durable concrete floors.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=900&auto=format&fit=crop' },
  { id: 4, title: 'Epoxy Flooring', description: 'Seamless, chemical-resistant systems for plants and warehouses.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=900&auto=format&fit=crop' },
  { id: 5, title: 'Floor Hardener', description: 'Surface hardening for abrasion resistance in high-traffic zones.', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=900&auto=format&fit=crop' },
  { id: 6, title: 'Grinding & Polishing', description: 'Smooth polished concrete with lasting aesthetics and durability.', image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=900&auto=format&fit=crop' },
  { id: 7, title: 'Joint Filling', description: 'Precision cutting and joint work to control cracks and extend life.', image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=900&auto=format&fit=crop' },
  { id: 8, title: 'Repair & Restoration', description: 'Restore damaged concrete for safety, strength, and longevity.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=900&auto=format&fit=crop' },
];

const BG = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop';

export default function Services({ services = null }) {
  const source = services?.length
    ? services.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description || '',
        image: s.image || SERVICES_DATA[0].image,
      }))
    : SERVICES_DATA;

  return (
    <SectionFrame
      eyebrow="Services"
      title="Flooring systems"
      highlight="built to perform."
      subtitle="From VDF to epoxy — solutions matched to your site, load, and timeline."
      backgroundImage={BG}
      overlay="light"
    >
      <QuadCarousel
        items={source}
        renderItem={(service) => (
          <article className="group h-full min-h-[200px] rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm flex flex-col">
            <div className="relative h-[38%] min-h-[100px] overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 min-h-0 p-3.5 sm:p-4 flex flex-col">
              <h3 className="text-base sm:text-lg font-[800] text-slate-900 leading-snug mb-1.5">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                {service.description}
              </p>
            </div>
          </article>
        )}
      />
    </SectionFrame>
  );
}
