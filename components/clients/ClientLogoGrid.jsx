export default function ClientLogoGrid({ heading, clients }) {
  return (
    <section aria-labelledby="clients-gallery-heading" className="surface-raised shadow-neu-sm rounded-panel p-5 sm:p-8">
      <h2 id="clients-gallery-heading" className="text-center text-2xl sm:text-[1.75rem] font-bold tracking-tight text-ink">
        {heading}
      </h2>
      <span className="mx-auto mt-2 block h-[3px] w-10 rounded-full bg-brand" aria-hidden />

      {clients.length ? (
        <ul className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {clients.map((client) => (
            <li
              key={client.id || client.name}
              className="flex h-20 sm:h-24 items-center justify-center rounded-card border border-white/80 bg-white px-4 shadow-neu-sm"
            >
              {client.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={client.logo}
                  alt={client.name || 'Client logo'}
                  loading="lazy"
                  decoding="async"
                  className="max-h-10 sm:max-h-12 max-w-full object-contain"
                />
              ) : (
                <span className="text-center text-sm sm:text-base font-bold tracking-tight text-ink">
                  {client.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-center text-sm text-ink-muted">Client logos will appear here once they are published.</p>
      )}
    </section>
  );
}
