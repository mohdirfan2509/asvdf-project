import Link from 'next/link';

export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-ink-muted">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.path}-${item.name}`} className="flex items-center gap-1.5">
              {index > 0 ? <span className="text-ink-muted/50" aria-hidden>/</span> : null}
              {last || !item.path ? (
                <span className="font-semibold text-ink" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="font-medium transition-colors hover:text-brand">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
