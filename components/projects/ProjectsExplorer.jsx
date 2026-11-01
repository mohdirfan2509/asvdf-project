'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectFilters from '@/components/projects/ProjectFilters';
import ProjectModal from '@/components/projects/ProjectModal';
import ProjectPagination from '@/components/projects/ProjectPagination';
import {
  ALL_CATEGORIES,
  AREA_BANDS,
  PROJECTS_PER_PAGE,
  filterProjects,
  paginate,
  projectCategories,
  projectCities,
} from '@/lib/projects';
import { OPEN_PROJECT_EVENT } from '@/lib/project-link';
import { projectSlug } from '@/lib/seo/slug';

const DEFAULT_FILTERS = { category: ALL_CATEGORIES, city: '', area: '' };

export default function ProjectsExplorer({ projects = [] }) {
  const categories = useMemo(() => projectCategories(projects), [projects]);
  const cities = useMemo(() => projectCities(projects), [projects]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [requestedPage, setRequestedPage] = useState(1);
  const [urlReady, setUrlReady] = useState(false);
  const [selected, setSelected] = useState(null);
  const topRef = useRef(null);

  const filtered = useMemo(() => filterProjects(projects, filters), [projects, filters]);
  const { items, page, totalPages, start } = paginate(filtered, requestedPage, PROJECTS_PER_PAGE);

  // The server renders the unfiltered first page; shared links restore their view after hydration.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const city = params.get('city');
    const area = params.get('area');
    setFilters({
      category: categories.some((c) => c.key === category) ? category : ALL_CATEGORIES,
      city: cities.includes(city) ? city : '',
      area: AREA_BANDS.some((band) => band.id === area) ? area : '',
    });
    setRequestedPage(Number(params.get('page')) || 1);
    setUrlReady(true);
  }, [categories, cities]);

  // Links like /projects?project=<slug> (old project pages, site search) open that project's pop-up,
  // on page load and when the site search picks a project on this same page.
  useEffect(() => {
    const open = (slug) => slug && setSelected(projects.find((project) => projectSlug(project) === slug) || null);
    open(new URLSearchParams(window.location.search).get('project'));
    const onOpen = (e) => open(e.detail);
    window.addEventListener(OPEN_PROJECT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, onOpen);
  }, [projects]);

  function closeProject() {
    setSelected(null);
    const params = new URLSearchParams(window.location.search);
    if (!params.has('project')) return;
    params.delete('project');
    const query = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
  }

  useEffect(() => {
    if (!urlReady) return;
    const params = new URLSearchParams(window.location.search);
    const values = {
      category: filters.category === ALL_CATEGORIES ? '' : filters.category,
      city: filters.city,
      area: filters.area,
      page: page > 1 ? String(page) : '',
    };
    Object.entries(values).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    const query = params.toString();
    const { pathname, search, hash } = window.location;
    const next = `${pathname}${query ? `?${query}` : ''}${hash}`;
    if (next !== `${pathname}${search}${hash}`) {
      window.history.replaceState(null, '', next);
    }
  }, [urlReady, filters, page]);

  function updateFilters(patch) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setRequestedPage(1);
  }

  function goToPage(nextPage) {
    setRequestedPage(nextPage);
    const top = topRef.current?.getBoundingClientRect().top;
    if (top !== undefined && top < 0) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const activeCategory = categories.find((c) => c.key === filters.category);
  const emptyLabel = activeCategory ? `${activeCategory.label.toLowerCase()} ` : '';

  return (
    <div ref={topRef} className="scroll-mt-28 space-y-5 sm:space-y-6">
      <ProjectFilters categories={categories} cities={cities} filters={filters} onChange={updateFilters} />

      <p className="sr-only" aria-live="polite">
        {filtered.length
          ? `Showing projects ${start + 1} to ${start + items.length} of ${filtered.length}`
          : 'No projects match the selected filters'}
      </p>

      {items.length ? (
        <ul className="grid grid-cols-1 min-[540px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {items.map((project, index) => (
            <li key={project.id} className="h-full">
              <ProjectCard project={project} eager={page === 1 && index < 4} onOpen={setSelected} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="surface-raised shadow-neu-sm rounded-card px-6 py-12 text-center">
          <p className="text-base font-semibold text-ink">No {emptyLabel}projects to show yet.</p>
          <p className="mt-1 text-sm text-ink-muted">Try another category or clear the filters.</p>
          <button
            type="button"
            onClick={() => updateFilters(DEFAULT_FILTERS)}
            className="btn-primary mt-5 h-10 rounded-control px-5 text-sm"
          >
            Show all projects
          </button>
        </div>
      )}

      <ProjectPagination page={page} totalPages={totalPages} onChange={goToPage} />

      <ProjectModal project={selected} onClose={closeProject} />
    </div>
  );
}
