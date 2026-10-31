/** Blog helpers shared by the Blogs section and article pages. Pure functions — no React. */

export const ALL_POSTS = 'all';
export const BLOGS_PER_PAGE = 6;
export const WORDS_PER_MINUTE = 200;

/** Sidebar categories in display order; categories found in the CMS but not listed here are appended. */
export const BLOG_CATEGORIES = [
  'Industrial Flooring',
  'Flooring Solutions',
  'Case Studies',
  'Maintenance Tips',
  'Industry Insights',
];

export const READING_TIME_BANDS = [
  { id: 'quick', label: 'Quick reads (1 min)', test: (minutes) => minutes < 2 },
  { id: 'long', label: '2 min and over', test: (minutes) => minutes >= 2 },
];

export const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest first' },
  { id: 'oldest', label: 'Oldest first' },
];

export function categoryKey(value) {
  return String(value || '').trim().toLowerCase();
}

/** Tags may be stored as an array (seed data) or a comma-separated string (admin form). */
export function blogTags(blog = {}) {
  const raw = Array.isArray(blog.tags) ? blog.tags : String(blog.tags || '').split(',');
  return [...new Set(raw.map((tag) => String(tag).trim()).filter(Boolean))];
}

export function readingMinutes(text = '') {
  const words = String(text).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function formatBlogDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC' });
}

/** Card-ready summary of a CMS blog row; `searchText` covers title, excerpt, body, category and tags. */
export function toBlogSummary(blog) {
  const tags = blogTags(blog);
  return {
    id: blog.id || blog.slug,
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt || '',
    cover: blog.cover || '',
    category: String(blog.category || '').trim(),
    tags,
    publishedAt: blog.published_at || '',
    readingMinutes: readingMinutes(blog.body || blog.excerpt),
    searchText: [blog.title, blog.excerpt, blog.body, blog.category, tags.join(' ')]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  };
}

export function blogCategories(posts = []) {
  const counts = new Map();
  posts.forEach((post) => {
    const key = categoryKey(post.category);
    if (key) counts.set(key, (counts.get(key) || 0) + 1);
  });
  const labels = new Map(BLOG_CATEGORIES.map((label) => [categoryKey(label), label]));
  posts.forEach((post) => {
    const key = categoryKey(post.category);
    if (key && !labels.has(key)) labels.set(key, post.category);
  });
  return [...labels].map(([key, label]) => ({ key, label, count: counts.get(key) || 0 }));
}

/** Tags ordered by how many posts use them, then alphabetically. */
export function popularTags(posts = [], limit = 8) {
  const counts = new Map();
  posts.forEach((post) => post.tags.forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1)));
  return [...counts]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag]) => tag);
}

export function filterBlogs(posts = [], { category = ALL_POSTS, tag = '', query = '', reading = '', sort = 'newest' } = {}) {
  const band = READING_TIME_BANDS.find((b) => b.id === reading);
  const terms = String(query).toLowerCase().split(/\s+/).filter(Boolean);
  const result = posts.filter((post) => {
    if (category !== ALL_POSTS && categoryKey(post.category) !== category) return false;
    if (tag && !post.tags.includes(tag)) return false;
    if (band && !band.test(post.readingMinutes)) return false;
    return terms.every((term) => post.searchText.includes(term));
  });
  const direction = sort === 'oldest' ? 1 : -1;
  return result.sort((a, b) => direction * String(a.publishedAt).localeCompare(String(b.publishedAt)));
}

/** Splits an article body into blocks: "## " headings, runs of "- " list items, and paragraphs. */
export function parseArticleBody(body = '') {
  return String(body)
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .flatMap((chunk) => {
      if (chunk.startsWith('## ')) return [{ type: 'heading', text: chunk.slice(3).trim() }];
      const lines = chunk.split('\n').map((line) => line.trim());
      if (lines.every((line) => line.startsWith('- '))) {
        return [{ type: 'list', items: lines.map((line) => line.slice(2).trim()) }];
      }
      return [{ type: 'paragraph', text: chunk }];
    });
}
