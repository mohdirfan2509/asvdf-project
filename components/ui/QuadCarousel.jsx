'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Up to 4 items per view, always centered when fewer.
 * Auto-advances when there are more than 4 items.
 * Cards stretch to fill available section height.
 */
export default function QuadCarousel({
  items,
  renderItem,
  className = '',
  intervalMs = 5500,
  autoPlay = true,
}) {
  const [page, setPage] = useState(0);
  const perPage = 4;
  const list = items || [];
  const totalPages = Math.max(1, Math.ceil(list.length / perPage));

  useEffect(() => {
    setPage(0);
  }, [list.length]);

  useEffect(() => {
    if (!autoPlay || totalPages <= 1) return undefined;
    const id = setInterval(() => {
      setPage((p) => (p + 1) % totalPages);
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, intervalMs, totalPages]);

  const visible = useMemo(() => {
    const start = page * perPage;
    return list.slice(start, start + perPage);
  }, [list, page]);

  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const next = () => setPage((p) => (p + 1) % totalPages);

  const gridClass =
    visible.length <= 1
      ? 'grid grid-cols-1 w-full max-w-md mx-auto'
      : visible.length === 2
        ? 'grid grid-cols-1 sm:grid-cols-2 w-full max-w-4xl mx-auto'
        : visible.length === 3
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mx-auto'
          : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full';

  if (!list.length) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-sm text-slate-500">Nothing to show yet.</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-3 sm:gap-4 h-full min-h-0 w-full ${className}`}>
      <div className="flex-1 min-h-0 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`${gridClass} gap-3 lg:gap-4 h-full auto-rows-fr`}
          >
            {visible.map((item, idx) => (
              <div key={item?.id ?? idx} className="min-h-0 h-full">
                {renderItem(item, idx)}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="shrink-0 flex items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Previous"
            onClick={prev}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white neu-sm flex items-center justify-center text-slate-700 hover:text-[#7C3AED] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={next}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white neu-sm flex items-center justify-center text-slate-700 hover:text-[#7C3AED] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
