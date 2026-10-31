import { Star } from 'lucide-react';

/** Purple five-star row; `rating` is rounded and clamped to 0–5, and nothing renders without one. */
export default function StarRating({ rating, className = '', starClassName = 'h-4 w-4' }) {
  const value = Math.round(Math.min(5, Math.max(0, Number(rating) || 0)));
  if (!value) return null;

  return (
    <p className={`flex items-center gap-1 text-brand ${className}`} role="img" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${starClassName} ${i < value ? 'fill-current' : 'text-brand-line'}`}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </p>
  );
}
