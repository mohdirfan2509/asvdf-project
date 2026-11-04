import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SiteShell from '@/components/layout/SiteShell';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import RelatedLinks from '@/components/marketing/RelatedLinks';
import { getProjects, getSiteSettings } from '@/lib/content/queries';
import { hasCaseStudy, projectPath } from '@/lib/projects';
import { buildMetadata } from '@/lib/seo/metadata';
import { graph, organizationNode, breadcrumbNode } from '@/lib/seo/schema';
import { projectSlug, serviceHref } from '@/lib/seo/slug';

export const revalidate = 60;

async function findProject(slug) {
  const projects = await getProjects();
  const project = projects.find((p) => projectSlug(p) === slug);
  return { project, projects };
}

function pageTitle(project) {
  return project.location ? `${project.title} in ${project.location}` : project.title;
}

function summary(project) {
  const text = String(project.description).trim().replace(/\s+/g, ' ');
  return text.length > 155 ? `${text.slice(0, 152).replace(/\s+\S*$/, '')}…` : text;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.filter(hasCaseStudy).map((project) => ({ slug: projectSlug(project) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { project } = await findProject(slug);
  if (!project || !hasCaseStudy(project)) return { title: 'Project' };
  return buildMetadata({
    title: pageTitle(project),
    description: summary(project),
    path: projectPath(project),
    image: project.image,
  });
}

export default async function ProjectCaseStudyPage({ params }) {
  const { slug } = await params;
  const [settings, { project, projects }] = await Promise.all([getSiteSettings(), findProject(slug)]);
  if (!project) notFound();
  // Shared links to projects without a full write-up open the project's pop-up instead.
  if (!hasCaseStudy(project)) redirect(`/projects?project=${encodeURIComponent(slug)}`);

  const title = pageTitle(project);
  const path = projectPath(project);
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: project.title, path },
  ];
  const jsonLd = graph([organizationNode(settings), breadcrumbNode(breadcrumbs)]);

  const facts = [
    ['Location', project.location],
    ['Type', project.category],
    ['Flooring', project.flooring_type],
    ['Area', project.area],
  ].filter(([, value]) => value);
  const paragraphs = String(project.description)
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const others = projects
    .filter((p) => p !== project && hasCaseStudy(p))
    .slice(0, 3)
    .map((p) => ({ href: projectPath(p), label: pageTitle(p) }));
  const service = serviceHref(project.flooring_type || project.title);

  return (
    <SiteShell settings={settings} activePath="/projects">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <article className="surface-raised rounded-panel p-4 sm:p-8 mb-4">
        {project.image ? (
          <div className="relative -mx-4 -mt-4 mb-6 aspect-[16/9] overflow-hidden rounded-t-panel bg-surface-sunken sm:-mx-8 sm:-mt-8 sm:mb-8 sm:aspect-[21/8]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={title}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
        ) : null}
        <p className="text-[11px] font-semibold tracking-[0.14em] text-brand uppercase mb-2">Project</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-5">{title}</h1>

        {facts.length ? (
          <dl className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {facts.map(([label, value]) => (
              <div key={label} className="rounded-control bg-surface p-3 shadow-neu-inset">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">{label}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink mb-3">About this project</h2>
        {paragraphs.map((p) => (
          <p key={p.slice(0, 48)} className="whitespace-pre-line text-sm sm:text-base text-ink-muted leading-relaxed mb-3">
            {p}
          </p>
        ))}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary text-sm px-5 py-3">
            Request a quotation
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/projects" className="btn-secondary text-sm px-5 py-3">
            <ArrowLeft className="w-4 h-4" />
            All projects
          </Link>
        </div>
      </article>

      <div className="mb-4">
        <RelatedLinks
          heading={others.length ? 'More projects' : 'Related pages'}
          links={[...others, { href: service, label: 'About this flooring service' }, { href: '/contact', label: 'Request a quotation' }]}
        />
      </div>
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
