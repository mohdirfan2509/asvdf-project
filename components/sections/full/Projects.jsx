'use client';

import React from 'react';
import { Briefcase, Building2 } from 'lucide-react';
import SectionFrame from '@/components/layout/SectionFrame';
import QuadCarousel from '@/components/ui/QuadCarousel';

const PROJECTS_DATA = [
  { id: 1, title: 'Manufacturing Plant Flooring', location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=900&auto=format&fit=crop' },
  { id: 2, title: 'Commercial Complex Flooring', location: 'Bengaluru', image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=900&auto=format&fit=crop' },
  { id: 3, title: 'Logistics Warehouse Flooring', location: 'Chennai', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=900&auto=format&fit=crop' },
  { id: 4, title: 'Automobile Unit Flooring', location: 'Pune', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop' },
  { id: 5, title: 'Retail Showroom Flooring', location: 'Mumbai', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=900&auto=format&fit=crop' },
  { id: 6, title: 'Cold Storage Flooring', location: 'Vijayawada', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=900&auto=format&fit=crop' },
  { id: 7, title: 'Parking Area Flooring', location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=900&auto=format&fit=crop' },
  { id: 8, title: 'Food Processing Unit Flooring', location: 'Coimbatore', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=900&auto=format&fit=crop' },
];

const BG = 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1600&auto=format&fit=crop';

export default function Projects({ projects = null, settings = null }) {
  const source = projects?.length ? projects : PROJECTS_DATA;

  const aside = (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <div className="bg-white/95 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 border border-white shadow-sm flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-[#F6F7FB] neu-inset flex items-center justify-center text-[#7C3AED]">
          <Briefcase className="w-4 h-4" />
        </div>
        <div>
          <p className="text-base sm:text-lg font-[800] text-slate-900 leading-none">
            {settings?.stat_projects || '120+'}
          </p>
          <p className="text-[10px] font-[500] text-slate-500">Projects Completed</p>
        </div>
      </div>
      <div className="bg-white/95 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 border border-white shadow-sm flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-[#F6F7FB] neu-inset flex items-center justify-center text-[#7C3AED]">
          <Building2 className="w-4 h-4" />
        </div>
        <div>
          <p className="text-base sm:text-lg font-[800] text-slate-900 leading-none">
            {settings?.stat_industries || '8+'}
          </p>
          <p className="text-[10px] font-[500] text-slate-500">Industries Served</p>
        </div>
      </div>
    </div>
  );

  return (
    <SectionFrame
      eyebrow="Projects"
      title="Floors that define"
      highlight="every space."
      subtitle="Industrial and commercial flooring delivered with precision — browse our recent work."
      backgroundImage={BG}
      overlay="light"
      headerAside={aside}
    >
      <QuadCarousel
        items={source}
        renderItem={(project) => (
          <article className="group relative h-full min-h-[160px] sm:min-h-[200px] rounded-2xl overflow-hidden shadow-md border border-white/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
              <h3 className="text-sm sm:text-base lg:text-lg font-[700] text-white leading-snug">
                {project.title}
              </h3>
              {project.location ? (
                <p className="text-xs text-white/75 mt-1">{project.location}</p>
              ) : null}
            </div>
          </article>
        )}
      />
    </SectionFrame>
  );
}
