import { DEFAULT_PHONE, DEFAULT_WHATSAPP } from '@/lib/contact';
import { DEFAULT_OG_IMAGE, HOME_DESCRIPTION, HOME_TITLE } from '@/lib/seo/site';

/** Company and contact details (fixed in code; not editable in the admin panel). */
export const COMPANY = {
  brandName: 'ASVDF Flooring',
  legalName: 'ASVDF FLOORING PRIVATE LIMITED',
  gstin: '36ABBCA9210B2Z7',
  pan: 'ABBCA9210B',
  phone: DEFAULT_PHONE,
  whatsapp: DEFAULT_WHATSAPP,
  email: 'asvdfflooringpvtltd@gmail.com',
  workingHours: 'Open 24 hours, all days',
  /** Same hours in 24-hour form for structured data (00:00–23:59 is schema.org's "open all day"). */
  openingHours: { opens: '00:00', closes: '23:59' },
  streetAddress:
    'Ground Floor, Flat No. 22-250/7/5/A/1, Plot No. 7, Survey No. 324/EE, Airport Residency Phase II, Near ORR Toll Plaza',
  locality: 'Shamshabad',
  district: 'Ranga Reddy',
  region: 'Telangana',
  postalCode: '501218',
  country: 'IN',
  countryName: 'India',
  address:
    'Ground Floor, Flat No. 22-250/7/5/A/1, Plot No. 7, Survey No. 324/EE, Airport Residency Phase II, Near ORR Toll Plaza, Shamshabad, Ranga Reddy, Telangana – 501218',
  /** Google Business Profile listing for the office. */
  mapsLink: 'https://maps.app.goo.gl/rVYcf7V5bA6Z7x8cA',
  /** Pin of that listing. */
  geo: { latitude: 17.2582935, longitude: 78.373271 },
};

export const SERVICE_AREAS = [
  { name: 'Hyderabad', path: '/vdf-flooring-hyderabad', kind: 'city', region: 'Telangana' },
  { name: 'Bengaluru', path: '/vdf-flooring-bangalore', kind: 'city', region: 'Karnataka' },
  { name: 'Chennai', path: '/vdf-flooring-chennai', kind: 'city', region: 'Tamil Nadu' },
  { name: 'Telangana', path: '/vdf-flooring-telangana', kind: 'state' },
  { name: 'Andhra Pradesh', path: '/vdf-flooring-andhra-pradesh', kind: 'state' },
  { name: 'Karnataka', path: '/vdf-flooring-karnataka', kind: 'state' },
  { name: 'Maharashtra', path: '/vdf-flooring-maharashtra', kind: 'state' },
  { name: 'Odisha', path: '/vdf-flooring-odisha', kind: 'state' },
];

/** Page covering every other state, union territory and city in India. */
export const ALL_INDIA_AREA = { name: 'Other states & cities', path: '/vdf-flooring-india' };

/** Official social profiles, in footer order; an empty URL renders a disabled "coming soon" icon. */
export const SOCIAL_LINKS = [
  { id: 'linkedin', label: 'LinkedIn', url: '' },
  { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/share/1E97oUyUUY/' },
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/asvdfflooringpvt.ltd?vrfl=anBvNDN2emppOHhw' },
  { id: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@ASVDFflooringpvtltd' },
  { id: 'pinterest', label: 'Pinterest', url: 'https://pin.it/1dgMbDWgl' },
];

export function mapsUrl() {
  return COMPANY.mapsLink;
}

/** Keyless Google Maps embed with the marker on the office's coordinates. */
export function mapsEmbedUrl() {
  const { latitude, longitude } = COMPANY.geo;
  return `https://www.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;
}

export function serviceAreaNames() {
  return SERVICE_AREAS.map((area) => area.name).join(', ');
}

/**
 * Site settings = the admin-editable numbers plus these fixed details. Merged last so stored values for
 * fields that are no longer editable can never override the code.
 */
export function withSiteInfo(settings = {}) {
  return {
    ...settings,
    company_name: COMPANY.brandName,
    legal_name: COMPANY.legalName,
    gstin: COMPANY.gstin,
    pan: COMPANY.pan,
    phone: COMPANY.phone,
    whatsapp: COMPANY.whatsapp,
    email: COMPANY.email,
    address: COMPANY.address,
    working_hours: COMPANY.workingHours,
    seo_title: HOME_TITLE,
    seo_description: HOME_DESCRIPTION,
    hero_image: DEFAULT_OG_IMAGE,
  };
}
