import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FaqAccordion from '@/components/marketing/FaqAccordion';
import RelatedLinks from '@/components/marketing/RelatedLinks';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import SiteShell from '@/components/layout/SiteShell';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ServicePageView({
  settings,
  copy,
  breadcrumbs,
  jsonLd,
  activePath,
}) {
  return (
    <SiteShell settings={settings} activePath={activePath || copy.path}>
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <Breadcrumbs items={breadcrumbs} />
      <article className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 neu-lg border border-white/80 mb-4">
        {copy.eyebrow ? (
          <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-2">{copy.eyebrow}</p>
        ) : null}
        <h1 className="text-3xl sm:text-4xl font-[800] tracking-tight text-slate-900 mb-4">{copy.h1}</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">{copy.intro}</p>

        {copy.sections?.map((section) => (
          <section key={section.heading} className="mb-8 last:mb-0">
            <h2 className="text-xl sm:text-2xl font-[800] tracking-tight text-slate-900 mb-3">{section.heading}</h2>
            {section.paragraphs?.map((p) => (
              <p key={p.slice(0, 48)} className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3">
                {p}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-600 mb-3">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.links?.length ? (
              <p className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-[600] text-[#7C3AED] mt-2">
                {section.links.map((link) => (
                  <Link key={link.href} href={link.href} className="inline-flex items-center gap-1 hover:underline">
                    {link.label}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </p>
            ) : null}
          </section>
        ))}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-white text-sm font-[600] px-5 py-3 rounded-xl neu-btn-primary"
          >
            Request a quotation
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-slate-800 text-sm font-[600] px-5 py-3 rounded-xl bg-[#F6F7FB] neu-sm"
          >
            View projects
          </Link>
        </div>
      </article>

      {copy.faqs?.length ? <div className="mb-4"><FaqAccordion faqs={copy.faqs} /></div> : null}
      {copy.related?.length ? <div className="mb-4"><RelatedLinks links={copy.related} /></div> : null}
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
