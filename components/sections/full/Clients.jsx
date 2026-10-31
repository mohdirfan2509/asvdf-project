'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionFrame from '@/components/layout/SectionFrame';
import { CLIENTS_BACKGROUND_IMAGE } from '@/lib/content/media';

const CLIENT_LOGOS = [
  'TATA Projects', 'L&T', 'Adani', 'JSW', 'DHL', 'Godrej',
  'Reliance', 'Ultratech', 'Ashok Leyland', 'Mahindra', 'Bosch', 'Siemens',
].map((name) => ({ name, logo: null }));

function LogoCard({ client }) {
  return (
    <div className="shrink-0 w-[9.5rem] sm:w-[11rem] h-20 sm:h-24 surface-raised shadow-neu-sm rounded-card flex items-center justify-center px-4 mx-1.5 sm:mx-2 my-2">
      {client.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={client.logo}
          alt={client.name || 'Client'}
          className="max-h-10 sm:max-h-12 max-w-full object-contain"
        />
      ) : (
        <span className="text-xs sm:text-sm font-bold text-ink text-center tracking-tight">
          {client.name}
        </span>
      )}
    </div>
  );
}

export default function Clients({ clients = null }) {
  const source = clients?.length
    ? clients.map((c) => ({ name: c.name, logo: c.logo || c.image || null }))
    : CLIENT_LOGOS;

  // Duplicate strip for seamless infinite scroll
  const strip = [...source, ...source];

  return (
    <SectionFrame
      eyebrow="Clients"
      title="Trusted by"
      highlight="industry leaders."
      subtitle="Growing with partners across manufacturing, logistics, and infrastructure."
      backgroundImage={CLIENTS_BACKGROUND_IMAGE}
      overlay="light"
      headerAside={
        <Link href="/clients" className="group btn-secondary h-10 rounded-control px-4 text-sm">
          View all clients
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      }
    >
      <div className="h-full min-h-0 flex flex-col justify-center gap-5 sm:gap-7 overflow-hidden">
        <div className="relative overflow-hidden py-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 z-10 bg-gradient-to-r from-surface-raised to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 z-10 bg-gradient-to-l from-surface-raised to-transparent" />
          <div className="flex w-max animate-marquee-ltr hover:[animation-play-state:paused]">
            {strip.map((client, idx) => (
              <LogoCard key={`a-${client.name}-${idx}`} client={client} />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden py-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 z-10 bg-gradient-to-r from-surface-raised to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 z-10 bg-gradient-to-l from-surface-raised to-transparent" />
          <div className="flex w-max animate-marquee-rtl hover:[animation-play-state:paused]">
            {strip.map((client, idx) => (
              <LogoCard key={`b-${client.name}-${idx}`} client={client} />
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
