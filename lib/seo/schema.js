import { BRAND_ALTERNATES, BRAND_NAME, DEFAULT_OG_IMAGE, absoluteUrl } from './site';
import { COMPANY, SERVICE_AREAS, SOCIAL_LINKS } from './company';
import { SERVICE_NAV } from './routes';
import { normalizePhone } from '@/lib/contact';
import { FOUNDED_YEAR } from '@/lib/stats';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const KNOWS_ABOUT = [
  'VDF flooring',
  'Trimix flooring',
  'Vacuum dewatered flooring',
  'Industrial flooring',
  'Warehouse flooring',
  'Concrete flooring',
  'Epoxy flooring',
  'Floor hardener application',
  'Laser screed flooring',
];

/** All of India, plus the named cities and states that have their own pages. */
function areaServed() {
  return [
    { '@type': 'Country', name: 'India' },
    ...SERVICE_AREAS.map((area) => ({ '@type': area.kind === 'city' ? 'City' : 'State', name: area.name })),
  ];
}

function imageUrl(src, fallback = DEFAULT_OG_IMAGE) {
  const value = src || fallback;
  if (!value) return absoluteUrl(DEFAULT_OG_IMAGE);
  return value.startsWith('http') ? value : absoluteUrl(value);
}

export function organizationId() {
  return `${absoluteUrl('/')}#organization`;
}

export function websiteId() {
  return `${absoluteUrl('/')}#website`;
}

export function organizationNode(settings = {}) {
  const tel = `+${normalizePhone(settings.phone)}`;
  const legalName = settings.legal_name || COMPANY.legalName;
  const gstin = settings.gstin || COMPANY.gstin;

  const node = {
    '@type': ['Organization', 'GeneralContractor'],
    '@id': organizationId(),
    name: settings.company_name || BRAND_NAME,
    legalName,
    alternateName: BRAND_ALTERNATES,
    url: absoluteUrl('/'),
    telephone: tel,
    email: settings.email || undefined,
    image: imageUrl(settings.hero_image || settings.logo),
    logo: imageUrl(settings.logo || '/asvdf-logo.png'),
    taxID: gstin,
    vatID: gstin,
    description:
      settings.seo_description ||
      'ASVDF Flooring installs VDF and industrial concrete floors for warehouses, plants, and commercial buildings.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.streetAddress,
      addressLocality: COMPANY.locality,
      addressRegion: COMPANY.region,
      postalCode: COMPANY.postalCode,
      addressCountry: COMPANY.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY.geo.latitude,
      longitude: COMPANY.geo.longitude,
    },
    areaServed: areaServed(),
    hasMap: COMPANY.mapsLink,
    sameAs: SOCIAL_LINKS.map((link) => link.url).filter(Boolean),
    foundingDate: String(FOUNDED_YEAR),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAYS,
      opens: COMPANY.openingHours.opens,
      closes: COMPANY.openingHours.closes,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: tel,
      email: settings.email || undefined,
      contactType: 'sales',
      areaServed: 'IN',
    },
    knowsAbout: KNOWS_ABOUT,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Flooring services',
      itemListElement: SERVICE_NAV.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item.label, url: absoluteUrl(item.href) },
      })),
    },
  };

  return node;
}

export function websiteNode(settings = {}) {
  return {
    '@type': 'WebSite',
    '@id': websiteId(),
    name: settings.company_name || BRAND_NAME,
    url: absoluteUrl('/'),
    inLanguage: 'en-IN',
    publisher: { '@id': organizationId() },
  };
}

export function breadcrumbNode(items = []) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceNode({ name, description, path, settings, image }) {
  return {
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    ...(image ? { image: imageUrl(image) } : {}),
    provider: { '@id': organizationId() },
    areaServed: areaServed(),
    brand: settings?.company_name || BRAND_NAME,
  };
}

export function faqNode(faqs = []) {
  if (!faqs.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function articleNode({ title, description, path, image, datePublished, dateModified }) {
  return {
    '@type': 'Article',
    headline: title,
    description,
    url: absoluteUrl(path),
    image: imageUrl(image),
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
    author: { '@id': organizationId() },
    publisher: { '@id': organizationId() },
    mainEntityOfPage: absoluteUrl(path),
  };
}

export function graph(nodes = []) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}
