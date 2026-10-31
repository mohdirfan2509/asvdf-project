import { Briefcase, Building2, Clock, Users } from 'lucide-react';
import { statValue } from '@/lib/stats';

const STATS = [
  { key: 'stat_projects', label: 'Projects Completed', icon: Briefcase },
  { key: 'stat_clients', label: 'Happy Clients', icon: Users },
  { key: 'stat_years', label: 'Years Experience', icon: Clock },
  { key: 'stat_industries', label: 'Industries Served', icon: Building2 },
];

export default function HomeStats({ settings = null }) {
  return (
    <section aria-label="Company statistics" className="surface-raised rounded-panel px-3 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 lg:gap-y-0">
        {STATS.map(({ key, label, icon: Icon }, index) => (
          <div
            key={key}
            className={`flex flex-col sm:flex-row sm:items-center lg:justify-center gap-2.5 sm:gap-4 px-3 sm:px-4 lg:px-6 ${
              index % 2 === 1 ? 'border-l border-line' : ''
            } ${index > 0 ? 'lg:border-l lg:border-line' : ''}`}
          >
            <span className="icon-well w-11 h-11 sm:w-12 sm:h-12">
              <Icon className="w-5 h-5" strokeWidth={1.6} aria-hidden />
            </span>
            <div className="flex flex-col-reverse min-w-0">
              <dt className="mt-1.5 text-xs sm:text-sm text-ink-muted">{label}</dt>
              <dd className="text-2xl sm:text-[1.75rem] font-bold leading-none tracking-tight text-brand">
                {statValue(settings, key)}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
