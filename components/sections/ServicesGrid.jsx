'use client';

export default function ServicesGrid({ services = [] }) {
  return (
    <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80">
      <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-1">What we do</p>
      <h2 className="text-2xl sm:text-3xl font-[800] tracking-tight text-slate-900 mb-4">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {services.map((service) => (
          <article key={service.id} className="bg-[#F6F7FB] rounded-2xl overflow-hidden neu-sm border border-white">
            {service.image && (
              <div className="h-36 bg-cover bg-center" style={{ backgroundImage: `url('${service.image}')` }} />
            )}
            <div className="p-3.5">
              <h3 className="text-sm font-[700] text-slate-900 mb-1">{service.title}</h3>
              <p className="text-[12px] text-slate-500 leading-relaxed">{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
