'use client';

import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import SectionFrame from '@/components/layout/SectionFrame';

const BG =
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1600&auto=format&fit=crop';

export default function FooterCTA({ onNavigate, settings = null }) {
  const phoneDigits = String(settings?.phone || '9063222804').replace(/\D/g, '').slice(-10);
  const displayPhone = `+91 ${phoneDigits}`;
  const year = new Date().getFullYear();

  return (
    <SectionFrame backgroundImage={BG} overlay="none" panel={false} className="overflow-hidden">
      <div className="h-full min-h-0 flex flex-col gap-3 sm:gap-4">
        <div className="flex-1 min-h-0 rounded-[1.5rem] overflow-hidden bg-gradient-to-r from-[#3B25B0] via-[#4C28C4] to-[#5B2DE0] grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 p-5 sm:p-8 lg:p-10 flex flex-col justify-center text-white">
            <p className="text-[11px] font-[700] tracking-[0.18em] uppercase text-purple-100 mb-3">
              Let&apos;s build together
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-[800] tracking-[-0.04em] leading-[1.08] mb-3 sm:mb-4">
              Ready to build stronger foundations together?
            </h2>
            <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed mb-5 sm:mb-7 max-w-lg">
              Partner with ASVDF for reliable, durable, high-performance flooring.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate?.('Contact Us')}
                className="inline-flex items-center gap-2 text-white text-sm font-[600] px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white/15 border border-white/25 hover:bg-white/25"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`tel:+91${phoneDigits}`}
                className="inline-flex items-center gap-2 bg-white text-[#3B25B0] text-sm font-[700] px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl"
              >
                <Phone className="w-4 h-4" />
                {displayPhone}
              </a>
            </div>
          </div>
          <div className="lg:col-span-6 relative min-h-[140px] lg:min-h-full">
            <div
              className="absolute inset-0 bg-cover bg-center lg:rounded-l-[3rem]"
              style={{ backgroundImage: `url('${BG}')` }}
            />
            <div className="absolute inset-0 bg-slate-950/15" />
          </div>
        </div>

        <div className="shrink-0 bg-white/95 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 border border-white flex flex-col sm:flex-row items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onNavigate?.('Home')}
            className="text-sm font-[800] text-slate-900"
          >
            ASVDF <span className="text-slate-400 font-[600] tracking-[0.18em] text-[10px]">FLOORING</span>
          </button>
          <p className="text-[11px] sm:text-xs text-slate-500">
            © {year} ASVDF Flooring. All rights reserved.
          </p>
        </div>
      </div>
    </SectionFrame>
  );
}
