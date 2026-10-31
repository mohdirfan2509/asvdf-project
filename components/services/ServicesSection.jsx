import ServiceCard from '@/components/services/ServiceCard';

export default function ServicesSection({ heading, services = [] }) {
  return (
    <section aria-labelledby="services-heading" className="surface-raised shadow-neu-sm rounded-panel p-4 sm:p-5 short-desktop:p-4">
      <h2 id="services-heading" className="text-2xl sm:text-[1.6rem] font-bold tracking-tight text-ink">
        {heading}
      </h2>
      <span className="mt-2 block h-[3px] w-10 rounded-full bg-brand" aria-hidden />

      {services.length ? (
        <ul className="mt-4 short-desktop:mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5 lg:gap-4 short-desktop:gap-3">
          {services.map((service) => (
            <li key={service.id || service.title} className="h-full">
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
