import { Eye, ShieldCheck, Target, Users } from 'lucide-react';

const ICONS = [Target, Eye, Users, ShieldCheck];

export default function OurStory({ copy }) {
  return (
    <section
      aria-labelledby="our-story-heading"
      className="surface-raised shadow-neu-sm rounded-panel grid gap-6 max-sm:gap-3.5 p-5 sm:p-7 max-sm:p-3.5 fit:py-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)] xl:items-center xl:gap-8"
    >
      <div>
        <p className="mb-2 max-sm:mb-1 text-xs max-sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">{copy.storyEyebrow}</p>
        <h2 id="our-story-heading" className="text-2xl sm:text-[1.75rem] max-sm:text-lg font-bold leading-tight tracking-tight text-ink">
          {copy.storyHeadingLine1}
          <br />
          {copy.storyHeadingLine2}
        </h2>
        <span className="mt-4 max-sm:mt-2.5 block h-[3px] w-10 rounded-full bg-brand" aria-hidden />
        <p className="mt-4 max-sm:mt-2.5 max-w-xl text-sm max-sm:text-[13px] leading-relaxed max-sm:leading-snug text-ink-muted">{copy.story}</p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 max-sm:grid-cols-2 min-[87.5rem]:grid-cols-4 gap-3 sm:gap-4 max-sm:gap-2.5">
        {copy.pillars.map((pillar, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <li key={pillar.title} className="surface-raised shadow-neu-sm rounded-card h-full p-4 sm:p-5 max-sm:p-3 max-sm:text-center">
              <div className="flex items-center gap-3 max-sm:flex-col max-sm:gap-2">
                <span className="icon-well h-11 w-11 max-sm:h-8 max-sm:w-8">
                  <Icon className="h-5 w-5 max-sm:h-4 max-sm:w-4" strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="min-w-0 text-sm max-sm:text-[13px] font-semibold leading-snug text-ink">{pillar.title}</h3>
              </div>
              <p className="mt-4 max-sm:mt-2 text-[13px] max-sm:text-xs leading-relaxed max-sm:leading-snug text-ink-muted">{pillar.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
