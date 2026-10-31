'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import SectionFrame from '@/components/layout/SectionFrame';

const FAQS_DATA = [
  {
    id: 1,
    question: 'What types of flooring solutions do you offer?',
    answer:
      'We offer industrial flooring including VDF, epoxy, polished concrete, PU flooring, and anti-static systems—tailored to your site requirements.',
  },
  {
    id: 2,
    question: 'What industries do you serve?',
    answer:
      'Automotive, warehousing & logistics, pharmaceuticals, manufacturing, retail, and commercial infrastructure across India.',
  },
  {
    id: 3,
    question: 'How long does a typical project take?',
    answer:
      'Timelines depend on area and site conditions. Most mid-size industrial floors complete in 1–3 weeks including curing windows.',
  },
  {
    id: 4,
    question: 'What is the lifespan of your flooring systems?',
    answer:
      'Our heavy-duty industrial flooring systems are engineered for longevity, lasting 10 to 20+ years with routine maintenance.',
  },
  {
    id: 5,
    question: 'Do you work across India?',
    answer:
      'Yes. ASVDF executes projects across major industrial hubs with local supervision and quality control.',
  },
  {
    id: 6,
    question: 'Do you provide maintenance services?',
    answer:
      'Yes — post-installation care, inspections, polishing, and maintenance packages are available.',
  },
];

const BG = 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1600&auto=format&fit=crop';

export default function Faqs({ faqs = null }) {
  const source = faqs?.length
    ? faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))
    : FAQS_DATA;
  const [openId, setOpenId] = useState(source[0]?.id ?? null);

  return (
    <SectionFrame
      eyebrow="FAQs"
      title="Answers that"
      highlight="keep projects moving."
      subtitle="Clear answers on systems, timelines, and delivery."
      backgroundImage={BG}
      overlay="light"
    >
      <div className="h-full min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 overflow-hidden">
        <div className="lg:col-span-8 min-h-0 overflow-y-auto pr-1 space-y-2 sm:space-y-2.5">
          {source.map((faq) => {
            const open = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="surface-raised shadow-neu-sm rounded-card overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : faq.id)}
                  className="w-full flex items-start justify-between gap-3 p-3.5 sm:p-4 text-left"
                >
                  <span className="text-sm sm:text-base font-semibold text-ink leading-snug">
                    {faq.question}
                  </span>
                  <span className="icon-well w-8 h-8">
                    {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {open ? (
                  <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4">
                    <p className="text-sm text-ink-muted leading-relaxed">{faq.answer}</p>
                  </div>
                ) : (
                  <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 hidden">
                    <p className="text-sm text-ink-muted leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <aside className="lg:col-span-4 min-h-0">
          <div className="h-full min-h-[160px] rounded-card bg-brand p-5 sm:p-6 text-white flex flex-col justify-between shadow-neu-md">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-white/80 mb-2">
                Still have questions?
              </p>
              <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-2">
                Talk to our flooring experts.
              </h3>
              <p className="text-sm text-white/85 leading-relaxed">
                Share your site details and we&apos;ll recommend the right system.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center justify-center gap-2 self-start bg-white text-brand-strong text-sm font-semibold px-5 py-3 rounded-control transition-colors hover:bg-brand-soft"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </aside>
      </div>
    </SectionFrame>
  );
}
