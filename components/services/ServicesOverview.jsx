import { Award, Building2, ShieldCheck, Users } from 'lucide-react';
import StatCards from '@/components/ui/StatCards';
import ServicesSection from '@/components/services/ServicesSection';
import { SERVICES_HUB } from '@/lib/seo/page-content';
const STATS = [
  { key: 'stat_projects', label: 'Projects Completed', icon: Award },
  { key: 'stat_clients', label: 'Happy Clients', icon: Users },
  { key: 'stat_industries', label: 'Industries Served', icon: Building2 },
  { key: 'stat_satisfaction', label: 'Client Satisfaction', icon: ShieldCheck },
];

/** Services intro, stats and card grid; shared by /services and the homepage. */
export default function ServicesOverview({ settings, services = [], id, headingAs: Heading = 'h2', className = '' }) {
  const cards = services.map(({ id: serviceId, title, description, image, imageAlt, path }) => ({
    id: serviceId,
    title,
    description,
    image,
    imageAlt,
    href: path || null,
  }));

  return (
    <section
      id={id}
      aria-labelledby="services-title"
      className={`space-y-4 short-desktop:space-y-3 rounded-panel border border-edge bg-surface p-4 sm:p-6 short-desktop:p-4 shadow-neu-sm ${className}`}
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">{SERVICES_HUB.eyebrow}</p>
          <Heading
            id="services-title"
            className="text-3xl sm:text-4xl lg:text-[2rem] short-desktop:text-[1.75rem] font-bold leading-[1.15] tracking-tight text-ink"
          >
            {SERVICES_HUB.h1Line1}
            <br />
            {SERVICES_HUB.h1Line2}
            <span className="text-brand">{SERVICES_HUB.h1Highlight}</span>
          </Heading>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">{SERVICES_HUB.intro}</p>
        </div>
        <StatCards
          settings={settings}
          stats={STATS}
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-flow-col lg:auto-cols-fr xl:shrink-0"
          cardClassName="xl:min-w-[10.5rem]"
        />
      </div>

      <ServicesSection heading={SERVICES_HUB.sectionHeading} services={cards} />
    </section>
  );
}
