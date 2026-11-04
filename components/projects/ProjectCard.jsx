import { ArrowRight } from 'lucide-react';
import { hasCaseStudy, projectPath } from '@/lib/projects';

/**
 * Project tile; the whole card (including the arrow) opens the project's details pop-up. Projects with a
 * case-study page also link to it, so search engines can reach that page without opening the pop-up.
 */
export default function ProjectCard({ project, eager = false, onOpen }) {
  const alt = [project.title, project.location].filter(Boolean).join(' in ') || 'Flooring project';

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card surface-raised shadow-neu-sm transition-shadow duration-200 hover:shadow-neu-md focus-within:ring-2 focus-within:ring-brand/40">
      <div className="relative aspect-[19/10] fit:aspect-[5/2] overflow-hidden bg-surface-sunken">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
        {project.category ? (
          <span className="absolute left-3 top-3 max-sm:left-2 max-sm:top-2 rounded-md border border-edge bg-white/95 px-2 py-0.5 max-sm:px-1.5 text-[11px] max-sm:text-[10px] font-semibold text-brand-solid shadow-neu-sm">
            {project.category}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 items-end justify-between gap-2 p-3.5 max-sm:p-2.5 min-[1400px]:p-4 fit:py-3">
        <div className="min-w-0">
          <h2 className="text-[13px] max-sm:text-[12.5px] min-[1400px]:text-sm font-semibold leading-snug text-ink">
            {hasCaseStudy(project) ? (
              <a
                href={projectPath(project)}
                onClick={(event) => {
                  event.preventDefault();
                  onOpen(project);
                }}
                aria-haspopup="dialog"
                className="text-left after:absolute after:inset-0 after:cursor-pointer focus-visible:outline-none"
              >
                {project.title}
              </a>
            ) : (
              <button
                type="button"
                onClick={() => onOpen(project)}
                aria-haspopup="dialog"
                className="text-left after:absolute after:inset-0 after:cursor-pointer focus-visible:outline-none"
              >
                {project.title}
              </button>
            )}
          </h2>
          {/* On the one-screen homepage and on phones the location and area share one line. */}
          <p className="fit:mt-1 fit:truncate fit:text-xs max-sm:mt-0.5 max-sm:truncate max-sm:text-[11px]">
            {project.location ? (
              <span className="mt-1 block fit:mt-0 fit:inline max-sm:mt-0 max-sm:inline text-xs max-sm:text-[11px] text-ink-muted">{project.location}</span>
            ) : null}
            {project.location && project.area ? (
              <span className="hidden fit:inline max-sm:inline text-ink-muted" aria-hidden>
                {' · '}
              </span>
            ) : null}
            {project.area ? (
              <span className="mt-1 block fit:mt-0 fit:inline max-sm:mt-0 max-sm:inline text-xs max-sm:text-[11px] font-semibold text-brand">{project.area}</span>
            ) : null}
          </p>
        </div>
        <span
          aria-hidden
          className="icon-well h-9 w-9 max-sm:hidden min-[1400px]:h-10 min-[1400px]:w-10 text-ink transition-colors duration-200 group-hover:text-brand"
        >
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}
