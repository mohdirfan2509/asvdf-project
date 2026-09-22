import { getBlogs, getProjects } from '@/lib/content/queries';
import { getSiteUrl } from '@/lib/seo/site';
import { INDEXABLE_PATHS } from '@/lib/seo/routes';
import { projectSlug } from '@/lib/seo/slug';

export default async function sitemap() {
  const siteUrl = getSiteUrl();

  const staticRoutes = INDEXABLE_PATHS.map((item) => ({
    url: item.path === '/' ? `${siteUrl}/` : `${siteUrl}${item.path}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  let blogRoutes = [];
  let projectRoutes = [];

  try {
    const blogs = await getBlogs();
    blogRoutes = (blogs || [])
      .filter((blog) => blog.slug)
      .map((blog) => ({
        url: `${siteUrl}/blog/${blog.slug}`,
        lastModified: blog.published_at ? new Date(blog.published_at) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));
  } catch (err) {
    console.error('sitemap blogs:', err.message);
  }

  try {
    const projects = await getProjects();
    projectRoutes = (projects || []).map((project) => ({
      url: `${siteUrl}/projects/${projectSlug(project)}`,
      lastModified: project.updated_at ? new Date(project.updated_at) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.55,
    }));
  } catch (err) {
    console.error('sitemap projects:', err.message);
  }

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
