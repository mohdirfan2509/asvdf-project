import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { serviceIcon } from '@/components/services/serviceIcon';

/** Service tile: photo beside the text from `md`; on phones a compact photo-over-title card without the description. */
export default function ServiceCard({ service }) {
  const Icon = serviceIcon(service.title);

  return (
    <article className="group relative flex h-full flex-col md:flex-row overflow-hidden rounded-card surface-raised shadow-neu-sm transition-shadow duration-200 hover:shadow-neu-md focus-within:ring-2 focus-within:ring-brand/40">
      <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[7.5rem] short-desktop:min-h-[6.75rem] md:w-[43%] shrink-0 overflow-hidden bg-surface-sunken">
        {service.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={service.image}
            srcSet={service.cardImage ? `${service.cardImage} 640w, ${service.image} 960w` : undefined}
            sizes="(max-width: 767px) 50vw, 25vw"
            alt={service.imageAlt || service.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-3 max-sm:p-2.5 xl:p-3.5 short-desktop:p-2.5">
        <div className="flex items-start gap-2.5 max-sm:items-center max-sm:gap-2">
          <span className="icon-well h-9 w-9 max-sm:h-7 max-sm:w-7">
            <Icon className="h-4 w-4 max-sm:h-3.5 max-sm:w-3.5" strokeWidth={1.6} aria-hidden />
          </span>
          <h3 className="pt-1 max-sm:pt-0 text-sm max-sm:text-[12.5px] font-semibold leading-snug text-ink">
            {service.href ? (
              <Link href={service.href} className="after:absolute after:inset-0 focus-visible:outline-none">
                {service.title}
              </Link>
            ) : (
              service.title
            )}
          </h3>
        </div>
        <div className="mt-2 flex flex-1 items-end gap-2 max-sm:hidden">
          {service.description ? (
            <p
              title={service.description}
              className="flex-1 self-start text-xs leading-relaxed text-ink-muted line-clamp-3 short-desktop:line-clamp-2"
            >
              {service.description}
            </p>
          ) : (
            <span className="flex-1" />
          )}
          {service.href ? (
            <span
              aria-hidden
              className="icon-well h-9 w-9 text-ink transition-colors duration-200 group-hover:text-brand"
            >
              <ArrowRight className="h-4 w-4" />
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
