import Link from 'next/link';
import SiteShell from '@/components/layout/SiteShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import { getServices, getSiteSettings } from '@/lib/content/queries';
import { buildMetadata } from '@/lib/seo/metadata';
import { SERVICE_NAV } from '@/lib/seo/routes';
import { SERVICES_HUB } from '@/lib/seo/page-content';
import { serviceHref } from '@/lib/seo/slug';
import { graph, organizationNode, breadcrumbNode } from '@/lib/seo/schema';

export const revalidate = 60;

export async function generateMetadata() {
  return buildMetadata({
    title: SERVICES_HUB.title,
    description: SERVICES_HUB.description,
    path: '/services',
  });
}

export default async function ServicesPage() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ];
  const jsonLd = graph([organizationNode(settings), breadcrumbNode(breadcrumbs)]);

  return (
    <SiteShell settings={settings} activePath="/services">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <article className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 neu-lg border border-white/80 mb-4">
        <h1 className="text-3xl sm:text-4xl font-[800] tracking-tight text-slate-900 mb-3">{SERVICES_HUB.h1}</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{SERVICES_HUB.intro}</p>
      </article>
      <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80 mb-4">
        <h2 className="text-xl sm:text-2xl font-[800] text-slate-900 mb-4">Service pages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl bg-[#F6F7FB] p-4 neu-sm border border-white hover:border-purple-200"
            >
              <h3 className="text-base font-[700] text-slate-900">{item.label}</h3>
              <p className="text-xs text-[#7C3AED] mt-1 font-[600]">Read more</p>
            </Link>
          ))}
        </div>
      </section>
      {services?.length ? (
        <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80 mb-4">
          <h2 className="text-xl sm:text-2xl font-[800] text-slate-900 mb-4">Current systems we publish</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={serviceHref(service.title)}
                className="bg-[#F6F7FB] rounded-2xl overflow-hidden neu-sm border border-white"
              >
                {service.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={service.image} alt={service.title} className="h-36 w-full object-cover" />
                ) : null}
                <div className="p-3.5">
                  <h3 className="text-sm font-[700] text-slate-900 mb-1">{service.title}</h3>
                  <p className="text-[12px] text-slate-500 leading-relaxed">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
