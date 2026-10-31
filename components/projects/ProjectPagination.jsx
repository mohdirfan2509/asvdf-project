import { ArrowLeft, ArrowRight } from 'lucide-react';
import { pageNumbers } from '@/lib/projects';

const pageButton =
  'inline-flex h-9 min-w-9 items-center justify-center rounded-control px-2 text-sm font-semibold transition-colors duration-150';
const arrowButton =
  'icon-well h-9 w-9 text-ink transition-colors hover:text-brand disabled:cursor-not-allowed disabled:text-ink-muted/40 disabled:hover:text-ink-muted/40';

/** `keepArrows` shows disabled Previous/Next at the ends instead of hiding them. */
export default function ProjectPagination({ page, totalPages, onChange, label = 'Projects pages', keepArrows = false }) {
  if (totalPages <= 1) return null;

  const arrow = (direction) => {
    const previous = direction === 'previous';
    const target = previous ? page - 1 : page + 1;
    const disabled = previous ? page <= 1 : page >= totalPages;
    if (disabled && !keepArrows) return null;
    const Icon = previous ? ArrowLeft : ArrowRight;
    return (
      <li>
        <button
          type="button"
          onClick={() => onChange(target)}
          disabled={disabled}
          aria-label={previous ? 'Previous page' : 'Next page'}
          className={arrowButton}
        >
          <Icon className="h-4 w-4" />
        </button>
      </li>
    );
  };

  return (
    <nav aria-label={label} className="flex justify-center">
      <ul className="surface-raised shadow-neu-sm flex items-center gap-1.5 rounded-card p-1.5">
        {arrow('previous')}

        {pageNumbers(page, totalPages).map((item, index) =>
          item === 'ellipsis' ? (
            <li key={`gap-${index}`} aria-hidden className="px-1 text-sm text-ink-muted">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onChange(item)}
                aria-label={`Page ${item}`}
                aria-current={item === page ? 'page' : undefined}
                className={
                  item === page
                    ? `${pageButton} bg-brand text-white shadow-brand`
                    : `${pageButton} bg-surface-raised text-ink shadow-neu-sm hover:text-brand`
                }
              >
                {item}
              </button>
            </li>
          )
        )}

        {arrow('next')}
      </ul>
    </nav>
  );
}
