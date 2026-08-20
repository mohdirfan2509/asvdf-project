import './globals.css';
import { getSiteSettings } from '@/lib/content/queries';
import { DEFAULT_PHONE_E164 } from '@/lib/contact';

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.seo_title || 'ASVDF Flooring | VDF Flooring Solutions',
      template: '%s | ASVDF Flooring',
    },
    description: settings.seo_description,
    keywords: settings.seo_keywords?.split(',').map((k) => k.trim()),
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: settings.company_name || 'ASVDF Flooring',
      title: settings.seo_title,
      description: settings.seo_description,
      images: [{ url: settings.hero_image || '/banner.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.seo_title,
      description: settings.seo_description,
    },
    robots: { index: true, follow: true },
    alternates: { canonical: '/' },
    other: {
      'contact:phone_number': settings.phone || DEFAULT_PHONE_E164,
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#EBECF0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#EBECF0] text-slate-800 antialiased">{children}</body>
    </html>
  );
}
