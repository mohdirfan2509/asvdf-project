import Link from 'next/link';
import BrandLogo from '@/components/brand/BrandLogo';
import FinalCta from '@/components/layout/FinalCta';
import SocialIcon from '@/components/ui/SocialIcons';
import { COMPANY, SERVICE_AREAS, socialLinks } from '@/lib/seo/company';

const socialClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-surface-raised text-ink shadow-neu-sm transition-[color,box-shadow,transform] duration-200';

/** Site-wide closing block: the final CTA banner (optional) and the footer with service areas and social links. */
export default function CrawlableFooter({ settings, showCta = true }) {
  const legal = settings?.legal_name || COMPANY.legalName;
  const year = new Date().getFullYear();

  return (
    <>
      {showCta ? <FinalCta settings={settings} className="mb-4 lg:mb-5" /> : null}
      <footer
        id="site-footer"
        className="flex flex-col gap-6 rounded-panel border border-white/80 bg-surface px-5 py-6 shadow-neu-sm sm:px-8 lg:flex-row lg:items-center lg:gap-8 lg:px-10 lg:py-7"
      >
        <Link href="/" aria-label="ASVDF Flooring home" className="shrink-0 self-start lg:self-center">
          <BrandLogo />
        </Link>
        <span aria-hidden className="hidden h-16 w-px shrink-0 bg-line lg:block" />

        <div className="min-w-0 flex-1">
          <p className="text-sm leading-relaxed text-ink-muted">
            © {year} {legal}.
            <br />
            All rights reserved.
          </p>
          <nav aria-labelledby="footer-service-areas" className="mt-3">
            <p id="footer-service-areas" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
              Service Areas
            </p>
            <ul className="mt-1.5 grid max-w-[34rem] grid-cols-2 gap-x-3 gap-y-1.5 text-sm font-medium text-ink sm:grid-cols-4 sm:gap-x-0">
              {SERVICE_AREAS.map((area) => (
                <li
                  key={area.path}
                  className="sm:border-l sm:border-line sm:px-3 sm:[&:nth-child(4n+1)]:border-l-0 sm:[&:nth-child(4n+1)]:pl-0"
                >
                  <Link href={area.path} className="transition-colors hover:text-brand">
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <ul aria-label="ASVDF Flooring on social media" className="flex shrink-0 items-center gap-3">
          {socialLinks(settings).map(({ id, label, url }) => (
            <li key={id}>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className={`${socialClass} hover:-translate-y-0.5 hover:text-brand hover:shadow-neu-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40`}
                >
                  <SocialIcon id={id} />
                </a>
              ) : (
                <span role="img" aria-label={`${label} (coming soon)`} title={`${label}: coming soon`} className={`${socialClass} opacity-60`}>
                  <SocialIcon id={id} />
                </span>
              )}
            </li>
          ))}
        </ul>
      </footer>
    </>
  );
}
