export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function projectSlug(project = {}) {
  if (project.slug) return slugify(project.slug);
  const base = [project.title, project.location].filter(Boolean).join(' ');
  return slugify(base) || String(project.id || 'project');
}

export function serviceHref(title = '') {
  const key = String(title).toLowerCase();
  if (key.includes('vdf')) return '/vdf-flooring';
  if (key.includes('warehouse')) return '/warehouse-flooring';
  if (key.includes('industrial')) return '/industrial-flooring';
  if (key.includes('commercial') || key.includes('concrete') || key.includes('pqc')) return '/concrete-flooring';
  if (key.includes('epoxy')) return '/industrial-flooring';
  if (key.includes('vacuum')) return '/vacuum-densification-flooring';
  return '/services';
}
