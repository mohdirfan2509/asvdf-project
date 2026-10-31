import { Eye, ShieldCheck, Target, Users } from 'lucide-react';

const ICONS = [Target, Eye, Users, ShieldCheck];

export default function OurStory({ copy }) {
  return (
    <section
      aria-labelledby="our-story-heading"
      className="surface-raised shadow-neu-sm rounded-panel grid gap-6 p-5 sm:p-7 xl:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)] xl:items-center xl:gap-8"
    >
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">{copy.storyEyebrow}</p>
        <h2 id="our-story-heading" className="text-2xl sm:text-[1.75rem] font-bold leading-tight tracking-tight text-ink">
          {copy.storyHeadingLine1}
          <br />
          {copy.storyHeadingLine2}
        </h2>
        <span className="mt-4 block h-[3px] w-10 rounded-full bg-brand" aria-hidden />
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">{copy.story}</p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 min-[87.5rem]:grid-cols-4 gap-3 sm:gap-4">
        {copy.pillars.map((pillar, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <li key={pillar.title} className="surface-raised shadow-neu-sm rounded-card h-full p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <span className="icon-well h-11 w-11">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="text-sm font-semibold text-ink">{pillar.title}</h3>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-ink-muted">{pillar.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
