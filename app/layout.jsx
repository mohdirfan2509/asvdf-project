import './globals.css';
import { Poppins } from 'next/font/google';
import { getSiteSettings } from '@/lib/content/queries';
import { DEFAULT_PHONE_E164 } from '@/lib/contact';
import { BRAND_NAME } from '@/lib/seo/site';
import { defaultTitleTemplate, metadataBaseUrl } from '@/lib/seo/metadata';
import { graph, organizationNode, websiteNode } from '@/lib/seo/schema';
import JsonLd from '@/components/seo/JsonLd';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const title = settings.seo_title || `${BRAND_NAME} | VDF Flooring & Industrial Flooring`;
  const description =
    settings.seo_description ||
    'ASVDF Flooring installs VDF, industrial, warehouse, and commercial concrete floors from Hyderabad.';

  return {
    metadataBase: metadataBaseUrl(),
    title: {
      default: title,
      template: defaultTitleTemplate(),
    },
    description,
    applicationName: settings.company_name || BRAND_NAME,
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: settings.company_name || BRAND_NAME,
      title,
      description,
      images: [{ url: settings.hero_image || '/banner.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: { index: true, follow: true },
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
    other: {
      'contact:phone_number': settings.phone || DEFAULT_PHONE_E164,
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F1F2F7',
};

export default async function RootLayout({ children }) {
  const settings = await getSiteSettings();
  const jsonLd = graph([organizationNode(settings), websiteNode(settings)]);

  return (
    <html lang="en-IN" className={poppins.variable} data-scroll-behavior="smooth">
      <body className={`${poppins.className} bg-surface text-ink antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[80] focus:bg-surface-raised focus:text-ink focus:px-3 focus:py-2 focus:rounded-control"
        >
          Skip to content
        </a>
        <JsonLd data={jsonLd} />
        {children}
      </body>
    </html>
  );
}
