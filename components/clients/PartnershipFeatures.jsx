import { ShieldCheck, Target, Users } from 'lucide-react';

const ICONS = [Target, ShieldCheck, Users];

export default function PartnershipFeatures({ features }) {
  return (
    <ul className="surface-raised shadow-neu-sm rounded-panel grid h-full grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line p-5 sm:p-6 max-sm:px-3.5 max-sm:py-2 fit:py-3.5">
      {features.map((feature, index) => {
        const Icon = ICONS[index % ICONS.length];
        return (
          <li
            key={feature.title}
            className="flex items-start gap-3.5 max-sm:items-center max-sm:gap-3 py-4 max-sm:py-2.5 first:pt-0 last:pb-0 max-sm:first:pt-1.5 max-sm:last:pb-1.5 sm:py-0 sm:px-5 sm:first:pl-0 sm:last:pr-0"
          >
            <span className="icon-well h-11 w-11 max-sm:h-9 max-sm:w-9 fit:h-10 fit:w-10">
              <Icon className="h-5 w-5 max-sm:h-4 max-sm:w-4" strokeWidth={1.6} aria-hidden />
            </span>
            <div className="min-w-0 pt-0.5 max-sm:pt-0">
              <h3 className="text-sm max-sm:text-[13px] font-semibold text-ink">{feature.title}</h3>
              <p className="mt-1 max-sm:mt-0 text-xs sm:text-[13px] leading-relaxed max-sm:leading-snug fit:leading-snug text-ink-muted">{feature.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
