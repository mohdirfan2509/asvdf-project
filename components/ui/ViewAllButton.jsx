import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

const buttonClass =
  'btn-secondary group h-10 w-full rounded-full px-5 text-[13px] font-semibold text-brand';

/**
 * Full-width "view more" control under a shortened list on phones: a link to the full page (`href`),
 * or a button that reveals more items in place (`onClick`).
 */
export default function ViewAllButton({ href, onClick, children }) {
  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={buttonClass}>
      {children}
      <ChevronDown className="h-4 w-4" aria-hidden />
    </button>
  );
}
