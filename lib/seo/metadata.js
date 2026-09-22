import { BRAND_NAME, DEFAULT_OG_IMAGE, absoluteUrl, getSiteUrl } from './site';

export function buildMetadata({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noIndex = false,
  absoluteTitle = false,
}) {
  const canonicalPath = path === '/' ? '/' : path;
  const url = absoluteUrl(canonicalPath);
  const ogImage = image?.startsWith('http') ? image : absoluteUrl(image || DEFAULT_OG_IMAGE);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: canonicalPath },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type,
      locale: 'en_IN',
      url,
      siteName: BRAND_NAME,
      title,
      description,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export function defaultTitleTemplate() {
  return `%s | ${BRAND_NAME}`;
}

export function metadataBaseUrl() {
  return new URL(`${getSiteUrl()}/`);
}
