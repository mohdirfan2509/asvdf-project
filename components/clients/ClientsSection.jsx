import ClientsStats from '@/components/clients/ClientsStats';
import FeaturedTestimonial from '@/components/clients/FeaturedTestimonial';
import ClientLogoGrid from '@/components/clients/ClientLogoGrid';
import ClientTestimonialCard from '@/components/clients/ClientTestimonialCard';
import PartnershipFeatures from '@/components/clients/PartnershipFeatures';
import { CLIENTS_BACKGROUND_IMAGE } from '@/lib/content/media';
import { CLIENTS_COPY } from '@/lib/seo/page-content';

/** Clients intro, testimonials, logo gallery and partnership; shared by /clients and the homepage. */
export default function ClientsSection({
  settings,
  clients = [],
  testimonials = [],
  id,
  headingAs: Heading = 'h2',
  className = '',
}) {
  const [featured, secondary] = testimonials;

  return (
    <section
      id={id}
      aria-labelledby="clients-title"
      className={`space-y-5 sm:space-y-6 rounded-panel border border-white/80 bg-surface p-4 sm:p-6 lg:p-8 shadow-neu-sm ${className}`}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10">
        <div className="flex flex-col justify-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">{CLIENTS_COPY.eyebrow}</p>
          <Heading
            id="clients-title"
            className="text-3xl sm:text-4xl lg:text-[2.2rem] xl:text-[2.4rem] font-bold leading-[1.18] tracking-tight text-ink"
          >
            {CLIENTS_COPY.h1Line1}
            <br />
            {CLIENTS_COPY.h1Line2}
            <span className="text-brand">{CLIENTS_COPY.h1Highlight}</span>
          </Heading>
          <p className="mt-4 max-w-xl text-sm sm:text-[15px] leading-relaxed text-ink-muted">{CLIENTS_COPY.intro}</p>
          <div className="mt-6 sm:mt-8">
            <ClientsStats settings={settings} />
          </div>
        </div>
        <FeaturedTestimonial testimonial={featured} image={CLIENTS_BACKGROUND_IMAGE} />
      </div>

      <ClientLogoGrid heading={CLIENTS_COPY.galleryHeading} clients={clients} />

      <div
        role="group"
        aria-label="Client feedback and partnership"
        className={`grid gap-5 ${secondary ? 'min-[1400px]:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]' : ''}`}
      >
        <ClientTestimonialCard testimonial={secondary} />
        <PartnershipFeatures features={CLIENTS_COPY.features} />
      </div>
    </section>
  );
}
