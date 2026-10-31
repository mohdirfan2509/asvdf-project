import { statValue } from '@/lib/stats';

/** Compact horizontal statistic cards; stats without a value (e.g. an unset CMS field) are omitted. */
export default function StatCards({ settings, stats, className = '', cardClassName = '' }) {
  const items = stats
    .map((stat) => ({ ...stat, value: statValue(settings, stat.key) }))
    .filter((stat) => stat.value);
  if (!items.length) return null;

  return (
    <dl className={className}>
      {items.map(({ key, label, icon: Icon, value }, index) => (
        <div
          key={key}
          className={`surface-raised shadow-neu-sm rounded-card flex items-center gap-3 px-3.5 py-3 sm:px-4 sm:py-4 ${cardClassName} ${
            items.length % 2 === 1 && index === items.length - 1 ? 'col-span-2 lg:col-span-1' : ''
          }`}
        >
          <span className="icon-well h-11 w-11 sm:h-12 sm:w-12">
            <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
          </span>
          <div className="flex min-w-0 flex-col-reverse">
            <dt className="mt-1 text-xs text-ink-muted">{label}</dt>
            <dd className="text-2xl font-bold leading-none text-brand">{value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
