import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, Clock, PenLine } from 'lucide-react';
import SiteShell from '@/components/layout/SiteShell';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import RelatedLinks from '@/components/marketing/RelatedLinks';
import ArticleBody from '@/components/blogs/ArticleBody';
import BlogCard from '@/components/blogs/BlogCard';
import { getBlogBySlug, getBlogs, getSiteSettings } from '@/lib/content/queries';
import { blogTags, categoryKey, formatBlogDate, readingMinutes, toBlogSummary } from '@/lib/blogs';
import { relatedPages } from '@/lib/blog-related-pages';
import { buildMetadata } from '@/lib/seo/metadata';
import { BLOGS_COPY } from '@/lib/seo/page-content';
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
    publishedTime: blog.published_at,
    modifiedTime: blog.updated_at,
    tags: blogTags(blog),
  });
}

/** Up to three other articles, same category first. */
function relatedPosts(blog, blogs) {
  const others = blogs.filter((b) => b.slug && b.slug !== blog.slug);
  const key = categoryKey(blog.category);
  const sameCategory = others.filter((b) => categoryKey(b.category) === key);
  const rest = others.filter((b) => categoryKey(b.category) !== key);
  return [...sameCategory, ...rest].slice(0, 3).map(toBlogSummary);
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const [settings, blog, blogs] = await Promise.all([getSiteSettings(), getBlogBySlug(slug), getBlogs()]);
  if (!blog) notFound();

  const date = formatBlogDate(blog.published_at);
  const minutes = readingMinutes(blog.body || blog.excerpt);
  const tags = blogTags(blog);
  const related = relatedPosts(blog, blogs);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
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
      <article className="mb-4 overflow-hidden rounded-panel border border-edge bg-surface shadow-neu-sm">
        {blog.cover ? (
          <div className="relative aspect-[16/9] sm:aspect-[21/8] w-full bg-surface-sunken">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={blog.cover} alt={blog.title} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        ) : null}

        <div className="mx-auto max-w-3xl px-5 py-7 sm:px-8 sm:py-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {BLOGS_COPY.backLink}
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-muted">
            {blog.category ? (
              <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand">
                {blog.category}
              </span>
            ) : null}
            {date ? (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                <time dateTime={blog.published_at}>{date}</time>
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
              {minutes} min read
            </span>
            <span className="inline-flex items-center gap-1.5">
              <PenLine className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
              By {BLOGS_COPY.author}
            </span>
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-ink">{blog.title}</h1>
          {blog.excerpt ? <p className="mt-3 text-base sm:text-lg leading-relaxed text-ink-muted">{blog.excerpt}</p> : null}
          <span className="mt-6 block h-[3px] w-12 rounded-full bg-brand" aria-hidden />

          <ArticleBody body={blog.body} className="mt-6" />

          {tags.length ? (
            <ul aria-label="Tags" className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
              {tags.map((tag) => (
                <li key={tag} className="rounded-full bg-surface-raised px-3 py-1.5 text-xs font-medium text-ink-muted shadow-neu-sm">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </article>

      {related.length ? (
        <section aria-labelledby="related-articles" className="mb-4 rounded-panel border border-edge bg-surface p-4 sm:p-6 shadow-neu-sm">
          <h2 id="related-articles" className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
            {BLOGS_COPY.relatedHeading}
          </h2>
          <span className="mt-2 block h-[3px] w-10 rounded-full bg-brand" aria-hidden />
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {related.map((post) => (
              <li key={post.id} className="h-full">
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mb-4">
        <RelatedLinks links={relatedPages(blog, blogs)} />
      </div>
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
