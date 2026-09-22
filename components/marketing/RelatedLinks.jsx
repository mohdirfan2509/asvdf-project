import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function RelatedLinks({ links = [], heading = 'Related pages' }) {
  if (!links?.length) return null;

  return (
    <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80">
      <h2 className="text-xl sm:text-2xl font-[800] tracking-tight text-slate-900 mb-3">{heading}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-center justify-between gap-2 rounded-xl bg-[#F6F7FB] px-4 py-3 text-sm font-[600] text-slate-800 hover:text-[#7C3AED] neu-sm border border-white"
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
