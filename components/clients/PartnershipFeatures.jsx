import { ShieldCheck, Target, Users } from 'lucide-react';

const ICONS = [Target, ShieldCheck, Users];

export default function PartnershipFeatures({ features }) {
  return (
    <ul className="surface-raised shadow-neu-sm rounded-panel grid h-full grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line p-5 sm:p-6">
      {features.map((feature, index) => {
        const Icon = ICONS[index % ICONS.length];
        return (
          <li
            key={feature.title}
            className="flex items-start gap-3.5 py-4 first:pt-0 last:pb-0 sm:py-0 sm:px-5 sm:first:pl-0 sm:last:pr-0"
          >
            <span className="icon-well h-11 w-11">
              <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
            </span>
            <div className="min-w-0 pt-0.5">
              <h3 className="text-sm font-semibold text-ink">{feature.title}</h3>
              <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-ink-muted">{feature.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
