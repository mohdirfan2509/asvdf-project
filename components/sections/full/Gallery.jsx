'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import SectionFrame from '@/components/layout/SectionFrame';
import QuadCarousel from '@/components/ui/QuadCarousel';

const GALLERY_IMAGES = [
  { id: 1, title: 'Industrial warehouse floor', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, title: 'Commercial atrium', image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1000&auto=format&fit=crop' },
  { id: 3, title: 'Logistics facility', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop' },
  { id: 4, title: 'Retail space', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop' },
  { id: 5, title: 'Parking deck', image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1000&auto=format&fit=crop' },
  { id: 6, title: 'Cold storage bay', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1000&auto=format&fit=crop' },
  { id: 7, title: 'Power trowel finish', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop' },
  { id: 8, title: 'Polished concrete', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop' },
  { id: 9, title: 'Factory production floor', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop' },
  { id: 10, title: 'Loading bay', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop' },
  { id: 11, title: 'Showroom finish', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1000&auto=format&fit=crop' },
  { id: 12, title: 'Heavy-duty slab', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop' },
];

const BG = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop';

export default function Gallery({ images = null }) {
  const [lightbox, setLightbox] = useState(null);
  const source = images?.length
    ? images.map((img) => ({ id: img.id, title: img.title || 'Project photo', image: img.image }))
    : GALLERY_IMAGES;

  return (
    <>
      <SectionFrame
        eyebrow="Gallery"
        title="Excellence in"
        highlight="every detail."
        subtitle="A closer look at finished floors across industrial and commercial sites."
        backgroundImage={BG}
        overlay="dark"
      >
        <QuadCarousel
          items={source}
          renderItem={(item) => (
            <button
              type="button"
              onClick={() => setLightbox(item)}
              className="group relative h-full min-h-[160px] sm:min-h-[200px] rounded-2xl overflow-hidden text-left border border-white/20 w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <p className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-sm sm:text-base font-[700] text-white">
                {item.title}
              </p>
            </button>
          )}
        />
      </SectionFrame>

      {lightbox && (
        <div
          className="fixed inset-0 z-[80] bg-slate-950/85 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="presentation"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.image}
            alt={lightbox.title}
            className="max-h-[85vh] max-w-[95vw] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
