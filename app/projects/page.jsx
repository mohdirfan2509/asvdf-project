import SiteShell from '@/components/layout/SiteShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import ProjectsSection from '@/components/projects/ProjectsSection';
import { getProjects, getSiteSettings } from '@/lib/content/queries';
import { buildMetadata } from '@/lib/seo/metadata';
import { PROJECTS_COPY } from '@/lib/seo/page-content';
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
    <SiteShell
      settings={settings}
      activePath="/projects"
      searchData={{
        projects: projects.map(({ id, slug, title, location, category, flooring_type }) => ({
          id,
          slug,
          title,
          location,
          category,
          flooring_type,
        })),
      }}
    >
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <ProjectsSection settings={settings} projects={projects} headingAs="h1" className="mb-4" />
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
