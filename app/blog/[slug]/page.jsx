import { notFound } from 'next/navigation';
import SiteShell from '@/components/layout/SiteShell';
import FooterCTA from '@/components/sections/FooterCTA';
import { getBlogBySlug, getBlogs, getSiteSettings } from '@/lib/content/queries';

export const revalidate = 60;

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: 'Article' };
  return {
    title: blog.seo_title || blog.title,
    description: blog.seo_description || blog.excerpt,
    alternates: { canonical: `/blog/${blog.slug}` },
    openGraph: {
      title: blog.seo_title || blog.title,
      description: blog.seo_description || blog.excerpt,
      images: blog.cover ? [{ url: blog.cover }] : undefined,
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const [settings, blog] = await Promise.all([getSiteSettings(), getBlogBySlug(slug)]);
  if (!blog) notFound();

  return (
    <SiteShell settings={settings} activePath="/blog">
      <article className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 neu-lg border border-white/80 mb-4">
        <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-2">{blog.category}</p>
        <h1 className="text-3xl sm:text-4xl font-[800] tracking-tight text-slate-900 mb-3">{blog.title}</h1>
        <p className="text-sm text-slate-500 mb-5">{blog.excerpt}</p>
        {blog.cover && (
          <div className="h-56 sm:h-72 rounded-2xl bg-cover bg-center mb-6" style={{ backgroundImage: `url('${blog.cover}')` }} />
        )}
        <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed whitespace-pre-line text-slate-700">
          {blog.body}
        </div>
      </article>
      <FooterCTA settings={settings} />
    </SiteShell>
  );
}
