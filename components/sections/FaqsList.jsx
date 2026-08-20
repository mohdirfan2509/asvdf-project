'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqsList({ faqs = [] }) {
  const [openId, setOpenId] = useState(faqs[0]?.id || null);
  return (
    <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80">
      <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-1">Help</p>
      <h2 className="text-2xl sm:text-3xl font-[800] tracking-tight text-slate-900 mb-4">FAQs</h2>
      <div className="flex flex-col gap-2">
        {faqs.map((faq) => {
          const open = openId === faq.id;
          return (
            <div key={faq.id} className="bg-[#F6F7FB] rounded-xl neu-sm border border-white overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : faq.id)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
              >
                <span className="text-sm font-[600] text-slate-900">{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition ${open ? 'rotate-180' : ''}`} />
              </button>
              {open && <p className="px-4 pb-3 text-sm text-slate-600 leading-relaxed">{faq.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
