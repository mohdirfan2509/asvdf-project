import BlogsExplorer from '@/components/blogs/BlogsExplorer';
import { toBlogSummary } from '@/lib/blogs';
import { BLOGS_HERO_IMAGE } from '@/lib/content/media';
import { BLOGS_COPY } from '@/lib/seo/page-content';

/** Blog hero followed by the category sidebar, search and article grid; shared by the homepage and /blog. */
export default function BlogsSection({ blogs = [], id, headingAs: Heading = 'h2', className = '' }) {
  const posts = blogs.filter((blog) => blog.slug).map(toBlogSummary);

  return (
    <section id={id} aria-labelledby="blogs-title" className={`space-y-4 lg:space-y-5 ${className}`}>
      <div className="relative isolate overflow-hidden rounded-panel border border-edge bg-surface shadow-neu-sm lg:min-h-[16rem]">
        <div className="relative z-10 p-5 sm:p-7 lg:max-w-[46%] lg:py-9 lg:pl-9 lg:pr-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand">{BLOGS_COPY.eyebrow}</p>
          <Heading
            id="blogs-title"
            className="text-3xl sm:text-4xl lg:text-[2.2rem] xl:text-[2.5rem] font-bold leading-[1.18] tracking-tight text-ink"
          >
            {BLOGS_COPY.headingLine1}
            <br />
            <span className="text-brand">{BLOGS_COPY.headingHighlight}</span>
          </Heading>
          <span className="mt-5 block h-[3px] w-12 rounded-full bg-brand" aria-hidden />
          <p className="mt-5 max-w-md text-sm sm:text-[15px] leading-relaxed text-ink-muted">{BLOGS_COPY.intro}</p>
        </div>

        <div className="relative mx-4 mb-4 h-48 sm:mx-6 sm:mb-6 sm:h-64 overflow-hidden rounded-card lg:absolute lg:inset-y-0 lg:right-0 lg:m-0 lg:h-auto lg:w-[60%] lg:rounded-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BLOGS_HERO_IMAGE}
            alt={BLOGS_COPY.heroImageAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[60%_55%]"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-surface via-surface/60 to-transparent lg:block"
          />
        </div>
      </div>

      <div className="rounded-panel border border-edge bg-surface p-4 sm:p-6 shadow-neu-sm">
        <BlogsExplorer posts={posts} />
      </div>
    </section>
  );
}
