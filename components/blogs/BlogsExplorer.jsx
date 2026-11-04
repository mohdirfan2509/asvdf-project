'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronDown,
  FileText,
  Funnel,
  Layers,
  LayoutGrid,
  Ruler,
  Search,
  Tag,
  TrendingUp,
  Wrench,
  X,
} from 'lucide-react';
import BlogCard from '@/components/blogs/BlogCard';
import ProjectPagination from '@/components/projects/ProjectPagination';
import {
  ALL_POSTS,
  BLOGS_PER_PAGE,
  READING_TIME_BANDS,
  SORT_OPTIONS,
  blogCategories,
  filterBlogs,
  popularTags,
} from '@/lib/blogs';
import { paginate } from '@/lib/projects';
import { BLOGS_COPY } from '@/lib/seo/page-content';
import { useFitLayout, usePhoneLayout } from '@/lib/use-fit-layout';
import ViewAllButton from '@/components/ui/ViewAllButton';

const CATEGORY_ICONS = {
  [ALL_POSTS]: LayoutGrid,
  'industrial flooring': Layers,
  'flooring solutions': Ruler,
  'case studies': FileText,
  'maintenance tips': Wrench,
  'industry insights': TrendingUp,
};

const DEFAULTS = { category: ALL_POSTS, tag: '', query: '', reading: '', sort: 'newest' };
const MENU_ID = 'blog-filter-menu';

const selectClass =
  'w-full surface-inset rounded-control px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30';

/**
 * Sidebar panel that collapses behind a toggle below the desktop breakpoint; with `collapseOnFit` it also
 * collapses on the one-screen homepage on laptops and desktops.
 */
