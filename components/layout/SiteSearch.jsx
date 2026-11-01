'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Search, X } from 'lucide-react';
import { openProjectInPlace } from '@/lib/project-link';
import { searchSite } from '@/lib/search';

export default function SiteSearch({ open, onClose, index }) {
  const dialogRef = useRef(null);
  const router = useRouter();
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchSite(index, query), [index, query]);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Escape and dialog.close() fire the native event; keep the parent's open state in sync.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    const handleClose = () => onCloseRef.current();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery('');
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function onSubmit(e) {
    e.preventDefault();
    if (!results.length) return;
    onClose();
    if (!openProjectInPlace(results[0].href)) router.push(results[0].href);
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      aria-label="Search the site"
      className="mx-auto mt-[10vh] w-[min(36rem,calc(100vw-1.5rem))] max-h-[75vh] overflow-hidden rounded-panel bg-surface-raised p-0 text-ink border border-edge shadow-neu-lg backdrop:bg-slate-950/40 backdrop:backdrop-blur-[2px]"
    >
      <form role="search" onSubmit={onSubmit} className="flex items-center gap-3 border-b border-line px-4 sm:px-5">
        <Search className="w-5 h-5 text-ink-muted shrink-0" aria-hidden />
        <label htmlFor="site-search-input" className="sr-only">
          Search pages, services, locations, guides and projects
        </label>
        <input
          id="site-search-input"
          type="search"
          autoFocus
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            // A search input otherwise spends the first Escape on clearing its text.
            if (e.key === 'Escape') {
              e.preventDefault();
              onClose();
            }
          }}
          placeholder="Search services, locations, guides…"
          className="h-14 flex-1 min-w-0 bg-transparent text-[15px] text-ink placeholder:text-ink-muted/70 focus:outline-none"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="icon-well w-9 h-9 text-ink-muted transition-colors hover:text-brand"
        >
          <X className="w-4 h-4" />
        </button>
      </form>

      <div className="max-h-[calc(75vh-3.5rem)] overflow-y-auto p-2" aria-live="polite">
        {!query.trim() ? (
          <p className="px-3 py-4 text-sm text-ink-muted">
            Type to search pages, flooring services, service areas, guides and projects.
          </p>
        ) : results.length ? (
          <ul>
            {results.map((result) => (
              <li key={result.href}>
                <Link
                  href={result.href}
                  onClick={(e) => {
                    onClose();
                    const newTab = e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
                    if (!newTab && openProjectInPlace(result.href)) e.preventDefault();
                  }}
                  className="group flex items-center justify-between gap-3 rounded-control px-3 py-2.5 transition-colors hover:bg-surface focus-visible:bg-surface"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink truncate group-hover:text-brand">
                      {result.title}
                    </span>
                    <span className="block text-xs text-ink-muted">{result.group}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0 text-ink-muted group-hover:text-brand" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-3 py-4 text-sm text-ink-muted">
            No pages match “{query.trim()}”. Try a service such as “VDF” or a city such as “Hyderabad”.
          </p>
        )}
      </div>
    </dialog>
  );
}
