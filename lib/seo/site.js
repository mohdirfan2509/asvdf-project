export const BRAND_NAME = 'ASVDF Flooring';
export const BRAND_LEGAL = 'ASVDF FLOORING PRIVATE LIMITED';
export const BRAND_ALTERNATES = [
  'AS VDF Flooring',
  'ASVDF',
  'AS VDF',
  'AS VDF Flooring Company',
  'ASVDF FLOORING PRIVATE LIMITED',
];
export const DEFAULT_OG_IMAGE = '/banner.png';
export const PRODUCTION_ORIGIN = 'https://asvdfflooring.com';

/**
 * Canonical origin. Never emit localhost in production metadata.
 * Set NEXT_PUBLIC_SITE_URL to the preferred live host (apex or www) after DNS is aligned.
 */
export function getSiteUrl() {
  const raw = String(process.env.NEXT_PUBLIC_SITE_URL || '').trim().replace(/\/$/, '');
  const isLocal = !raw || raw.includes('localhost') || raw.includes('127.0.0.1');
  const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

  if (isLocal) {
    return isProd ? PRODUCTION_ORIGIN : raw || 'http://localhost:3000';
  }
  return raw;
}

export function absoluteUrl(path = '/') {
  const origin = getSiteUrl();
  if (!path || path === '/') return `${origin}/`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${normalized}`;
}
