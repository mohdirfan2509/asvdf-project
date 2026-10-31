import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function RelatedLinks({ links = [], heading = 'Related pages' }) {
  if (!links?.length) return null;

  return (
    <section className="surface-raised rounded-panel p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink mb-3">{heading}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-center justify-between gap-2 rounded-control bg-surface border border-line px-4 py-3 text-sm font-semibold text-ink transition-colors hover:text-brand hover:border-brand-line"
            >
              <span>{link.label}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
