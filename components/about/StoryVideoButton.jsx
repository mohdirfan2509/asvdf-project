'use client';

import { useEffect, useRef } from 'react';
import { Play, X } from 'lucide-react';
import { COMPANY_VIDEO } from '@/lib/content/media';

export default function StoryVideoButton({ label = 'Watch Our Story' }) {
  const dialogRef = useRef(null);
  const videoRef = useRef(null);

  // Covers every way the dialog closes: button, backdrop click and Escape.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    const pause = () => videoRef.current?.pause();
    dialog.addEventListener('close', pause);
    return () => dialog.removeEventListener('close', pause);
  }, []);

  function open() {
    dialogRef.current?.showModal();
    videoRef.current?.play().catch(() => {});
  }

  function close() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="group btn-secondary h-12 rounded-full pl-1.5 pr-5 text-sm"
      >
        <span className="icon-well h-9 w-9 text-ink transition-colors group-hover:text-brand">
          <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
        </span>
        {label}
      </button>

      <dialog
        ref={dialogRef}
        aria-label="ASVDF Flooring site footage"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto w-[min(60rem,calc(100vw-1.5rem))] overflow-hidden rounded-panel bg-slate-950 p-0 shadow-neu-lg backdrop:bg-slate-950/60 backdrop:backdrop-blur-[2px]"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close video"
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900 transition-colors hover:text-brand-solid"
        >
          <X className="h-4 w-4" />
        </button>
        <video
          ref={videoRef}
          className="block aspect-video w-full bg-slate-950"
          poster={COMPANY_VIDEO.poster}
          controls
          playsInline
          preload="none"
        >
          {COMPANY_VIDEO.sources.map(({ src, media }) => (
            <source key={src} src={src} type="video/mp4" media={media} />
          ))}
        </video>
      </dialog>
    </>
  );
}
