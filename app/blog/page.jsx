import Link from 'next/link';
import SiteShell from '@/components/layout/SiteShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import { getBlogs, getSiteSettings } from '@/lib/content/queries';
import { buildMetadata } from '@/lib/seo/metadata';
import { BLOG_INDEX } from '@/lib/seo/page-content';
import { graph, organizationNode, breadcrumbNode } from '@/lib/seo/schema';

export const revalidate = 60;

export async function generateMetadata() {
  return buildMetadata({
    title: BLOG_INDEX.title,
    description: BLOG_INDEX.description,
    path: '/blog',
  });
}

export default async function BlogIndexPage() {
  const [settings, blogs] = await Promise.all([getSiteSettings(), getBlogs()]);
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/blog' },
  ];
  const jsonLd = graph([organizationNode(settings), breadcrumbNode(breadcrumbs)]);

  return (
    <SiteShell settings={settings} activePath="/blog">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <article className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 neu-lg border border-white/80 mb-4">
        <h1 className="text-3xl sm:text-4xl font-[800] tracking-tight text-slate-900 mb-3">{BLOG_INDEX.h1}</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{BLOG_INDEX.intro}</p>
      </article>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {blogs.map((blog) => (
          <Link
            key={blog.id || blog.slug}
            href={`/blog/${blog.slug}`}
            className="bg-white rounded-[1.5rem] overflow-hidden neu-lg border border-white/80"
          >
            {blog.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={blog.cover} alt={blog.title} className="h-40 w-full object-cover" />
            ) : null}
            <div className="p-4">
              {blog.category ? (
                <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-1">{blog.category}</p>
              ) : null}
              <h2 className="text-lg font-[800] text-slate-900 mb-1">{blog.title}</h2>
              <p className="text-sm text-slate-500">{blog.excerpt}</p>
            </div>
          </Link>
        ))}
        {!blogs.length ? (
          <p className="text-sm text-slate-500">Guides will appear here once they are published.</p>
        ) : null}
      </section>
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
