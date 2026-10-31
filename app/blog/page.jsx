import SiteShell from '@/components/layout/SiteShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import BlogsSection from '@/components/blogs/BlogsSection';
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
    { name: 'Blog', path: '/blog' },
  ];
  const jsonLd = graph([organizationNode(settings), breadcrumbNode(breadcrumbs)]);

  return (
    <SiteShell settings={settings} activePath="/blog">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <BlogsSection blogs={blogs} headingAs="h1" className="mb-4" />
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
