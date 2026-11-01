import SiteShell from '@/components/layout/SiteShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import ServicesOverview from '@/components/services/ServicesOverview';
import { getSiteSettings } from '@/lib/content/queries';
import { SERVICES } from '@/lib/content/services';
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
  const settings = await getSiteSettings();
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ];
  const jsonLd = graph([organizationNode(settings), breadcrumbNode(breadcrumbs)]);

  return (
    <SiteShell settings={settings} activePath="/services">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <ServicesOverview settings={settings} services={SERVICES} headingAs="h1" className="mb-4" />
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
