const DESKTOP_COLUMNS = { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' };

/** Vertical statistic cards (icon disc, purple figure, label); items without a value are omitted. */
export default function OrbStatCards({ items, className = '', cardClassName = '', iconClassName = 'icon-orb' }) {
  const stats = items.filter((stat) => stat.value);
  if (!stats.length) return null;

  return (
    <dl className={`grid grid-cols-2 gap-3 sm:gap-4 ${DESKTOP_COLUMNS[stats.length] || 'lg:grid-cols-4'} ${className}`}>
      {stats.map(({ key, label, icon: Icon, value }, index) => (
        <div
          key={key}
          className={`surface-raised shadow-neu-sm rounded-card flex flex-col items-center px-3 py-5 text-center ${cardClassName} ${
            stats.length % 2 === 1 && index === stats.length - 1 ? 'col-span-2 lg:col-span-1' : ''
          }`}
        >
          <dt className="order-last mt-1 text-xs sm:text-[13px] text-ink">{label}</dt>
          <span className={`${iconClassName} h-12 w-12`}>
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
          <dd className="mt-3 text-xl sm:text-2xl font-bold leading-none text-brand">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
