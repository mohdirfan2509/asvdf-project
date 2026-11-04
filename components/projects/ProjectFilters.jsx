'use client';

import { useEffect, useRef, useState } from 'react';
import { Funnel } from 'lucide-react';
import { ALL_CATEGORIES, AREA_BANDS } from '@/lib/projects';

const selectClass =
  'w-full surface-inset rounded-control px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30';

/**
 * Category pills plus a "Filter" popover for location (and optionally project size).
 * `segmented` groups the pills in one raised track; the popover button is hidden when it has nothing to offer.
 */
export default function ProjectFilters({
  categories,
  cities,
  filters,
  onChange,
  idPrefix = 'project',
  groupLabel = 'Filter projects by category',
  panelLabel = 'More project filters',
  showArea = true,
  segmented = false,
}) {
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  const panelId = `${idPrefix}-filter-panel`;
  const extraCount = (filters.city ? 1 : 0) + (showArea && filters.area ? 1 : 0);
  const hasPanel = showArea || cities.length > 0;

  useEffect(() => {
    if (!panelOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setPanelOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (e) => {
      if (panelRef.current?.contains(e.target) || buttonRef.current?.contains(e.target)) return;
      setPanelOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [panelOpen]);

  const pill = (key, label) => {
    const active = filters.category === key;
    const look = segmented
      ? active
        ? 'btn-primary'
        : 'font-medium text-ink transition-colors hover:text-brand'
      : active
        ? 'btn-primary'
        : // On phones the pills sit in one raised track, so the inactive ones drop their own card look.
          'btn-secondary font-medium max-sm:border-transparent max-sm:bg-transparent max-sm:shadow-none';
    return (
      <button
        key={key}
        type="button"
        aria-pressed={active}
        onClick={() => onChange({ category: key })}
        className={`shrink-0 h-9 sm:h-10 max-sm:h-8 rounded-full px-4 sm:px-5 max-sm:px-3.5 text-sm max-sm:text-[13px] ${look}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="relative flex items-center gap-3 max-sm:gap-2">
      <div className={`min-w-0 ${segmented ? 'flex-1 sm:flex-initial' : 'flex-1'}`}>
        <div
          role="group"
          aria-label={groupLabel}
          className={
            segmented
              ? 'surface-raised shadow-neu-sm flex gap-1 sm:gap-1.5 overflow-x-auto rounded-full p-1.5 max-sm:p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
              : 'flex gap-2 sm:gap-3 overflow-x-auto p-1.5 -m-1.5 max-sm:m-0 max-sm:gap-1 max-sm:p-1 max-sm:rounded-full max-sm:border max-sm:border-edge max-sm:bg-surface-raised max-sm:shadow-neu-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          }
        >
          {pill(ALL_CATEGORIES, 'All Projects')}
          {categories.map(({ key, label }) => pill(key, label))}
        </div>
      </div>

      {hasPanel ? (
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={panelOpen}
          aria-controls={panelId}
          onClick={() => setPanelOpen((open) => !open)}
          className="btn-secondary shrink-0 h-9 sm:h-10 max-sm:h-10 max-sm:min-w-10 max-sm:px-2.5 rounded-control max-sm:rounded-full px-3 sm:px-4 text-sm font-medium sm:ml-auto"
        >
          <Funnel className="h-4 w-4" strokeWidth={1.75} />
          <span className="hidden sm:inline">Filter</span>
          <span className="sr-only sm:hidden">Filter</span>
          {extraCount ? (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-solid px-1 text-[11px] font-semibold text-white">
              {extraCount}
            </span>
          ) : null}
        </button>
      ) : null}

      {hasPanel && panelOpen ? (
        <div
          ref={panelRef}
          id={panelId}
          role="region"
          aria-label={panelLabel}
          className="absolute right-0 top-full z-20 mt-3 w-[min(20rem,calc(100vw-2rem))] surface-raised shadow-neu-lg rounded-card p-4 space-y-4"
        >
          <div>
            <label htmlFor={`${idPrefix}-filter-city`} className="mb-1.5 block text-xs font-semibold text-ink-muted">
              Location
            </label>
            <select
              id={`${idPrefix}-filter-city`}
              value={filters.city}
              onChange={(e) => onChange({ city: e.target.value })}
              className={selectClass}
            >
              <option value="">All locations</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          {showArea ? (
            <div>
              <label htmlFor={`${idPrefix}-filter-area`} className="mb-1.5 block text-xs font-semibold text-ink-muted">
                Project size
              </label>
              <select
                id={`${idPrefix}-filter-area`}
                value={filters.area}
                onChange={(e) => onChange({ area: e.target.value })}
                className={selectClass}
              >
                <option value="">Any size</option>
                {AREA_BANDS.map((band) => (
                  <option key={band.id} value={band.id}>
                    {band.label}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => onChange({ city: '', area: '' })}
              disabled={!extraCount}
              className="text-sm font-semibold text-brand disabled:text-ink-muted/60"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                setPanelOpen(false);
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
