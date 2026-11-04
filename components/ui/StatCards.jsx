import CountUp from '@/components/ui/CountUp';
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
          className={`surface-raised shadow-neu-sm rounded-card flex items-center gap-3 max-sm:gap-2.5 px-3.5 py-3 sm:px-4 sm:py-4 max-sm:px-3 max-sm:py-2.5 ${cardClassName} ${
            items.length % 2 === 1 && index === items.length - 1 ? 'col-span-2 lg:col-span-1' : ''
          }`}
        >
          <span className="icon-well h-11 w-11 sm:h-12 sm:w-12 max-sm:h-9 max-sm:w-9">
            <Icon className="h-5 w-5 max-sm:h-4 max-sm:w-4" strokeWidth={1.6} aria-hidden />
          </span>
          <div className="flex min-w-0 flex-col-reverse">
            <dt className="mt-1 max-sm:mt-0.5 text-xs max-sm:text-[11px] text-ink-muted">{label}</dt>
            <dd className="text-2xl max-sm:text-xl font-bold leading-none text-brand">
              <CountUp value={value} />
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
