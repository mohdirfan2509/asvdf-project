import Link from 'next/link';
import SiteShell from '@/components/layout/SiteShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import RelatedLinks from '@/components/marketing/RelatedLinks';
import AboutSection from '@/components/about/AboutSection';
import { getAbout, getCoreValues, getMilestones, getSiteSettings } from '@/lib/content/queries';
import { buildMetadata } from '@/lib/seo/metadata';
import { ABOUT_EXTRA } from '@/lib/seo/page-content';
import { graph, organizationNode, breadcrumbNode } from '@/lib/seo/schema';

export const revalidate = 60;

export async function generateMetadata() {
  return buildMetadata({
    title: ABOUT_EXTRA.title,
    description: ABOUT_EXTRA.description,
    path: '/about',
  });
}

export default async function AboutPage() {
  const [settings, about, milestones, values] = await Promise.all([
    getSiteSettings(),
    getAbout(),
    getMilestones(),
    getCoreValues(),
  ]);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  const jsonLd = graph([organizationNode(settings), breadcrumbNode(breadcrumbs)]);

  return (
    <SiteShell settings={settings} activePath="/about">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <AboutSection image={about?.image} headingAs="h1" className="mb-4" />

      <article className="surface-raised rounded-panel p-4 sm:p-8 mb-4">
        {ABOUT_EXTRA.sections.map((section) => (
          <section key={section.heading} className="mb-6 last:mb-0">
            <h2 className="text-xl sm:text-2xl font-bold text-ink mb-2">{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-sm sm:text-base text-ink-muted leading-relaxed">
                {p}
              </p>
            ))}
          </section>
        ))}
      </article>

      {milestones?.length ? (
        <section className="surface-raised rounded-panel p-4 sm:p-8 mb-4">
          <h2 className="text-2xl font-bold text-ink mb-4">Milestones</h2>
          <ol className="space-y-4">
            {milestones.map((item) => (
              <li key={item.id} className="border-l-2 border-brand-line pl-4">
                <p className="text-xs font-semibold text-brand">{item.year}</p>
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="text-sm text-ink-muted">{item.description}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {values?.length ? (
        <section className="surface-raised rounded-panel p-4 sm:p-8 mb-4">
          <h2 className="text-2xl font-bold text-ink mb-4">How we work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {values.map((item) => (
              <div key={item.id} className="bg-surface border border-line rounded-control p-4">
                <h3 className="text-base font-semibold text-ink mb-1">{item.title}</h3>
                <p className="text-sm text-ink-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mb-4">
        <RelatedLinks
          links={[
            { href: '/vdf-flooring', label: 'VDF flooring' },
            { href: '/vdf-flooring-hyderabad', label: 'Hyderabad office' },
            { href: '/vdf-flooring-bangalore', label: 'Bengaluru' },
            { href: '/vdf-flooring-chennai', label: 'Chennai' },
            { href: '/vdf-flooring-telangana', label: 'Telangana' },
            { href: '/contact', label: 'Contact' },
          ]}
        />
      </div>
      <p className="mb-4">
        <Link href="/contact" className="inline-flex text-sm font-semibold text-brand hover:underline">
          Contact ASVDF Flooring
        </Link>
      </p>
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
