import { SERVICE_NAV } from '@/lib/seo/routes';
import { SERVICE_AREAS } from '@/lib/seo/company';
import { blogTags } from '@/lib/blogs';

/**
 * "Related pages" for an article, picked from the site's service, guide and location pages by how
 * strongly each page's name words appear in the article. Pages whose words appear in most articles
 * count for less, so every article leads with the pages specific to it.
 */

const MAX_TOPIC_LINKS = 4;
const MAX_LOCATION_LINKS = 1;
const MIN_SCORE = 1;
const MAX_COUNT_PER_FIELD = 3;

/** Article fields in order of how much a match counts. */
const FIELD_WEIGHTS = { tags: 4, title: 3, category: 2, excerpt: 2, body: 1 };

/** Words in page names that say nothing about the topic. */
const GENERIC_WORDS = new Set([
  'flooring', 'floor', 'floors', 'application', 'service', 'services', 'cutting', 'filling', 'factors', 'in', 'the', 'and', 'of',
]);

const FILLER_LINKS = [
  { href: '/services', label: 'All flooring services' },
  { href: '/vdf-flooring', label: 'VDF Flooring' },
  { href: '/industrial-flooring', label: 'Industrial Flooring' },
  { href: '/concrete-flooring', label: 'Concrete Flooring' },
];
const CLOSING_LINKS = [
  { href: '/projects', label: 'Our projects' },
  { href: '/contact', label: 'Request a quotation' },
];

const normalize = (text) => ` ${String(text || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ')} `;

/** "polishing" → "polish", "contractors" → "contractor"; matched as a word prefix so plurals count. */
function stem(word) {
  if (word.length > 6 && word.endsWith('ing')) return word.slice(0, -3);
  if (word.length > 4 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
}

/** Each alternative is a list of stems that must all appear; "A & B" names give two alternatives. */
function alternativesFrom(...names) {
  return names
    .flatMap((name) => String(name).split('&'))
    .map((part) =>
      normalize(part)
        .trim()
        .split(' ')
        .filter((word) => word && !GENERIC_WORDS.has(word))
        .map(stem)
    )
    .filter((stems) => stems.length);
}

const PAGE_CATALOG = [
  ...SERVICE_NAV.map((item) => ({ ...item, kind: 'topic', alternatives: alternativesFrom(item.label) })),
  ...SERVICE_AREAS.map((area) => ({
    href: area.path,
    label: `VDF flooring in ${area.name}`,
    kind: 'location',
    alternatives: alternativesFrom(area.name, area.path.replace('/vdf-flooring-', '')),
  })),
].filter((page, index, all) => page.alternatives.length && all.findIndex((other) => other.href === page.href) === index);

function occurrences(text, stems) {
  return Math.min(...stems.map((s) => (text.match(new RegExp(` ${s}[a-z0-9]*`, 'g')) || []).length));
}

function articleFields(blog) {
  return {
    tags: normalize(blogTags(blog).join(' . ')),
    title: normalize(blog.title),
    category: normalize(blog.category),
    excerpt: normalize(blog.excerpt),
    body: normalize(blog.body),
  };
}

function rawScore(page, fields) {
  return Object.entries(FIELD_WEIGHTS).reduce((total, [field, weight]) => {
    const count = Math.max(...page.alternatives.map((stems) => occurrences(fields[field], stems)));
    return total + weight * Math.min(count, MAX_COUNT_PER_FIELD);
  }, 0);
}

/** Up to four pages matched to the article, then the projects and quotation pages. */
export function relatedPages(blog, blogs = []) {
  const corpus = (blogs.length ? blogs : [blog]).map(articleFields);
  const fields = articleFields(blog);

  const ranked = PAGE_CATALOG.map((page, order) => {
    const score = rawScore(page, fields);
    const articlesMentioning = corpus.filter((other) => rawScore(page, other) > 0).length || 1;
    return { page, order, score, weighted: score * Math.log(1 + corpus.length / articlesMentioning) };
  })
    .filter(({ score }) => score >= MIN_SCORE)
    .sort((a, b) => b.weighted - a.weighted || a.order - b.order);

  const picked = [];
  let locations = 0;
  for (const { page } of ranked) {
    if (picked.length === MAX_TOPIC_LINKS) break;
    if (page.kind === 'location' && locations >= MAX_LOCATION_LINKS) continue;
    if (page.kind === 'location') locations += 1;
    picked.push({ href: page.href, label: page.label });
  }
  for (const filler of FILLER_LINKS) {
    if (picked.length < MAX_TOPIC_LINKS && !picked.some((link) => link.href === filler.href)) picked.push(filler);
  }
  return [...picked, ...CLOSING_LINKS];
}
