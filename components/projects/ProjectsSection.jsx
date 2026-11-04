import { Briefcase, Building2 } from 'lucide-react';
import ProjectsExplorer from '@/components/projects/ProjectsExplorer';
import StatCards from '@/components/ui/StatCards';
import { PROJECTS_COPY } from '@/lib/seo/page-content';

const STATS = [
  { key: 'stat_projects', label: 'Projects Completed', icon: Briefcase },
  { key: 'stat_industries', label: 'Industries Served', icon: Building2 },
];

/**
 * Projects intro, stats and explorer; shared by /projects and the homepage. `fitScreen` (homepage only)
 * shows a short list with a link to /projects on phones.
 */
export default function ProjectsSection({ settings, projects = [], id, headingAs: Heading = 'h2', className = '', fitScreen = false }) {
  return (
    <section
      id={id}
      aria-labelledby="projects-title"
      className={`rounded-panel border border-edge bg-surface p-4 sm:p-6 max-sm:p-3.5 lg:p-8 fit:p-6 shadow-neu-sm ${className}`}
    >
      <div className="grid gap-5 max-sm:gap-3 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)_auto] lg:items-center lg:gap-10 xl:gap-14">
        <div>
          <p className="mb-2 max-sm:mb-1 fit:mb-1.5 text-xs max-sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">{PROJECTS_COPY.eyebrow}</p>
          <Heading
            id="projects-title"
            className="text-3xl sm:text-4xl max-sm:text-[1.45rem] lg:text-[2.1rem] xl:text-[2.3rem] fit:text-[1.9rem] font-bold leading-[1.18] max-sm:leading-[1.25] tracking-tight text-ink"
          >
            {PROJECTS_COPY.h1Line1}
            <br />
            {PROJECTS_COPY.h1Line2}
            <span className="text-brand">{PROJECTS_COPY.h1Highlight}</span>
          </Heading>
        </div>
        <p className="max-w-xl lg:max-w-[26rem] text-sm sm:text-[15px] max-sm:text-[13px] leading-relaxed max-sm:leading-snug text-ink-muted">{PROJECTS_COPY.intro}</p>
        <StatCards
          settings={settings}
          stats={STATS}
          className="grid grid-cols-2 gap-3 sm:gap-4 max-sm:gap-2 lg:flex"
          cardClassName="lg:min-w-[11.5rem]"
        />
      </div>

      <div className="mt-6 sm:mt-8 max-sm:mt-4 fit:mt-5">
        <ProjectsExplorer projects={projects} fitScreen={fitScreen} />
      </div>
    </section>
  );
}
