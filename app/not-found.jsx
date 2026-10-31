import Link from 'next/link';
import SiteShell from '@/components/layout/SiteShell';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import { getSiteSettings } from '@/lib/content/queries';
import { SERVICE_NAV } from '@/lib/seo/routes';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const settings = await getSiteSettings();

  return (
    <SiteShell settings={settings} activePath="/">
      <article className="surface-raised rounded-panel p-6 sm:p-10 mb-4">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-brand uppercase mb-2">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-3">This page is not available</h1>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-6">
          The link may be old or typed incorrectly. Use the pages below to reach VDF flooring, projects, or the office in
          Hyderabad.
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          <Link href="/" className="btn-primary text-sm px-5 py-3">
            Home
          </Link>
          <Link href="/contact" className="btn-secondary text-sm px-5 py-3">
            Contact
          </Link>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-semibold">
          {SERVICE_NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-brand hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </article>
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
