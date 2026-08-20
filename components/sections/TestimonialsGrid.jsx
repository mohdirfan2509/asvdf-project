'use client';

import { Star } from 'lucide-react';

export default function TestimonialsGrid({ testimonials = [] }) {
  return (
    <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80">
      <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-1">Reviews</p>
      <h2 className="text-2xl sm:text-3xl font-[800] tracking-tight text-slate-900 mb-4">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {testimonials.map((t) => (
          <article key={t.id} className="bg-[#F6F7FB] rounded-2xl p-4 neu-sm border border-white flex flex-col gap-3">
            <div className="flex gap-0.5 text-amber-400">
              {Array.from({ length: t.rating || 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="text-sm text-slate-700 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
              {t.avatar && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
              )}
              <div>
                <p className="text-xs font-[700] text-slate-900">{t.name}</p>
                <p className="text-[11px] text-slate-500">{t.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
