import { Briefcase, FileText, Hash, Images, LayoutDashboard, Users } from 'lucide-react';

/** Admin content lists, shared by the sidebar, the dashboard and the section pages. */
export const CONTENT_SECTIONS = [
  {
    collection: 'projects',
    label: 'Projects',
    singular: 'project',
    href: '/admin/projects',
    icon: Briefcase,
    addLabel: 'Add project',
  },
  {
    collection: 'clients',
    label: 'Clients',
    singular: 'client',
    href: '/admin/clients',
    icon: Users,
    addLabel: 'Add client',
  },
  {
    collection: 'gallery_images',
    label: 'Gallery',
    singular: 'photo',
    href: '/admin/gallery',
    icon: Images,
    addLabel: 'Add photo',
  },
  {
    collection: 'blogs',
    label: 'Blogs',
    singular: 'blog post',
    href: '/admin/blogs',
    icon: FileText,
    addLabel: 'Write post',
  },
];

export const ADMIN_NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/settings', label: 'Numbers', icon: Hash },
  ...CONTENT_SECTIONS.map(({ href, label, icon }) => ({ href, label, icon })),
];

export function sectionFor(collection) {
  return CONTENT_SECTIONS.find((section) => section.collection === collection);
}

/** An item is live on the website only when it is published and switched to Visible. */
export function isLive(row) {
  return row.published !== false && row.featured === true;
}
