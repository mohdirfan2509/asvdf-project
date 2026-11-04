import { getBlogs, getProjects } from '@/lib/content/queries';
import { hasCaseStudy, projectPath } from '@/lib/projects';
import { getSiteUrl } from '@/lib/seo/site';
import { INDEXABLE_PATHS } from '@/lib/seo/routes';

export default async function sitemap() {
  const siteUrl = getSiteUrl();

  const staticRoutes = INDEXABLE_PATHS.map((item) => ({
    url: item.path === '/' ? `${siteUrl}/` : `${siteUrl}${item.path}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  let blogRoutes = [];

  try {
    const blogs = await getBlogs();
    blogRoutes = (blogs || [])
      .filter((blog) => blog.slug)
      .map((blog) => ({
        url: `${siteUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.updated_at || blog.published_at || Date.now()),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));
  } catch (err) {
    console.error('sitemap blogs:', err.message);
  }

  let projectRoutes = [];

  try {
    const projects = await getProjects();
    projectRoutes = (projects || []).filter(hasCaseStudy).map((project) => ({
      url: `${siteUrl}${projectPath(project)}`,
      lastModified: new Date(project.updated_at || project.created_at || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch (err) {
    console.error('sitemap projects:', err.message);
  }

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
