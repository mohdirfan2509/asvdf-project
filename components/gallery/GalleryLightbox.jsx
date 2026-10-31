'use client';

import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const navButton =
  'absolute top-1/2 -translate-y-1/2 inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-float transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand';

/** Full-size viewer for the filtered gallery; `index` is null while closed. */
export default function GalleryLightbox({ images, index, onIndexChange, onClose }) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const current = index === null ? null : images[index];
  const isOpen = Boolean(current);
  const count = images.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // Covers every way the dialog closes: button, backdrop click and Escape.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    const handleClose = () => onCloseRef.current();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous;
    };
  }, [isOpen]);

  const step = (delta) => onIndexChange((index + delta + count) % count);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Gallery image viewer"
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current.close();
      }}
      onKeyDown={(e) => {
        if (count < 2) return;
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
      }}
      className="m-auto w-[min(72rem,calc(100vw-1.5rem))] overflow-visible bg-transparent p-0 backdrop:bg-slate-950/80 backdrop:backdrop-blur-[2px]"
    >
      {current ? (
        <figure className="relative mx-auto w-fit max-w-full">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close image viewer"
            className="absolute right-2 top-2 sm:right-3 sm:top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-float transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <X className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.image}
            alt={current.title || 'ASVDF Flooring project photo'}
            className="block max-h-[calc(100svh-7rem)] w-auto max-w-full rounded-panel object-contain shadow-[0_24px_60px_rgb(2_6_23/0.5)]"
          />
          <figcaption className="mt-3 flex items-center justify-between gap-4 px-1 text-sm text-white/90">
            <span className="truncate font-medium">{current.title}</span>
            <span className="shrink-0 tabular-nums text-white/70" aria-live="polite">
              {index + 1} / {count}
            </span>
          </figcaption>

          {count > 1 ? (
            <>
              <button type="button" onClick={() => step(-1)} aria-label="Previous image" className={`${navButton} left-2 sm:left-3`}>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next image" className={`${navButton} right-2 sm:right-3`}>
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}
        </figure>
      ) : null}
    </dialog>
  );
}
