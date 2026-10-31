'use client';

import { useEffect, useRef } from 'react';
import { COMPANY_VIDEO } from '@/lib/content/media';

const { poster: POSTER, sources: SOURCES } = COMPANY_VIDEO;

/** Decorative background footage for the homepage hero. */
export default function HeroVideo({ className = '' }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    // React does not reliably serialise `muted` during SSR, so enforce it before playing.
    video.muted = true;

    if (navigator.connection?.saveData) {
      video.pause();
      video.querySelectorAll('source').forEach((source) => source.remove());
      video.load();
      return undefined;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = true;

    const sync = () => {
      if (reducedMotion.matches || !inView) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    reducedMotion.addEventListener('change', sync);
    sync();

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener('change', sync);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={POSTER}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
    >
      {SOURCES.map(({ src, media }) => (
        <source key={src} src={src} type="video/mp4" media={media} />
      ))}
    </video>
  );
}
