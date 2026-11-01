import SiteShell from '@/components/layout/SiteShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import RelatedLinks from '@/components/marketing/RelatedLinks';
import ContactSection from '@/components/contact/ContactSection';
import { getSiteSettings } from '@/lib/content/queries';
import { SERVICES } from '@/lib/content/services';
import { buildMetadata } from '@/lib/seo/metadata';
import { CONTACT_COPY } from '@/lib/seo/page-content';
import { COMPANY, SERVICE_AREAS } from '@/lib/seo/company';
import { graph, organizationNode, breadcrumbNode } from '@/lib/seo/schema';

export const revalidate = 60;

export async function generateMetadata() {
  return buildMetadata({
    title: CONTACT_COPY.title,
    description: CONTACT_COPY.description,
    path: '/contact',
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];
  const jsonLd = graph([organizationNode(settings), breadcrumbNode(breadcrumbs)]);
  const legal = settings.legal_name || COMPANY.legalName;
  const gstin = settings.gstin || COMPANY.gstin;
  const pan = settings.pan || COMPANY.pan;

  return (
    <SiteShell settings={settings} activePath="/contact">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <ContactSection settings={settings} services={SERVICES} headingAs="h1" className="mb-4" />

      <section className="surface-raised rounded-panel p-4 sm:p-8 mb-4 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-2">Requesting a quotation</h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">{CONTACT_COPY.intro}</p>
        </div>
        <div className="bg-surface border border-line rounded-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted mb-1">Legal name</p>
          <p className="text-sm font-semibold text-ink">{legal}</p>
          <p className="text-xs text-ink-muted mt-2">GSTIN {gstin}</p>
          <p className="text-xs text-ink-muted">PAN {pan}</p>
        </div>
      </section>
      <div className="mb-4">
        <RelatedLinks
          heading="Service areas · All over India"
          links={SERVICE_AREAS.map((area) => ({ href: area.path, label: `VDF flooring in ${area.name}` }))}
        />
      </div>
      <CrawlableFooter settings={settings} showCta={false} />
    </SiteShell>
  );
}
