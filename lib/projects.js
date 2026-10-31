/** Filtering and pagination for the public projects gallery. Pure functions — no React. */

export const ALL_CATEGORIES = 'all';
export const PROJECTS_PER_PAGE = 8;

/** Categories always offered as filters, in display order; CMS categories outside this list are appended. */
export const PROJECT_CATEGORIES = ['Industrial', 'Commercial', 'Infrastructure', 'Retail', 'Logistics'];

export const AREA_BANDS = [
  { id: 'under-20k', label: 'Under 20,000 sq.ft', test: (sqft) => sqft < 20000 },
  { id: '20k-40k', label: '20,000 – 40,000 sq.ft', test: (sqft) => sqft >= 20000 && sqft <= 40000 },
  { id: 'over-40k', label: 'Over 40,000 sq.ft', test: (sqft) => sqft > 40000 },
];

export function categoryKey(value) {
  return String(value || '').trim().toLowerCase();
}

export function projectCategories(projects = []) {
  const byKey = new Map(PROJECT_CATEGORIES.map((label) => [categoryKey(label), label]));
  projects.forEach((project) => {
    const key = categoryKey(project.category);
    if (key && !byKey.has(key)) byKey.set(key, String(project.category).trim());
  });
  return [...byKey].map(([key, label]) => ({ key, label }));
}

export function projectCities(projects = []) {
  const cities = new Set(
    projects.map((project) => String(project.location || '').trim()).filter(Boolean)
  );
  return [...cities].sort((a, b) => a.localeCompare(b));
}

/** Reads the first number in an area string such as "45,000 sq.ft"; null when absent. */
export function parseAreaSqft(area) {
  const match = String(area || '').replace(/,/g, '').match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

export function filterProjects(projects = [], { category = ALL_CATEGORIES, city = '', area = '' } = {}) {
  const band = AREA_BANDS.find((b) => b.id === area);
  return projects.filter((project) => {
    if (category !== ALL_CATEGORIES && categoryKey(project.category) !== category) return false;
    if (city && String(project.location || '').trim() !== city) return false;
    if (band) {
      const sqft = parseAreaSqft(project.area);
      if (sqft === null || !band.test(sqft)) return false;
    }
    return true;
  });
}

export function paginate(items = [], page = 1, perPage = PROJECTS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, Math.floor(Number(page)) || 1), totalPages);
  const start = (current - 1) * perPage;
  return { items: items.slice(start, start + perPage), page: current, totalPages, start };
}

/** Page buttons in the style "1 2 3 … 10"; gaps are returned as the string 'ellipsis'. */
export function pageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current - 1, current, current + 1]);
  if (current <= 3) [2, 3].forEach((p) => pages.add(p));
  if (current >= total - 2) [total - 2, total - 1].forEach((p) => pages.add(p));

  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result = [];
  sorted.forEach((p, i) => {
    const prev = sorted[i - 1];
    if (prev && p - prev === 2) result.push(prev + 1);
    else if (prev && p - prev > 2) result.push('ellipsis');
    result.push(p);
  });
  return result;
}
