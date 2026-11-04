'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import ProjectFilters from '@/components/projects/ProjectFilters';
import ProjectPagination from '@/components/projects/ProjectPagination';
import GalleryLightbox from '@/components/gallery/GalleryLightbox';
import { ALL_CATEGORIES, filterProjects, paginate, projectCategories, projectCities } from '@/lib/projects';
import { GALLERY_COPY } from '@/lib/seo/page-content';
import { usePhoneLayout } from '@/lib/use-fit-layout';
import ViewAllButton from '@/components/ui/ViewAllButton';

const PER_PAGE = 12;
/** On phones: two rows of two, and "Show more" adds two rows at a time. */
const PHONE_STEP = 4;
const DEFAULT_FILTERS = { category: ALL_CATEGORIES, city: '', area: '' };

/** Category/location filters, paginated photo grid and lightbox for gallery photos. */
export default function GalleryExplorer({ images = [] }) {
  // Gallery photos carry the same `category` / `location` fields as projects, so the project helpers apply.
  const photos = useMemo(() => images.map((photo) => ({ ...photo, location: photo.location || '' })), [images]);
  const categories = useMemo(() => projectCategories(photos), [photos]);
  const locations = useMemo(() => projectCities(photos), [photos]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [requestedPage, setRequestedPage] = useState(1);
  const [viewerIndex, setViewerIndex] = useState(null);
  const [phoneCount, setPhoneCount] = useState(PHONE_STEP);
  const topRef = useRef(null);
  const phone = usePhoneLayout(true);

  const filtered = useMemo(() => filterProjects(photos, filters), [photos, filters]);
  const paged = paginate(filtered, requestedPage, PER_PAGE);
  const { page, totalPages } = paged;
  const start = phone ? 0 : paged.start;
  const items = phone ? filtered.slice(0, phoneCount) : paged.items;
  const closeViewer = useCallback(() => setViewerIndex(null), []);

  function updateFilters(patch) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setRequestedPage(1);
    setPhoneCount(PHONE_STEP);
  }

  function goToPage(nextPage) {
    setRequestedPage(nextPage);
    const top = topRef.current?.getBoundingClientRect().top;
    if (top !== undefined && top < 96) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div ref={topRef} className="scroll-mt-28 space-y-5 sm:space-y-6 max-sm:space-y-3 fit:space-y-3">
      <ProjectFilters
        categories={categories}
        cities={locations}
        filters={filters}
        onChange={updateFilters}
        idPrefix="gallery"
        groupLabel="Filter gallery photos by category"
        panelLabel="More gallery filters"
        showArea={false}
        segmented
      />

      <p className="sr-only" aria-live="polite">
        {filtered.length
          ? `Showing photos ${start + 1} to ${start + items.length} of ${filtered.length}`
          : 'No photos match the selected filters'}
      </p>

      {items.length ? (
        <ul className="grid grid-cols-1 min-[22.5rem]:grid-cols-2 max-sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-sm:gap-2 fit:gap-3">
          {items.map((photo, index) => (
            <li key={photo.id || photo.image}>
              <div className="group relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[23/10] fit:aspect-[14/5] overflow-hidden rounded-card bg-surface-sunken shadow-neu-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.image}
                  alt={photo.title || 'ASVDF Flooring project photo'}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <button
                  type="button"
                  onClick={() => setViewerIndex(start + index)}
                  aria-haspopup="dialog"
                  aria-label={`View ${photo.title || 'photo'} larger`}
                  className="absolute inset-0 rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
                >
                  <span className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 max-sm:bottom-1.5 max-sm:right-1.5 inline-flex h-9 w-9 max-sm:h-7 max-sm:w-7 items-center justify-center rounded-full bg-white/95 text-brand-solid shadow-float transition-transform duration-200 group-hover:scale-110">
                    <Maximize2 className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="surface-raised shadow-neu-sm rounded-card px-6 py-12 text-center">
          <p className="text-base font-semibold text-ink">{GALLERY_COPY.emptyTitle}</p>
          <p className="mt-1 text-sm text-ink-muted">{GALLERY_COPY.emptyText}</p>
          <button
            type="button"
            onClick={() => updateFilters(DEFAULT_FILTERS)}
            className="btn-primary mt-5 h-10 rounded-control px-5 text-sm"
          >
            Show all photos
          </button>
        </div>
      )}

      {phone ? (
        filtered.length > items.length ? (
          <ViewAllButton onClick={() => setPhoneCount((count) => count + PHONE_STEP)}>
            Show more photos ({filtered.length - items.length})
          </ViewAllButton>
        ) : null
      ) : (
        <ProjectPagination page={page} totalPages={totalPages} onChange={goToPage} label="Gallery pages" />
      )}

      <GalleryLightbox images={filtered} index={viewerIndex} onIndexChange={setViewerIndex} onClose={closeViewer} />
    </div>
  );
}
