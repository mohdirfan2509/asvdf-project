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
      <article className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 neu-lg border border-white/80 mb-4">
        <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-2">404</p>
        <h1 className="text-3xl sm:text-4xl font-[800] tracking-tight text-slate-900 mb-3">This page is not available</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
          The link may be old or typed incorrectly. Use the pages below to reach VDF flooring, projects, or the office in
          Hyderabad.
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          <Link href="/" className="inline-flex text-white text-sm font-[600] px-5 py-3 rounded-xl neu-btn-primary">
            Home
          </Link>
          <Link href="/contact" className="inline-flex text-sm font-[600] px-5 py-3 rounded-xl bg-[#F6F7FB] neu-sm">
            Contact
          </Link>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-[600]">
          {SERVICE_NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-[#7C3AED] hover:underline">
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
