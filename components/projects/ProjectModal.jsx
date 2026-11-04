'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ImageOff, X } from 'lucide-react';
import { hasCaseStudy, projectPath } from '@/lib/projects';

/** Project details pop-up: photo, the details entered in the admin, and the optional description. */
export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  const facts = project
    ? [
        ['Location', project.location],
        ['Type', project.category],
        ['Flooring', project.flooring_type],
        ['Area', project.area],
      ].filter(([, value]) => value)
    : [];
  const description = String(project?.description || '').trim();
  const alt = project ? [project.title, project.location].filter(Boolean).join(' in ') : '';

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      aria-labelledby="project-modal-title"
      className="border-0 bg-transparent p-0 text-ink backdrop:bg-slate-950/60 backdrop:backdrop-blur-[3px] max-sm:m-0 max-sm:h-dvh max-sm:max-h-dvh max-sm:w-full max-sm:max-w-full sm:m-auto sm:h-fit sm:max-h-[min(44rem,calc(100dvh-3rem))] sm:w-[min(60rem,calc(100vw-3rem))]"
    >
      {project ? (
        <div className="relative flex h-full flex-col overflow-hidden bg-surface-raised shadow-neu-lg sm:max-h-[inherit] sm:rounded-panel sm:border sm:border-edge md:h-[min(28rem,calc(100dvh-3rem))] md:flex-row">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-float transition-colors hover:text-brand-solid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative aspect-[4/3] w-full shrink-0 bg-surface-sunken md:aspect-auto md:h-full md:w-1/2">
            {project.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.image} alt={alt || project.title} className="h-full w-full object-cover md:absolute md:inset-0" />
            ) : (
              <span className="flex h-full min-h-56 items-center justify-center text-ink-muted">
                <ImageOff className="h-8 w-8" strokeWidth={1.5} aria-hidden />
              </span>
            )}
            {project.category ? (
              <span className="absolute left-3 top-3 rounded-md border border-edge bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-brand-solid shadow-neu-sm">
                {project.category}
              </span>
            ) : null}
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-5 sm:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Project</p>
            <h2 id="project-modal-title" className="mt-1.5 pr-10 text-xl font-bold leading-snug tracking-tight text-ink sm:text-2xl md:pr-0">
              {project.title}
            </h2>

            {facts.length ? (
              <dl className="mt-5 grid grid-cols-2 gap-3">
                {facts.map(([label, value]) => (
                  <div key={label} className="rounded-control bg-surface p-3 shadow-neu-inset">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">{label}</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {description ? (
              <div className="mt-5">
                <h3 className="text-sm font-semibold text-ink">About this project</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink-muted">{description}</p>
              </div>
            ) : null}

            {hasCaseStudy(project) ? (
              <Link
                href={projectPath(project)}
                className="group mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand hover:underline"
              >
                View full project page
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
