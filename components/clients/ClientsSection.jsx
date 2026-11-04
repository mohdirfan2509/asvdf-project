import ClientsStats from '@/components/clients/ClientsStats';
import FeaturedTestimonial from '@/components/clients/FeaturedTestimonial';
import ClientLogoGrid from '@/components/clients/ClientLogoGrid';
import ClientTestimonialCard from '@/components/clients/ClientTestimonialCard';
import PartnershipFeatures from '@/components/clients/PartnershipFeatures';
import { CLIENTS_BACKGROUND_IMAGE } from '@/lib/content/media';
import { CLIENTS_COPY } from '@/lib/seo/page-content';

/** Clients intro, featured quotes, logo marquee and partnership; shared by /clients and the homepage. */
export default function ClientsSection({ settings, clients = [], id, headingAs: Heading = 'h2', className = '' }) {
  const { featuredQuote: featured, secondaryQuote: secondary } = CLIENTS_COPY;

  return (
    <section
      id={id}
      aria-labelledby="clients-title"
      className={`space-y-5 sm:space-y-6 max-sm:space-y-3 fit:space-y-3.5 rounded-panel border border-edge bg-surface p-4 sm:p-6 max-sm:p-3.5 lg:p-8 fit:p-5 shadow-neu-sm ${className}`}
    >
      <div className="grid gap-6 max-sm:gap-3.5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10 fit:gap-8">
        <div className="flex flex-col justify-center">
          <p className="mb-2 max-sm:mb-1 fit:mb-1.5 text-xs max-sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">{CLIENTS_COPY.eyebrow}</p>
          <Heading
            id="clients-title"
            className="text-3xl sm:text-4xl max-sm:text-[1.45rem] lg:text-[2.2rem] xl:text-[2.4rem] fit:text-[1.9rem] font-bold leading-[1.18] max-sm:leading-[1.25] tracking-tight text-ink"
          >
            {CLIENTS_COPY.h1Line1}
            <br />
            {CLIENTS_COPY.h1Line2}
            <span className="text-brand">{CLIENTS_COPY.h1Highlight}</span>
          </Heading>
          <p className="mt-4 max-sm:mt-2 fit:mt-2.5 max-w-xl fit:max-w-2xl text-sm sm:text-[15px] max-sm:text-[13px] fit:text-sm leading-relaxed max-sm:leading-snug text-ink-muted">{CLIENTS_COPY.intro}</p>
          <div className="mt-6 sm:mt-8 max-sm:mt-3 fit:mt-4">
            <ClientsStats settings={settings} />
          </div>
        </div>
        <FeaturedTestimonial testimonial={featured} image={CLIENTS_BACKGROUND_IMAGE} />
      </div>

      <ClientLogoGrid heading={CLIENTS_COPY.galleryHeading} clients={clients} />

      <div
        role="group"
        aria-label="Client feedback and partnership"
        className={`grid gap-5 max-sm:gap-3 fit:gap-4 ${secondary ? 'min-[1400px]:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]' : ''}`}
      >
        <ClientTestimonialCard testimonial={secondary} />
        <PartnershipFeatures features={CLIENTS_COPY.features} />
      </div>
    </section>
  );
}
