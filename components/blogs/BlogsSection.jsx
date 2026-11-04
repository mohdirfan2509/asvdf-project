import BlogsExplorer from '@/components/blogs/BlogsExplorer';
import { toBlogSummary } from '@/lib/blogs';
import { BLOGS_HERO_IMAGE } from '@/lib/content/media';
import { BLOGS_COPY } from '@/lib/seo/page-content';

/**
 * Blog hero followed by the category sidebar, search and article grid; shared by the homepage and /blog.
 * `fitScreen` (homepage only) shows one row of articles per page where the section must fit one screen.
 */
export default function BlogsSection({ blogs = [], id, headingAs: Heading = 'h2', className = '', fitScreen = false }) {
  const posts = blogs.filter((blog) => blog.slug).map(toBlogSummary);

  return (
    <section id={id} aria-labelledby="blogs-title" className={`space-y-4 lg:space-y-5 max-sm:space-y-3 fit:space-y-4 ${className}`}>
      <div className="relative isolate overflow-hidden rounded-panel border border-edge bg-surface shadow-neu-sm lg:min-h-[16rem] fit:min-h-0">
        <div className="relative z-10 p-5 sm:p-7 max-sm:p-3.5 lg:max-w-[46%] lg:py-9 lg:pl-9 lg:pr-4 fit:py-6">
          <p className="mb-2 max-sm:mb-1 fit:mb-1.5 text-xs max-sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">{BLOGS_COPY.eyebrow}</p>
          <Heading
            id="blogs-title"
            className="text-3xl sm:text-4xl max-sm:text-[1.45rem] lg:text-[2.2rem] xl:text-[2.5rem] fit:text-[1.9rem] font-bold leading-[1.18] max-sm:leading-[1.25] tracking-tight text-ink"
          >
            {BLOGS_COPY.headingLine1}{' '}
            <br className="fit:hidden" />
            <span className="text-brand">{BLOGS_COPY.headingHighlight}</span>
          </Heading>
          <span className="mt-5 max-sm:mt-2.5 fit:mt-3 block h-[3px] w-12 rounded-full bg-brand" aria-hidden />
          <p className="mt-5 max-sm:mt-2.5 fit:mt-3 max-w-md text-sm sm:text-[15px] max-sm:text-[13px] fit:text-sm leading-relaxed max-sm:leading-snug text-ink-muted">{BLOGS_COPY.intro}</p>
        </div>

        <div className="relative mx-4 mb-4 h-48 max-sm:mx-3 max-sm:mb-3 max-sm:h-28 sm:mx-6 sm:mb-6 sm:h-64 overflow-hidden rounded-card lg:absolute lg:inset-y-0 lg:right-0 lg:m-0 lg:h-auto lg:w-[60%] lg:rounded-none">
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

      <div className="rounded-panel border border-edge bg-surface p-4 sm:p-6 max-sm:p-3 fit:p-5 shadow-neu-sm">
        <BlogsExplorer posts={posts} fitScreen={fitScreen} />
      </div>
    </section>
  );
}
