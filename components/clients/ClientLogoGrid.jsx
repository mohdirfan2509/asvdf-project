import Marquee from '@/components/ui/Marquee';

function LogoCard({ client }) {
  return (
    <div className="flex h-20 w-40 sm:h-24 sm:w-48 max-sm:h-14 max-sm:w-32 fit:h-20 fit:w-44 items-center justify-center rounded-card border border-edge bg-white px-4 max-sm:px-3 shadow-neu-sm">
      {client.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={client.logo}
          alt={client.name || 'Client logo'}
          loading="lazy"
          decoding="async"
          className="max-h-10 sm:max-h-12 max-sm:max-h-8 max-w-full object-contain"
        />
      ) : (
        <span className="text-center text-sm sm:text-base max-sm:text-[13px] font-bold tracking-tight text-slate-900">{client.name}</span>
      )}
    </div>
  );
}

/** Client names/logos in two rows scrolling in opposite directions (static wrap with reduced motion). */
export default function ClientLogoGrid({ heading, clients }) {
  const middle = Math.ceil(clients.length / 2);
  const rows = clients.length > 6 ? [clients.slice(0, middle), clients.slice(middle)] : [clients];

  return (
    <section aria-labelledby="clients-gallery-heading" className="surface-raised shadow-neu-sm rounded-panel p-5 sm:p-8 max-sm:px-3 max-sm:py-3.5 fit:px-8 fit:py-4">
      <h2 id="clients-gallery-heading" className="text-center text-2xl sm:text-[1.75rem] max-sm:text-lg fit:text-[1.6rem] font-bold tracking-tight text-ink">
        {heading}
      </h2>
      <span className="mx-auto mt-2 max-sm:mt-1.5 block h-[3px] w-10 rounded-full bg-brand" aria-hidden />

      {clients.length ? (
        <div className="mt-5 sm:mt-6 max-sm:mt-1.5 fit:mt-3 space-y-1 max-sm:space-y-0 fit:space-y-0 -mx-2 sm:-mx-4">
          {rows.map((row, index) => (
            <Marquee
              key={index}
              items={row}
              getKey={(client) => client.id || client.name}
              renderItem={(client) => <LogoCard client={client} />}
              direction={index % 2 ? 'rtl' : 'ltr'}
              duration={index % 2 ? 46 : 40}
              minItems={10}
              label={rows.length > 1 ? `Clients, row ${index + 1}` : 'Clients'}
            />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-center text-sm text-ink-muted">Client logos will appear here once they are published.</p>
      )}
    </section>
  );
}
