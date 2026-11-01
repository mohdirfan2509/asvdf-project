'use client';

import { useEffect, useRef, useState } from 'react';

const DURATION_MS = 1500;

/** Splits "120+", "₹1.5M", "98%" into prefix, number and suffix; null when there is no number. */
function parseStat(value) {
  const match = String(value ?? '').match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, raw, suffix] = match;
  const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
  return { prefix, suffix, target: Number(raw.replace(/,/g, '')), decimals, grouped: raw.includes(',') };
}

function formatNumber(n, { decimals, grouped }) {
  return grouped
    ? n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : n.toFixed(decimals);
}

/**
 * Counts a statistic up from zero the first time it scrolls into view.
 * The server HTML and the screen-reader text always carry the final value.
 */
export default function CountUp({ value, className = '' }) {
  const ref = useRef(null);
  const [current, setCurrent] = useState(null);
  const parsed = parseStat(value);

  useEffect(() => {
    const stat = parseStat(value);
    const el = ref.current;
    if (!stat || !el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame;
    setCurrent(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / DURATION_MS);
          const eased = 1 - (1 - progress) ** 3;
          if (progress < 1) {
            setCurrent(stat.target * eased);
            frame = requestAnimationFrame(tick);
          } else {
            setCurrent(null);
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  const shown =
    current === null || !parsed
      ? value
      : `${parsed.prefix}${formatNumber(parsed.decimals ? current : Math.round(current), parsed)}${parsed.suffix}`;

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
