import { Briefcase, Building2, Clock, Users } from 'lucide-react';
import CountUp from '@/components/ui/CountUp';
import { statValue } from '@/lib/stats';

const STATS = [
  { key: 'stat_projects', label: 'Projects Completed', icon: Briefcase },
  { key: 'stat_clients', label: 'Happy Clients', icon: Users },
  { key: 'stat_years', label: 'Years Experience', icon: Clock },
  { key: 'stat_industries', label: 'Industries Served', icon: Building2 },
];

/** Phones: one wide card per row. From `sm`: one raised panel with dividers (2 columns, then 4). */
export default function HomeStats({ settings = null }) {
  return (
    <section
      aria-label="Company statistics"
      className="home-stats sm:rounded-panel sm:border sm:border-white/75 sm:bg-surface-raised sm:px-6 sm:py-6 sm:shadow-neu-md lg:px-8 lg:py-7"
    >
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-0 sm:gap-y-6 lg:grid-cols-4 lg:gap-y-0">
        {STATS.map(({ key, label, icon: Icon }, index) => (
          <li
            key={key}
            className={`home-stats__item flex aspect-[2/1] flex-col items-center justify-center gap-2.5 rounded-card bg-surface-raised p-2 text-center shadow-neu-md ring-1 ring-white/75 sm:aspect-auto sm:flex-row sm:justify-start sm:gap-4 sm:rounded-none sm:bg-transparent sm:p-0 sm:px-4 sm:text-left sm:shadow-none sm:ring-0 lg:justify-center lg:px-6 ${
              index % 2 === 1 ? 'sm:border-l sm:border-line' : ''
            } ${index > 0 ? 'lg:border-l lg:border-line' : ''}`}
          >
            <span className="home-stats__icon icon-well h-12 w-12 max-[22.5rem]:h-10 max-[22.5rem]:w-10">
              <Icon className="h-6 w-6 sm:h-5 sm:w-5" strokeWidth={1.6} aria-hidden />
            </span>
            <div className="flex min-w-0 flex-col-reverse items-center sm:items-start">
              <p className="mt-1.5 text-[13px] leading-snug text-ink-muted max-[22.5rem]:mt-1 max-[22.5rem]:text-xs sm:text-sm">
                {label}
              </p>
              <p className="text-[2rem] max-[22.5rem]:text-[1.6rem] sm:text-[1.75rem] font-bold leading-none tracking-tight text-brand">
                <CountUp value={statValue(settings, key)} />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
