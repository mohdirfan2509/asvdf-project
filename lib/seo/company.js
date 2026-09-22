export const COMPANY = {
  brandName: 'ASVDF Flooring',
  legalName: 'ASVDF FLOORING PRIVATE LIMITED',
  gstin: '36ABBCA9210B2Z7',
  pan: 'ABBCA9210B',
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
  mapsQuery:
    'Ground Floor, Flat No. 22-250/7/5/A/1, Plot No. 7, Survey No. 324/EE, Airport Residency Phase II, Near ORR Toll Plaza, Shamshabad, Ranga Reddy, Telangana 501218',
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

export function mapsUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.mapsQuery)}`;
}

export function serviceAreaNames() {
  return SERVICE_AREAS.map((area) => area.name).join(', ');
}

function addressIsPlaceholder(address) {
  const value = String(address || '').trim();
  if (!value) return true;
  if (/501218|shamshabad/i.test(value)) return false;
  return /^hyderabad,?\s*telangana/i.test(value) && !/\d/.test(value);
}

/** Overlay registered-office facts when CMS still has the old city-only address. */
export function withCompanyDefaults(settings = {}) {
  const address = addressIsPlaceholder(settings.address) ? COMPANY.address : settings.address;
  return {
    ...settings,
    company_name: settings.company_name || COMPANY.brandName,
    legal_name: settings.legal_name || COMPANY.legalName,
    gstin: settings.gstin || COMPANY.gstin,
    pan: settings.pan || COMPANY.pan,
    address,
  };
}
