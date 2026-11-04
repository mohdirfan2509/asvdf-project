'use client';

import { useEffect, useRef } from 'react';
import { preload } from 'react-dom';
import { COMPANY_VIDEO } from '@/lib/content/media';

const { poster: POSTER, sources: SOURCES } = COMPANY_VIDEO;

function sourceForScreen() {
  return (SOURCES.find(({ media }) => !media || window.matchMedia(media).matches) || SOURCES.at(-1)).src;
}

/**
 * Decorative background footage for the homepage hero. The poster is the first thing visitors see, so it
 * loads first; the video file (several MB) is only requested after the page has finished loading.
 */
export default function HeroVideo({ className = '' }) {
  const videoRef = useRef(null);
  preload(POSTER, { as: 'image', fetchPriority: 'high' });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || navigator.connection?.saveData) return undefined;

    // React does not reliably serialise `muted` during SSR, so enforce it before playing.
    video.muted = true;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = true;

    const sync = () => {
      if (!video.src) return;
      if (reducedMotion.matches || !inView) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    const start = () => {
      video.src = sourceForScreen();
      sync();
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    reducedMotion.addEventListener('change', sync);

    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });

    return () => {
      window.removeEventListener('load', start);
      observer.disconnect();
      reducedMotion.removeEventListener('change', sync);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={POSTER}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
