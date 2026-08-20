import { getBlogs, getSiteSettings } from '@/lib/content/queries';

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const blogs = await getBlogs();

  const staticRoutes = ['', '/projects', '/services', '/about', '/contact', '/blog'].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  const blogRoutes = blogs.map((blog) => ({
    url: `${siteUrl}/blog/${blog.slug}`,
    lastModified: blog.published_at ? new Date(blog.published_at) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
