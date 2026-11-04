import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import { formatBlogDate } from '@/lib/blogs';

/** Article card: cover with category pill, date, title, excerpt, Read More and reading time. */
export default function BlogCard({ post, headingAs: Heading = 'h3', eager = false }) {
  const href = `/blog/${post.slug}`;
  const date = formatBlogDate(post.publishedAt);

  return (
    <article className="surface-raised shadow-neu-sm rounded-card flex h-full flex-col transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-neu-md">
      <div className="relative">
        <div className="aspect-[16/7] fit:aspect-[16/6] overflow-hidden rounded-t-card bg-surface-sunken">
          {post.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover}
              alt={post.title}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        {post.category ? (
          <span className="absolute bottom-0 left-4 translate-y-1/2 rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand shadow-neu-sm ring-1 ring-white">
            {post.category}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3 max-sm:px-3.5 max-sm:pb-3">
        {date ? (
          <p className="flex items-center justify-end gap-1.5 text-xs text-ink-muted">
            <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
            <time dateTime={post.publishedAt}>{date}</time>
          </p>
        ) : null}
        <Heading className="mt-2.5 max-sm:mt-2 line-clamp-2 text-[15px] max-sm:text-sm font-semibold leading-snug text-ink">
          <Link href={href} className="transition-colors hover:text-brand focus-visible:outline-none focus-visible:underline">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-2 max-sm:mt-1.5 line-clamp-3 fit:line-clamp-2 max-sm:line-clamp-2 text-[13px] leading-relaxed max-sm:leading-snug text-ink-muted">{post.excerpt}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 max-sm:pt-3">
          <Link
            href={href}
            className="group/read inline-flex items-center gap-1.5 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:underline"
          >
            Read More
            <span className="sr-only">: {post.title}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/read:translate-x-0.5" aria-hidden />
          </Link>
          <span className="flex items-center gap-1.5 text-xs text-ink-muted">
            <Clock className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
            {post.readingMinutes} min read
          </span>
        </div>
      </div>
    </article>
  );
}
