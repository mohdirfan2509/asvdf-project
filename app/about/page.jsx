import Link from 'next/link';
import SiteShell from '@/components/layout/SiteShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import RelatedLinks from '@/components/marketing/RelatedLinks';
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
      <article className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 neu-lg border border-white/80 mb-4">
        <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-2">ASVDF Flooring</p>
        <h1 className="text-3xl sm:text-4xl font-[800] tracking-tight text-slate-900 mb-4">
          {about?.headline || ABOUT_EXTRA.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
          {about?.body}
        </p>
        {ABOUT_EXTRA.sections.map((section) => (
          <section key={section.heading} className="mb-6">
            <h2 className="text-xl sm:text-2xl font-[800] text-slate-900 mb-2">{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {p}
              </p>
            ))}
          </section>
        ))}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-6">
          {[
            [settings.stat_projects, 'Projects completed'],
            [settings.stat_industries, 'Industries served'],
            [settings.stat_years, 'Years'],
            [settings.stat_sqft, 'Sq.ft delivered'],
          ].map(([value, label]) => (
            <div key={label} className="bg-[#F6F7FB] rounded-xl p-3 neu-sm">
              <p className="text-lg font-[800] text-[#7C3AED]">{value}</p>
              <p className="text-[11px] text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </article>

      {milestones?.length ? (
        <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 neu-lg border border-white/80 mb-4">
          <h2 className="text-2xl font-[800] text-slate-900 mb-4">Milestones</h2>
          <ol className="space-y-4">
            {milestones.map((item) => (
              <li key={item.id} className="border-l-2 border-[#DDD6FE] pl-4">
                <p className="text-xs font-[700] text-[#7C3AED]">{item.year}</p>
                <h3 className="text-base font-[700] text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {values?.length ? (
        <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 neu-lg border border-white/80 mb-4">
          <h2 className="text-2xl font-[800] text-slate-900 mb-4">How we work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {values.map((item) => (
              <div key={item.id} className="bg-[#F6F7FB] rounded-xl p-4 neu-sm">
                <h3 className="text-base font-[700] text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
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
        <Link href="/contact" className="inline-flex text-sm font-[700] text-[#7C3AED]">
          Contact ASVDF Flooring
        </Link>
      </p>
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
