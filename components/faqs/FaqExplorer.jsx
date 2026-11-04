'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Box,
  ChevronDown,
  FolderOpen,
  Hammer,
  Headset,
  Layers,
  LayoutGrid,
  Minus,
  Plus,
  Search,
  Settings,
  Tag,
  X,
} from 'lucide-react';
import RequestQuoteLink from '@/components/contact/RequestQuoteLink';
import { ALL_QUESTIONS, FAQ_CATEGORY_LINKS, categoryKey, faqCategories, filterFaqs } from '@/lib/faqs';
import { FAQS_COPY } from '@/lib/seo/page-content';
import { useFitLayout, usePhoneLayout } from '@/lib/use-fit-layout';

const INITIAL_VISIBLE = 5;

const CATEGORY_ICONS = {
  [ALL_QUESTIONS]: LayoutGrid,
  services: Layers,
  materials: Box,
  installation: Hammer,
  maintenance: Settings,
  projects: FolderOpen,
};

function AccordionItem({ item, open, hidden, onToggle }) {
  const link = FAQ_CATEGORY_LINKS[categoryKey(item.category)];
  const questionId = `faq-q-${item.id}`;
  const answerId = `faq-a-${item.id}`;

  return (
    <li
      hidden={hidden}
      className={`rounded-card border transition-colors duration-200 ${
        open ? 'border-brand-line bg-brand-soft/70 shadow-neu-sm' : 'border-edge bg-surface-raised shadow-neu-sm'
      }`}
    >
      <h4>
        <button
          id={questionId}
          type="button"
          aria-expanded={open}
          aria-controls={answerId}
          onClick={onToggle}
          className="flex w-full items-center gap-3 sm:gap-4 max-sm:gap-2.5 rounded-card px-4 py-3.5 sm:px-5 max-sm:px-3 max-sm:py-2.5 fit:py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/40"
        >
          <span
            className={`inline-flex h-7 w-7 max-sm:h-6 max-sm:w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
              open ? 'bg-brand-solid text-white shadow-brand' : 'bg-brand-soft text-brand'
            }`}
          >
            {open ? <Minus className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
          </span>
          <span className={`min-w-0 flex-1 text-sm sm:text-[15px] max-sm:text-[13px] font-semibold leading-snug ${open ? 'text-brand' : 'text-ink'}`}>
            {item.question}
          </span>
          <span className={`inline-flex h-8 w-8 max-sm:h-6 max-sm:w-6 shrink-0 items-center justify-center rounded-full ${open ? 'bg-white dark:bg-surface-raised shadow-neu-sm text-ink' : 'text-ink'}`}>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden />
          </span>
        </button>
      </h4>
      <div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 max-sm:px-3 max-sm:pb-3 sm:pl-[3.75rem] sm:pr-16">
            <p className="text-sm max-sm:text-[13px] leading-relaxed max-sm:leading-snug text-ink-muted">{item.answer}</p>
            {link ? (
              <Link
                href={link.href}
                className="group mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand"
              >
                {link.label}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}

/**
 * Category sidebar, support card, search and single-open accordion for FAQ items. `fitScreen` (homepage
 * only) shows one question fewer before "Show more" on laptops and desktops.
 */
export default function FaqExplorer({ items = [], fitScreen = false }) {
  const categories = useMemo(() => faqCategories(items), [items]);
  const [category, setCategory] = useState(ALL_QUESTIONS);
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const { fit } = useFitLayout(fitScreen);
  const phone = usePhoneLayout(true);
  const initialVisible = fit || phone ? INITIAL_VISIBLE - 1 : INITIAL_VISIBLE;

  const filtered = useMemo(() => filterFaqs(items, { category, query }), [items, category, query]);
  // Items beyond the first few stay rendered (hidden) so every answer remains in the HTML.
  const visible = showAll ? filtered : filtered.slice(0, initialVisible);
  const hiddenCount = filtered.length - visible.length;
  const activeOpenId = visible.some((item) => item.id === openId) ? openId : null;

  function chooseCategory(key) {
    setCategory(key);
    setShowAll(false);
  }

  function search(value) {
    setQuery(value);
    setShowAll(false);
  }

  const categoryButton = (key, label, count) => {
    const active = category === key;
    const Icon = CATEGORY_ICONS[key] || Tag;
    return (
      <li key={key} className="shrink-0 lg:shrink">
        <button
          type="button"
          aria-pressed={active}
          onClick={() => chooseCategory(key)}
          className={`flex w-full items-center gap-3 whitespace-nowrap rounded-control px-3 py-2.5 max-sm:py-1.5 fit:py-1.5 text-left text-sm max-sm:text-[13px] transition-colors ${
            active ? 'bg-brand-soft font-semibold text-brand shadow-neu-sm' : 'text-ink hover:text-brand'
          }`}
        >
          <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-brand' : 'text-ink-muted'}`} strokeWidth={1.75} aria-hidden />
          <span className="min-w-0 lg:flex-1 lg:truncate">{label}</span>
          <span className="min-w-7 rounded-md bg-surface-raised px-1.5 py-0.5 text-center text-xs font-medium text-ink-muted shadow-neu-sm">
            {count}
          </span>
        </button>
      </li>
    );
  };

  return (
    <div className="grid gap-5 max-sm:gap-3 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[16.5rem_minmax(0,1fr)] lg:gap-7">
      <aside aria-label="FAQ categories" className="min-w-0 space-y-4 max-sm:space-y-2.5 fit:space-y-3 lg:self-start">
        <section aria-labelledby="faq-categories-title" className="surface-raised shadow-neu-sm rounded-card p-4 max-sm:p-3">
          <h3 id="faq-categories-title" className="px-1 text-base max-sm:text-sm font-semibold text-ink">
            {FAQS_COPY.categoriesHeading}
          </h3>
          <ul className="-mx-1 mt-3 max-sm:mt-2 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:block lg:space-y-1 lg:overflow-visible lg:px-0 lg:pb-0">
            {categoryButton(ALL_QUESTIONS, FAQS_COPY.allQuestions, items.length)}
            {categories.map(({ key, label, count }) => categoryButton(key, label, count))}
          </ul>
        </section>

        <div className="surface-raised shadow-neu-sm rounded-card flex items-center gap-4 max-sm:gap-3 p-4 max-sm:p-3 fit:py-3.5">
          <span className="icon-well h-14 w-14 max-sm:h-10 max-sm:w-10 fit:h-12 fit:w-12">
            <Headset className="h-6 w-6 max-sm:h-5 max-sm:w-5" strokeWidth={1.6} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] max-sm:text-sm font-semibold text-ink">{FAQS_COPY.supportHeading}</p>
            <p className="mt-0.5 text-xs text-ink-muted">{FAQS_COPY.supportText}</p>
            <RequestQuoteLink className="group mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
              {FAQS_COPY.contactCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </RequestQuoteLink>
          </div>
        </div>
      </aside>

      <div className="min-w-0 space-y-4 max-sm:space-y-3">
        <div className="flex flex-col gap-3 max-sm:gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg sm:text-xl max-sm:text-base font-bold tracking-tight text-ink">{FAQS_COPY.listHeading}</h3>
          <div className="relative w-full sm:w-72">
            <label htmlFor="faq-search" className="sr-only">
              Search questions
            </label>
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => search(e.target.value)}
              placeholder={FAQS_COPY.searchPlaceholder}
              className="h-10 w-full rounded-control border border-edge bg-surface-raised pl-4 pr-10 text-sm text-ink shadow-neu-sm placeholder:text-ink-muted/80 focus:outline-none focus:ring-2 focus:ring-brand/30 [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => search('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted hover:text-brand"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink" aria-hidden />
            )}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {filtered.length ? `${filtered.length} question${filtered.length === 1 ? '' : 's'} shown` : FAQS_COPY.noResultsTitle}
        </p>

        {filtered.length ? (
          <>
            <ul id="faq-list" className="space-y-3 max-sm:space-y-2 fit:space-y-2.5">
              {filtered.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  hidden={!showAll && index >= initialVisible}
                  open={item.id === activeOpenId}
                  onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
                />
              ))}
            </ul>
            {filtered.length > initialVisible ? (
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  aria-expanded={showAll}
                  aria-controls="faq-list"
                  onClick={() => setShowAll((v) => !v)}
                  className="btn-secondary h-10 rounded-full px-5 text-sm font-semibold text-brand"
                >
                  {showAll ? 'Show fewer questions' : `Show more questions (${hiddenCount} more)`}
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`} aria-hidden />
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="surface-raised shadow-neu-sm rounded-card px-6 py-12 text-center">
            <p className="text-base font-semibold text-ink">{items.length ? FAQS_COPY.noResultsTitle : FAQS_COPY.emptyText}</p>
            {items.length ? (
              <>
                <p className="mt-1 text-sm text-ink-muted">{FAQS_COPY.noResultsText}</p>
                <button
                  type="button"
                  onClick={() => {
                    search('');
                    chooseCategory(ALL_QUESTIONS);
                  }}
                  className="btn-primary mt-5 h-10 rounded-control px-5 text-sm"
                >
                  Show all questions
                </button>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
