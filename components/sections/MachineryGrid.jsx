'use client';

export default function MachineryGrid({ items = [] }) {
  return (
    <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80">
      <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-1">Equipment</p>
      <h2 className="text-2xl sm:text-3xl font-[800] tracking-tight text-slate-900 mb-4">Machinery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => (
          <article key={item.id} className="bg-[#F6F7FB] rounded-2xl p-3 neu-sm border border-white">
            {item.image && (
              <div className="h-28 rounded-xl bg-white mb-2 bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }} />
            )}
            <h3 className="text-sm font-[700] text-slate-900">{item.name}</h3>
            <p className="text-[12px] text-slate-500 mt-1">{item.specs}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
