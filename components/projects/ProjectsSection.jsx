import { Briefcase, Building2 } from 'lucide-react';
import ProjectsExplorer from '@/components/projects/ProjectsExplorer';
import StatCards from '@/components/ui/StatCards';
import { PROJECTS_COPY } from '@/lib/seo/page-content';

const STATS = [
  { key: 'stat_projects', label: 'Projects Completed', icon: Briefcase },
  { key: 'stat_industries', label: 'Industries Served', icon: Building2 },
];

/** Projects intro, stats and explorer; shared by /projects and the homepage. */
export default function ProjectsSection({ settings, projects = [], id, headingAs: Heading = 'h2', className = '' }) {
  return (
    <section
      id={id}
      aria-labelledby="projects-title"
      className={`rounded-panel border border-white/80 bg-surface p-4 sm:p-6 lg:p-8 shadow-neu-sm ${className}`}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)_auto] lg:items-center lg:gap-10 xl:gap-14">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">{PROJECTS_COPY.eyebrow}</p>
          <Heading
            id="projects-title"
            className="text-3xl sm:text-4xl lg:text-[2.1rem] xl:text-[2.3rem] font-bold leading-[1.18] tracking-tight text-ink"
          >
            {PROJECTS_COPY.h1Line1}
            <br />
            {PROJECTS_COPY.h1Line2}
            <span className="text-brand">{PROJECTS_COPY.h1Highlight}</span>
          </Heading>
        </div>
        <p className="max-w-xl lg:max-w-[26rem] text-sm sm:text-[15px] leading-relaxed text-ink-muted">{PROJECTS_COPY.intro}</p>
        <StatCards
          settings={settings}
          stats={STATS}
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:flex"
          cardClassName="lg:min-w-[11.5rem]"
        />
      </div>

      <div className="mt-6 sm:mt-8">
        <ProjectsExplorer projects={projects} />
      </div>
    </section>
  );
}
