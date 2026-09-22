'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqAccordion({ faqs = [], heading = 'Frequently asked questions' }) {
  const [openId, setOpenId] = useState(faqs[0]?.question || null);
  if (!faqs.length) return null;

  return (
    <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80">
      <h2 className="text-2xl sm:text-3xl font-[800] tracking-tight text-slate-900 mb-4">{heading}</h2>
      <div className="flex flex-col gap-2">
        {faqs.map((faq) => {
          const open = openId === faq.question;
          return (
            <div key={faq.question} className="bg-[#F6F7FB] rounded-xl neu-sm border border-white overflow-hidden">
              <h3 className="text-sm sm:text-base font-[700] text-slate-900">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : faq.question)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition ${open ? 'rotate-180' : ''}`} />
                </button>
              </h3>
              <p className={`px-4 pb-3 text-sm text-slate-600 leading-relaxed ${open ? 'block' : 'hidden'}`}>
                {faq.answer}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
