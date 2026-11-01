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
  image,
}) {
  return (
    <SiteShell settings={settings} activePath={activePath || copy.path}>
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <Breadcrumbs items={breadcrumbs} />
      <article className="surface-raised rounded-panel p-4 sm:p-8 mb-4">
        {image ? (
          <div className="relative -mx-4 -mt-4 mb-6 aspect-[16/9] overflow-hidden rounded-t-panel bg-surface-sunken sm:-mx-8 sm:-mt-8 sm:mb-8 sm:aspect-[21/8]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
        ) : null}
        {copy.eyebrow ? (
          <p className="text-[11px] font-semibold tracking-[0.14em] text-brand uppercase mb-2">{copy.eyebrow}</p>
        ) : null}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-4">{copy.h1}</h1>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-8">{copy.intro}</p>

        {copy.sections?.map((section) => (
          <section key={section.heading} className="mb-8 last:mb-0">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink mb-3">{section.heading}</h2>
            {section.paragraphs?.map((p) => (
              <p key={p.slice(0, 48)} className="text-sm sm:text-base text-ink-muted leading-relaxed mb-3">
                {p}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-ink-muted mb-3 marker:text-brand">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.links?.length ? (
              <p className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-brand mt-2">
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
          <Link href="/contact" className="btn-primary text-sm px-5 py-3">
            Request a quotation
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/projects" className="btn-secondary text-sm px-5 py-3">
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
