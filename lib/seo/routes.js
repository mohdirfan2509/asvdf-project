import { SERVICES } from '@/lib/content/services';

/** Indexable marketing routes used by sitemap, footer, and internal nav. */
export const PRIMARY_NAV = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/clients', label: 'Clients' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/blog', label: 'Blog' },
];

export const SERVICE_NAV = [
  ...SERVICES.map((service) => ({ href: service.path, label: service.title })),
  { href: '/trimix-flooring', label: 'Trimix Flooring' },
  { href: '/vacuum-densification-flooring', label: 'Vacuum Densification' },
  { href: '/industrial-flooring', label: 'Industrial Flooring' },
  { href: '/warehouse-flooring', label: 'Warehouse Flooring' },
  { href: '/concrete-flooring', label: 'Concrete Flooring' },
  { href: '/vdf-flooring-process', label: 'VDF Process' },
  { href: '/vdf-flooring-cost', label: 'VDF Cost Factors' },
  { href: '/vdf-flooring-contractors', label: 'VDF Contractors' },
];

export const RESOURCE_NAV = [
  { href: '/vdf-flooring-hyderabad', label: 'VDF Flooring in Hyderabad' },
  { href: '/vdf-flooring-bangalore', label: 'VDF Flooring in Bangalore' },
  { href: '/vdf-flooring-chennai', label: 'VDF Flooring in Chennai' },
  { href: '/vdf-flooring-telangana', label: 'Telangana' },
  { href: '/vdf-flooring-andhra-pradesh', label: 'Andhra Pradesh' },
  { href: '/vdf-flooring-karnataka', label: 'Karnataka' },
  { href: '/vdf-flooring-maharashtra', label: 'Maharashtra' },
  { href: '/vdf-flooring-odisha', label: 'Odisha' },
  { href: '/blog/what-is-vdf-flooring', label: 'What is VDF Flooring?' },
  { href: '/blog/industrial-flooring-for-warehouses', label: 'Warehouse Flooring Guide' },
];

export const INDEXABLE_PATHS = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/vdf-flooring', priority: 0.95, changeFrequency: 'monthly' },
  ...SERVICES.filter((service) => service.path !== '/vdf-flooring').map((service) => ({
    path: service.path,
    priority: 0.9,
    changeFrequency: 'monthly',
  })),
  { path: '/trimix-flooring', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/vacuum-densification-flooring', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/industrial-flooring', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/warehouse-flooring', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/concrete-flooring', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/vdf-flooring-contractors', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/vdf-flooring-process', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vdf-flooring-cost', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vdf-flooring-hyderabad', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/vdf-flooring-bangalore', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vdf-flooring-chennai', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vdf-flooring-telangana', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/vdf-flooring-andhra-pradesh', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/vdf-flooring-karnataka', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/vdf-flooring-maharashtra', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/vdf-flooring-odisha', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/vdf-flooring-india', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/projects', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/clients', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
];
