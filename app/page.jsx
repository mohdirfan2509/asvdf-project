import SpaApp from '@/components/spa/SpaApp';
import JsonLd from '@/components/seo/JsonLd';
import { getAllContent } from '@/lib/content/queries';
import { formatDisplayPhone, normalizePhone } from '@/lib/contact';

export const revalidate = 60;

/**
 * Live SPA only shows admin-selected items (featured).
 * If none are selected yet, fall back to published bag so the site is never empty.
 */
function pickForSite(rows) {
  const list = rows || [];
  const selected = list.filter((r) => r.featured === true);
  return selected.length ? selected : list;
}

export default async function HomePage() {
  const content = await getAllContent({ homepageOnly: false });

  const spaContent = {
    ...content,
    projects: pickForSite(content.projects),
    services: pickForSite(content.services),
    clients: pickForSite(content.clients),
    testimonials: pickForSite(content.testimonials),
    blogs: pickForSite(content.blogs),
    gallery: pickForSite(content.gallery),
    machinery: pickForSite(content.machinery),
    faqs: pickForSite(content.faqs),
  };

  const settings = content.settings;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const phone = normalizePhone(settings.phone);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.company_name || 'ASVDF Flooring',
    description: settings.seo_description,
    url: siteUrl,
    telephone: `+${phone}`,
    email: settings.email,
    image: settings.hero_image?.startsWith('http')
      ? settings.hero_image
      : `${siteUrl}${settings.hero_image || '/banner.png'}`,
    areaServed: 'IN',
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <SpaApp content={spaContent} />
      <p className="sr-only">
        Call ASVDF Flooring at {formatDisplayPhone(settings.phone)} for VDF flooring solutions.
      </p>
    </>
  );
}
