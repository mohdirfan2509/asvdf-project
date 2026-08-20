'use client';

export default function ClientsStrip({ clients = [] }) {
  return (
    <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80">
      <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-1">Trusted by</p>
      <h2 className="text-2xl sm:text-3xl font-[800] tracking-tight text-slate-900 mb-4">Our Clients</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {clients.map((client) => (
          <div key={client.id} className="bg-[#F6F7FB] rounded-xl p-4 neu-inset text-center">
            {client.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={client.logo} alt={client.name} className="h-10 mx-auto object-contain mb-2" />
            ) : (
              <div className="h-10 flex items-center justify-center text-[#7C3AED] font-[800] text-lg mb-2">
                {client.name.slice(0, 1)}
              </div>
            )}
            <p className="text-xs font-[600] text-slate-800">{client.name}</p>
            {client.industry && <p className="text-[10px] text-slate-500">{client.industry}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
