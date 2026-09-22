import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/layout/SiteShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import RelatedLinks from '@/components/marketing/RelatedLinks';
import { getProjectBySlug, getProjects, getSiteSettings } from '@/lib/content/queries';
import { buildMetadata } from '@/lib/seo/metadata';
import { projectSlug } from '@/lib/seo/slug';
import { graph, organizationNode, breadcrumbNode } from '@/lib/seo/schema';
import { absoluteUrl } from '@/lib/seo/site';

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: projectSlug(project) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project' };
  const title = project.title;
  const location = project.location ? ` in ${project.location}` : '';
  return buildMetadata({
    title,
    description: `${project.title}${location}${project.area ? ` — ${project.area}` : ''}. Flooring project by ASVDF Flooring.`,
    path: `/projects/${slug}`,
    image: project.image,
  });
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const [settings, project] = await Promise.all([getSiteSettings(), getProjectBySlug(slug)]);
  if (!project) notFound();

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: project.title, path: `/projects/${slug}` },
  ];
  const jsonLd = graph([
    organizationNode(settings),
    breadcrumbNode(breadcrumbs),
    {
      '@type': 'CreativeWork',
      name: project.title,
      url: absoluteUrl(`/projects/${slug}`),
      description: [project.category, project.location, project.area].filter(Boolean).join(' · ') || project.title,
    },
  ]);

  const alt = [project.title, project.location].filter(Boolean).join(' in ');
  const facts = [
    ['Project', project.title],
    ['Location', project.location],
    ['Type', project.category],
    ['Flooring', project.flooring_type],
    ['Area', project.area],
    ['Application', project.application],
    ['Duration', project.duration],
  ].filter(([, value]) => value);

  return (
    <SiteShell settings={settings} activePath="/projects">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <article className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 neu-lg border border-white/80 mb-4">
        <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-2">Project</p>
        <h1 className="text-3xl sm:text-4xl font-[800] tracking-tight text-slate-900 mb-4">{project.title}</h1>
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={alt || project.title}
            className="w-full h-56 sm:h-72 object-cover rounded-2xl mb-6"
          />
        ) : null}
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {facts.map(([label, value]) => (
            <div key={label} className="bg-[#F6F7FB] rounded-xl p-3">
              <dt className="text-[10px] font-[700] uppercase tracking-wider text-slate-400">{label}</dt>
              <dd className="text-sm font-[700] text-slate-900">{value}</dd>
            </div>
          ))}
        </dl>
        {project.body || project.work_performed || project.summary ? (
          <div className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
            {project.body || project.work_performed || project.summary}
          </div>
        ) : (
          <p className="text-sm text-slate-600 leading-relaxed">
            Published details for this project are listed above. For scope, programme, or a similar floor on your site,{' '}
            <Link href="/contact" className="font-[700] text-[#7C3AED]">
              request a quotation
            </Link>
            .
          </p>
        )}
      </article>
      <div className="mb-4">
        <RelatedLinks
          links={[
            { href: '/vdf-flooring', label: 'VDF flooring' },
            { href: '/industrial-flooring', label: 'Industrial flooring' },
            { href: '/warehouse-flooring', label: 'Warehouse flooring' },
            { href: '/projects', label: 'All projects' },
          ]}
        />
      </div>
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
