import SiteShell from '@/components/layout/SiteShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import ClientsSection from '@/components/clients/ClientsSection';
import { getClients, getSiteSettings, getTestimonials } from '@/lib/content/queries';
import { buildMetadata } from '@/lib/seo/metadata';
import { CLIENTS_COPY } from '@/lib/seo/page-content';
import { graph, organizationNode, breadcrumbNode } from '@/lib/seo/schema';

export const revalidate = 60;

export async function generateMetadata() {
  return buildMetadata({
    title: CLIENTS_COPY.title,
    description: CLIENTS_COPY.description,
    path: '/clients',
  });
}

export default async function ClientsPage() {
  // Only entries marked Visible in the admin, matching the homepage sections.
  const [settings, clients, testimonials] = await Promise.all([
    getSiteSettings(),
    getClients({ homepageOnly: true }),
    getTestimonials({ homepageOnly: true }),
  ]);
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Clients', path: '/clients' },
  ];
  const jsonLd = graph([organizationNode(settings), breadcrumbNode(breadcrumbs)]);

  return (
    <SiteShell settings={settings} activePath="/clients">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <ClientsSection
        settings={settings}
        clients={clients}
        testimonials={testimonials}
        headingAs="h1"
        className="mb-4"
      />
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
