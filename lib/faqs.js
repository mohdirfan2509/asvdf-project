/** FAQ helpers shared by the FAQ section and admin. Pure functions — no React. */

export const ALL_QUESTIONS = 'all';

/** Sidebar categories in display order; CMS categories outside this list are appended. */
export const FAQ_CATEGORIES = ['Services', 'Materials', 'Installation', 'Maintenance', 'Projects'];

/** Internal link shown under answers in each category. */
export const FAQ_CATEGORY_LINKS = {
  services: { href: '/#services', label: 'Explore our services' },
  materials: { href: '/#services', label: 'Explore our services' },
  installation: { href: '/#contact', label: 'Discuss your project' },
  maintenance: { href: '/#services', label: 'Explore our services' },
  projects: { href: '/#projects', label: 'View our projects' },
};

export function categoryKey(value) {
  return String(value || '').trim().toLowerCase();
}

/** Card-ready FAQ with a lowercase `searchText` covering question, answer, category and keywords. */
export function toFaqItem(faq) {
  const keywords = Array.isArray(faq.keywords) ? faq.keywords.join(' ') : String(faq.keywords || '');
  return {
    id: String(faq.id || faq.question),
    question: faq.question,
    answer: faq.answer,
    category: String(faq.category || '').trim(),
    searchText: [faq.question, faq.answer, faq.category, keywords].join(' ').toLowerCase(),
  };
}

export function faqCategories(items = []) {
  const counts = new Map();
  items.forEach((item) => {
    const key = categoryKey(item.category);
    if (key) counts.set(key, (counts.get(key) || 0) + 1);
  });
  const labels = new Map(FAQ_CATEGORIES.map((label) => [categoryKey(label), label]));
  items.forEach((item) => {
    const key = categoryKey(item.category);
    if (key && !labels.has(key)) labels.set(key, item.category);
  });
  return [...labels].map(([key, label]) => ({ key, label, count: counts.get(key) || 0 }));
}

export function filterFaqs(items = [], { category = ALL_QUESTIONS, query = '' } = {}) {
  const terms = String(query).toLowerCase().split(/\s+/).filter(Boolean);
  return items.filter((item) => {
    if (category !== ALL_QUESTIONS && categoryKey(item.category) !== category) return false;
    return terms.every((term) => item.searchText.includes(term));
  });
}
