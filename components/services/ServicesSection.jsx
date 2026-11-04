import ServiceCard from '@/components/services/ServiceCard';

export default function ServicesSection({ heading, services = [] }) {
  return (
    <section aria-labelledby="services-heading" className="surface-raised shadow-neu-sm rounded-panel p-4 sm:p-5 max-sm:p-3 short-desktop:p-4">
      <h2 id="services-heading" className="text-2xl sm:text-[1.6rem] max-sm:text-lg font-bold tracking-tight text-ink">
        {heading}
      </h2>
      <span className="mt-2 max-sm:mt-1.5 block h-[3px] w-10 rounded-full bg-brand" aria-hidden />

      {services.length ? (
        <ul className="mt-4 max-sm:mt-3 short-desktop:mt-3 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3.5 max-sm:gap-2.5 lg:gap-4 short-desktop:gap-3">
          {services.map((service) => (
            <li key={service.id || service.title} className="h-full max-sm:odd:last:col-span-2 max-sm:odd:last:mx-auto max-sm:odd:last:w-[calc(50%-0.3125rem)]">
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-sm text-ink-muted">Services will appear here once they are published.</p>
      )}
    </section>
  );
}
