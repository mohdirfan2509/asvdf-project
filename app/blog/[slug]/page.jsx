import { notFound } from 'next/navigation';
import SiteShell from '@/components/layout/SiteShell';
import FooterCTA from '@/components/sections/FooterCTA';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import RelatedLinks from '@/components/marketing/RelatedLinks';
import { getBlogBySlug, getBlogs, getSiteSettings } from '@/lib/content/queries';
import { buildMetadata } from '@/lib/seo/metadata';
import { graph, organizationNode, breadcrumbNode, articleNode } from '@/lib/seo/schema';

export const revalidate = 60;

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.filter((b) => b.slug).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: 'Article' };
  return buildMetadata({
    title: blog.seo_title || blog.title,
    description: blog.seo_description || blog.excerpt,
    path: `/blog/${blog.slug}`,
    image: blog.cover,
    type: 'article',
    absoluteTitle: Boolean(blog.seo_title),
  });
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const [settings, blog] = await Promise.all([getSiteSettings(), getBlogBySlug(slug)]);
  if (!blog) notFound();

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/blog' },
    { name: blog.title, path: `/blog/${blog.slug}` },
  ];

  const jsonLd = graph([
    organizationNode(settings),
    breadcrumbNode(breadcrumbs),
    articleNode({
      title: blog.title,
      description: blog.seo_description || blog.excerpt,
      path: `/blog/${blog.slug}`,
      image: blog.cover,
      datePublished: blog.published_at,
      dateModified: blog.updated_at || blog.published_at,
    }),
  ]);

  return (
    <SiteShell settings={settings} activePath="/blog">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <article className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 neu-lg border border-white/80 mb-4">
        <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-2">{blog.category}</p>
        <h1 className="text-3xl sm:text-4xl font-[800] tracking-tight text-slate-900 mb-3">{blog.title}</h1>
        <p className="text-sm text-slate-500 mb-5">{blog.excerpt}</p>
        {blog.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={blog.cover}
            alt={blog.title}
            className="h-56 sm:h-72 w-full object-cover rounded-2xl mb-6"
          />
        )}
        <div className="max-w-none text-sm sm:text-base leading-relaxed whitespace-pre-line text-slate-700">
          {blog.body}
        </div>
      </article>
      <div className="mb-4">
        <RelatedLinks
          links={[
            { href: '/vdf-flooring', label: 'VDF flooring services' },
            { href: '/vacuum-densification-flooring', label: 'Vacuum densification' },
            { href: '/warehouse-flooring', label: 'Warehouse flooring' },
            { href: '/contact', label: 'Request a quotation' },
          ]}
        />
      </div>
      <div className="mb-4">
        <FooterCTA settings={settings} />
      </div>
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
