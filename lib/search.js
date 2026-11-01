import { PRIMARY_NAV, SERVICE_NAV, RESOURCE_NAV } from '@/lib/seo/routes';
import { SERVICE_AREAS } from '@/lib/seo/company';
import { projectSlug } from '@/lib/seo/slug';

/**
 * Client-side site search over the indexable pages plus the CMS blogs and projects
 * already loaded on the page. Entries are deduplicated by href; earlier groups win.
 */
export function buildSearchIndex({ blogs = [], projects = [], sections = [] } = {}) {
  const entries = [];
  const seen = new Set();
  const sectionTitles = new Set(sections.map((section) => section.title.toLowerCase()));

  const add = (href, title, group, keywords = '') => {
    if (!href || !title || seen.has(href)) return;
    seen.add(href);
    const pathWords = href.replace(/[/#-]+/g, ' ');
    entries.push({
      href,
      title,
      group,
      haystack: `${title} ${keywords} ${pathWords}`.toLowerCase(),
    });
  };

  sections.forEach((section) => add(section.href, section.title, 'Homepage sections', 'section'));
  // Pages with the same name as a homepage section would only duplicate that result.
  PRIMARY_NAV.filter((item) => !sectionTitles.has(item.label.toLowerCase())).forEach((item) =>
    add(item.href, item.label, 'Pages')
  );
  SERVICE_NAV.forEach((item) => add(item.href, item.label, 'Services', 'vdf flooring service'));
  SERVICE_AREAS.forEach((area) =>
    add(area.path, `VDF flooring in ${area.name}`, 'Locations', `${area.region || ''} location city state`)
  );
  (blogs || [])
    .filter((blog) => blog?.slug && blog?.title)
    .forEach((blog) =>
      add(`/blog/${blog.slug}`, blog.title, 'Guides', `${blog.category || ''} ${blog.excerpt || ''} blog guide`)
    );
  RESOURCE_NAV.forEach((item) => add(item.href, item.label, 'Guides'));
  (projects || [])
    .filter((project) => project?.title)
    .forEach((project) =>
      add(
        `/projects?project=${projectSlug(project)}`,
        project.title,
        'Projects',
        `${project.location || ''} ${project.category || ''} ${project.flooring_type || ''} project`
      )
    );

  return entries;
}

/** Every query word must appear; entries whose title contains the full query rank first. */
export function searchSite(index, query, limit = 8) {
  const normalized = String(query || '').trim().toLowerCase();
  const terms = normalized.split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  return (index || [])
    .filter((entry) => terms.every((term) => entry.haystack.includes(term)))
    .map((entry, order) => ({
      entry,
      order,
      rank: entry.title.toLowerCase().includes(normalized) ? 0 : 1,
    }))
    .sort((a, b) => a.rank - b.rank || a.order - b.order)
    .slice(0, limit)
    .map(({ entry }) => entry);
}
