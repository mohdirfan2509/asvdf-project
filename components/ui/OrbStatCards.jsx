import CountUp from '@/components/ui/CountUp';

const DESKTOP_COLUMNS = { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' };
const PHONE_COLUMNS = { 1: 'max-sm:grid-cols-1', 2: 'max-sm:grid-cols-2', 3: 'max-sm:grid-cols-3', 4: 'max-sm:grid-cols-4' };

/**
 * Statistic cards (icon disc, purple figure, label); items without a value are omitted. Vertical, except
 * on the one-screen homepage, where the icon sits beside the figure to save height. On phones all cards
 * share one slim row.
 */
export default function OrbStatCards({ items, className = '', cardClassName = '', iconClassName = 'icon-orb' }) {
  const stats = items.filter((stat) => stat.value);
  if (!stats.length) return null;

  return (
    <ul
      className={`grid grid-cols-2 gap-3 sm:gap-4 max-sm:gap-2 ${DESKTOP_COLUMNS[stats.length] || 'lg:grid-cols-4'} ${PHONE_COLUMNS[stats.length] || 'max-sm:grid-cols-4'} ${className}`}
    >
      {stats.map(({ key, label, icon: Icon, value }, index) => (
        <li
          key={key}
          className={`surface-raised shadow-neu-sm rounded-card flex flex-col items-center px-3 py-5 max-sm:px-1.5 max-sm:py-2.5 text-center fit:grid fit:grid-cols-[auto_minmax(0,1fr)] fit:items-center fit:gap-x-3 fit:text-left ${cardClassName} ${
            stats.length % 2 === 1 && index === stats.length - 1 ? 'col-span-2 max-sm:col-span-1 lg:col-span-1' : ''
          }`}
        >
          <p className="order-last mt-1 fit:mt-0.5 fit:self-start text-xs sm:text-[13px] max-sm:text-[10.5px] max-sm:leading-tight fit:leading-snug text-ink">
            {label}
          </p>
          <span className={`h-12 w-12 max-sm:h-8 max-sm:w-8 fit:row-span-2 ${iconClassName}`}>
            <Icon className="h-5 w-5 max-sm:h-4 max-sm:w-4" strokeWidth={1.75} aria-hidden />
          </span>
          <p className="mt-3 max-sm:mt-1.5 fit:mt-0 fit:self-end text-xl sm:text-2xl max-sm:text-base font-bold leading-none text-brand">
            <CountUp value={value} />
          </p>
        </li>
      ))}
    </ul>
  );
}
