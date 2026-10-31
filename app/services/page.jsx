import SiteShell from '@/components/layout/SiteShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import ServicesOverview from '@/components/services/ServicesOverview';
import { getServices, getSiteSettings } from '@/lib/content/queries';
import { buildMetadata } from '@/lib/seo/metadata';
import { SERVICES_HUB } from '@/lib/seo/page-content';
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
  // Only services marked Visible in the admin, matching the homepage section.
  const [settings, services] = await Promise.all([getSiteSettings(), getServices({ homepageOnly: true })]);
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ];
  const jsonLd = graph([organizationNode(settings), breadcrumbNode(breadcrumbs)]);

  return (
    <SiteShell settings={settings} activePath="/services">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <ServicesOverview settings={settings} services={services} headingAs="h1" className="mb-4" />
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