function SidebarPanel({ id, title, summary, open, onToggle, collapseOnFit = false, children }) {
  return (
    <section aria-labelledby={`${id}-title`} className="surface-raised shadow-neu-sm rounded-card p-4 max-sm:px-3.5 max-sm:py-3 fit:p-3.5">
      <h3 id={`${id}-title`} className={`hidden px-1 text-base font-semibold text-ink lg:block ${collapseOnFit ? 'fit:hidden' : ''}`}>
        {title}
      </h3>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className={`flex w-full items-center justify-between gap-3 px-1 text-left lg:hidden ${collapseOnFit ? 'fit:flex' : ''}`}
      >
        <span className="text-base font-semibold text-ink">
          {title}
          {summary ? <span className="ml-2 text-sm font-medium text-brand">· {summary}</span> : null}
        </span>
        <ChevronDown className={`h-4 w-4 text-ink-muted transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      <div id={id} className={`mt-3 ${open ? 'block' : 'hidden'} lg:block ${collapseOnFit && !open ? 'fit:hidden' : ''}`}>
        {children}
      </div>
    </section>
  );
}

function FilterMenu({ filters, onChange }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const activeCount = (filters.reading ? 1 : 0) + (filters.sort !== DEFAULTS.sort ? 1 : 0);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (e) => {
      if (menuRef.current?.contains(e.target) || buttonRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <div className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={MENU_ID}
        onClick={() => setOpen((v) => !v)}
        className="btn-secondary h-10 rounded-control px-3 sm:px-4 text-sm font-medium"
      >
        <Funnel className="h-4 w-4" strokeWidth={1.75} />
        <span>Filter</span>
        {activeCount ? (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-solid px-1 text-[11px] font-semibold text-white">
            {activeCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          ref={menuRef}
          id={MENU_ID}
          role="region"
          aria-label="More blog filters"
          className="absolute right-0 top-full z-20 mt-3 w-[min(18rem,calc(100vw-2rem))] surface-raised shadow-neu-lg rounded-card p-4 space-y-4"
        >
          <div>
            <label htmlFor="blog-filter-sort" className="mb-1.5 block text-xs font-semibold text-ink-muted">
              Sort by
            </label>
            <select
              id="blog-filter-sort"
              value={filters.sort}
              onChange={(e) => onChange({ sort: e.target.value })}
              className={selectClass}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="blog-filter-reading" className="mb-1.5 block text-xs font-semibold text-ink-muted">
              Reading time
            </label>
            <select
              id="blog-filter-reading"
              value={filters.reading}
              onChange={(e) => onChange({ reading: e.target.value })}
              className={selectClass}
            >
              <option value="">Any length</option>
              {READING_TIME_BANDS.map((band) => (
                <option key={band.id} value={band.id}>
                  {band.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => onChange({ sort: DEFAULTS.sort, reading: '' })}
              disabled={!activeCount}
              className="text-sm font-semibold text-brand disabled:text-ink-muted/60"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              className="btn-primary h-9 rounded-control px-4 text-sm"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Articles shown on the homepage on phones before "View all articles". */
const PHONE_PREVIEW = 2;

/**
 * Category sidebar, tags, search, filters, article grid and pagination for blog summaries. `fitScreen`
 * (homepage only) shows one row of articles per page on laptops and desktops, and on phones a short
 * preview with a link to /blog.
 */
export default function BlogsExplorer({ posts = [], fitScreen = false }) {
  const categories = useMemo(() => blogCategories(posts), [posts]);
  const tags = useMemo(() => popularTags(posts), [posts]);
  const [filters, setFilters] = useState(DEFAULTS);
  const [requestedPage, setRequestedPage] = useState(1);
  const [panels, setPanels] = useState({ categories: false, tags: false });
  const topRef = useRef(null);
  const { fit } = useFitLayout(fitScreen);
  const phonePreview = usePhoneLayout(fitScreen);
  const perPage = fit ? 3 : BLOGS_PER_PAGE;

  const filtered = useMemo(() => filterBlogs(posts, filters), [posts, filters]);
  const paged = paginate(filtered, requestedPage, perPage);
  const { page, totalPages } = paged;
  const start = phonePreview ? 0 : paged.start;
  const items = phonePreview ? filtered.slice(0, PHONE_PREVIEW) : paged.items;
  const activeCategory = categories.find((c) => c.key === filters.category);
  const narrowed = Boolean(filters.tag || filters.query.trim() || filters.reading);

  function update(patch) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setRequestedPage(1);
  }

  function goToPage(next) {
    setRequestedPage(next);
    const top = topRef.current?.getBoundingClientRect().top;
    if (top !== undefined && top < 96) topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const categoryButton = (key, label, count) => {
    const active = filters.category === key;
    const Icon = CATEGORY_ICONS[key] || Tag;
    return (
      <li key={key}>
        <button
          type="button"
          aria-pressed={active}
          onClick={() => update({ category: key })}
          className={`flex w-full items-center gap-3 rounded-control px-3 py-2.5 fit:py-2 text-left text-sm transition-colors ${
            active ? 'bg-brand-soft font-semibold text-brand shadow-neu-sm' : 'text-ink hover:text-brand'
          }`}
        >
          <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-brand' : 'text-ink-muted'}`} strokeWidth={1.75} aria-hidden />
          <span className="min-w-0 flex-1 truncate">{label}</span>
          <span className="min-w-7 rounded-md bg-surface-raised px-1.5 py-0.5 text-center text-xs font-medium text-ink-muted shadow-neu-sm">
            {count}
          </span>
        </button>
      </li>
    );
  };

  return (
    <div className="grid gap-5 max-sm:gap-3 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[16.5rem_minmax(0,1fr)] lg:gap-7">
      <aside aria-label="Blog categories and tags" className="space-y-4 max-sm:space-y-2 fit:space-y-3 lg:self-start">
        <SidebarPanel
          id="blog-categories"
          title={BLOGS_COPY.categoriesHeading}
          summary={activeCategory?.label || BLOGS_COPY.allPosts}
          open={panels.categories}
          onToggle={() => setPanels((p) => ({ ...p, categories: !p.categories }))}
        >
          <ul className="space-y-1">
            {categoryButton(ALL_POSTS, BLOGS_COPY.allPosts, posts.length)}
            {categories.map(({ key, label, count }) => categoryButton(key, label, count))}
          </ul>
        </SidebarPanel>

        {tags.length ? (
          <SidebarPanel
            id="blog-tags"
            title={BLOGS_COPY.tagsHeading}
            summary={filters.tag}
            open={panels.tags}
            onToggle={() => setPanels((p) => ({ ...p, tags: !p.tags }))}
            collapseOnFit
          >
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const active = filters.tag === tag;
                return (
                  <li key={tag}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => update({ tag: active ? '' : tag })}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        active
                          ? 'bg-brand-solid text-white shadow-brand'
                          : 'bg-surface text-ink-muted shadow-neu-sm hover:text-brand'
                      }`}
                    >
                      {tag}
                    </button>
                  </li>
                );
              })}
            </ul>
          </SidebarPanel>
        ) : null}
      </aside>

      <div ref={topRef} className="min-w-0 scroll-mt-28 space-y-5 max-sm:space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-muted" aria-live="polite">
            {filtered.length
              ? `Showing ${start + 1}–${start + items.length} of ${filtered.length} article${filtered.length === 1 ? '' : 's'}`
              : 'No matching articles'}
          </p>
          <div className="flex items-center gap-3">
            <div className="relative min-w-0 flex-1 sm:w-64 sm:flex-none">
              <label htmlFor="blog-search" className="sr-only">
                Search blogs
              </label>
              <input
                id="blog-search"
                type="search"
                value={filters.query}
                onChange={(e) => update({ query: e.target.value })}
                placeholder={BLOGS_COPY.searchPlaceholder}
                className="h-10 w-full rounded-control border border-edge bg-surface-raised pl-4 pr-10 text-sm text-ink shadow-neu-sm placeholder:text-ink-muted/80 focus:outline-none focus:ring-2 focus:ring-brand/30 [&::-webkit-search-cancel-button]:hidden"
              />
              {filters.query ? (
                <button
                  type="button"
                  onClick={() => update({ query: '' })}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted hover:text-brand"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink" aria-hidden />
              )}
            </div>
            <FilterMenu filters={filters} onChange={update} />
          </div>
        </div>

        {filters.tag ? (
          <p className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
            Tag:
            <button
              type="button"
              onClick={() => update({ tag: '' })}
              className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 font-semibold text-brand"
            >
              {filters.tag}
              <X className="h-3 w-3" aria-hidden />
              <span className="sr-only">(remove tag filter)</span>
            </button>
          </p>
        ) : null}

        {items.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-sm:gap-3 lg:gap-5">
            {items.map((post, index) => (
              <li key={post.id} className="h-full">
                <BlogCard post={post} eager={page === 1 && index < 3} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="surface-raised shadow-neu-sm rounded-card px-6 py-12 text-center">
            {narrowed || !posts.length ? (
              <>
                <p className="text-base font-semibold text-ink">
                  {posts.length ? BLOGS_COPY.noResultsTitle : BLOGS_COPY.emptyText}
                </p>
                {posts.length ? <p className="mt-1 text-sm text-ink-muted">{BLOGS_COPY.noResultsText}</p> : null}
              </>
            ) : (
              <>
                <p className="text-base font-semibold text-ink">No {activeCategory?.label || ''} articles yet.</p>
                <p className="mt-1 text-sm text-ink-muted">{BLOGS_COPY.emptyCategoryText}</p>
              </>
            )}
            {posts.length ? (
              <button
                type="button"
                onClick={() => update(DEFAULTS)}
                className="btn-primary mt-5 h-10 rounded-control px-5 text-sm"
              >
                {narrowed ? 'Clear Filters' : 'Show all posts'}
              </button>
            ) : null}
          </div>
        )}

        {phonePreview ? (
          filtered.length > PHONE_PREVIEW ? <ViewAllButton href="/blog">View all articles</ViewAllButton> : null
        ) : (
          <ProjectPagination page={page} totalPages={totalPages} onChange={goToPage} label="Blog pages" keepArrows />
        )}
      </div>
    </div>
  );
}