import Link from 'next/link';
import SiteShell from '@/components/layout/SiteShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import { getProjects, getSiteSettings } from '@/lib/content/queries';
import { buildMetadata } from '@/lib/seo/metadata';
import { PROJECTS_COPY } from '@/lib/seo/page-content';
import { projectSlug } from '@/lib/seo/slug';
import { graph, organizationNode, breadcrumbNode } from '@/lib/seo/schema';

export const revalidate = 60;

export async function generateMetadata() {
  return buildMetadata({
    title: PROJECTS_COPY.title,
    description: PROJECTS_COPY.description,
    path: '/projects',
  });
}

export default async function ProjectsPage() {
  const [settings, projects] = await Promise.all([getSiteSettings(), getProjects()]);
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
  ];
  const jsonLd = graph([organizationNode(settings), breadcrumbNode(breadcrumbs)]);

  return (
    <SiteShell settings={settings} activePath="/projects">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <article className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 neu-lg border border-white/80 mb-4">
        <h1 className="text-3xl sm:text-4xl font-[800] tracking-tight text-slate-900 mb-3">{PROJECTS_COPY.h1}</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{PROJECTS_COPY.intro}</p>
      </article>
      <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((project) => {
            const href = `/projects/${projectSlug(project)}`;
            const alt = [project.title, project.location].filter(Boolean).join(' in ');
            return (
              <Link key={project.id} href={href} className="bg-[#F6F7FB] rounded-2xl overflow-hidden neu-sm border border-white">
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.image} alt={alt || 'Flooring project'} className="h-40 w-full object-cover" />
                ) : null}
                <div className="p-3.5">
                  {project.category ? (
                    <p className="text-[10px] font-[700] text-[#7C3AED] uppercase mb-1">{project.category}</p>
                  ) : null}
                  <h2 className="text-sm font-[700] text-slate-900 mb-1">{project.title}</h2>
                  <p className="text-[11px] text-slate-500">
                    {[project.location, project.area].filter(Boolean).join(' · ')}
                  </p>
                </div>
              </Link>
            );
          })}
          {!projects.length ? <p className="text-sm text-slate-500">No projects published yet.</p> : null}
        </div>
      </section>
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
