'use client';

export default function AboutBlock({ about, milestones = [], values = [] }) {
  return (
    <div className="flex flex-col gap-4">
      <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-1">About</p>
          <h2 className="text-2xl sm:text-3xl font-[800] tracking-tight text-slate-900 mb-3">
            {about?.headline || 'About ASVDF Flooring'}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{about?.body}</p>
        </div>
        {about?.image && (
          <div className="min-h-[220px] rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url('${about.image}')` }} />
        )}
      </section>

      {!!milestones.length && (
        <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80">
          <h2 className="text-xl font-[800] text-slate-900 mb-4">Milestones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {milestones.map((m) => (
              <div key={m.id} className="bg-[#F6F7FB] rounded-xl p-3.5 neu-sm">
                <p className="text-sm font-[800] text-[#7C3AED]">{m.year}</p>
                <p className="text-sm font-[700] text-slate-900 mt-1">{m.title}</p>
                <p className="text-[12px] text-slate-500 mt-1">{m.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {!!values.length && (
        <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80">
          <h2 className="text-xl font-[800] text-slate-900 mb-4">Core Values</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {values.map((v) => (
              <div key={v.id} className="bg-[#F6F7FB] rounded-xl p-3.5 neu-sm text-center">
                <p className="text-sm font-[700] text-slate-900">{v.title}</p>
                <p className="text-[12px] text-slate-500 mt-1">{v.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
