import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projectSlug } from '@/lib/seo/slug';

export default function ProjectCard({ project, eager = false }) {
  const href = `/projects/${projectSlug(project)}`;
  const alt = [project.title, project.location].filter(Boolean).join(' in ') || 'Flooring project';

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card surface-raised shadow-neu-sm transition-shadow duration-200 hover:shadow-neu-md focus-within:ring-2 focus-within:ring-brand/40">
      <div className="relative aspect-[19/10] overflow-hidden bg-surface-sunken">
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
          <span className="absolute left-3 top-3 rounded-md border border-white/80 bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-brand shadow-neu-sm">
            {project.category}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 items-end justify-between gap-2 p-3.5 min-[1400px]:p-4">
        <div className="min-w-0">
          <h2 className="text-[13px] min-[1400px]:text-sm font-semibold leading-snug text-ink">
            <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
              {project.title}
            </Link>
          </h2>
          {project.location ? <p className="mt-1 text-xs text-ink-muted">{project.location}</p> : null}
          {project.area ? <p className="mt-1 text-xs font-semibold text-brand">{project.area}</p> : null}
        </div>
        <span
          aria-hidden
          className="icon-well h-9 w-9 min-[1400px]:h-10 min-[1400px]:w-10 text-ink transition-colors duration-200 group-hover:text-brand"
        >
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}
