import { Building2, Images, LayoutGrid } from 'lucide-react';
import OrbStatCards from '@/components/ui/OrbStatCards';
import GalleryExplorer from '@/components/gallery/GalleryExplorer';
import { GALLERY_COPY } from '@/lib/seo/page-content';
import { statValue } from '@/lib/stats';

/** Gallery introduction with statistics, followed by the filterable photo grid. */
export default function GallerySection({ settings, images = [], id, headingAs: Heading = 'h2', className = '' }) {
  const stats = [
    { key: 'images', label: 'Images', icon: Images, value: images.length ? String(images.length) : null },
    { key: 'stat_projects', label: 'Projects', icon: LayoutGrid, value: statValue(settings, 'stat_projects') },
    { key: 'stat_industries', label: 'Industries', icon: Building2, value: statValue(settings, 'stat_industries') },
  ];

  return (
    <section id={id} aria-labelledby="gallery-title" className={`space-y-4 lg:space-y-5 max-sm:space-y-3 fit:space-y-3 ${className}`}>
      <div className="grid gap-6 max-sm:gap-3 rounded-panel border border-edge bg-surface p-5 sm:p-7 max-sm:p-3.5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:px-9 lg:py-8 fit:py-4 shadow-neu-sm">
        <div>
          <p className="mb-2 max-sm:mb-1 fit:mb-1.5 text-xs max-sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">{GALLERY_COPY.eyebrow}</p>
          <Heading
            id="gallery-title"
            className="text-3xl sm:text-4xl max-sm:text-[1.45rem] lg:text-[2.2rem] xl:text-[2.5rem] fit:text-[1.9rem] font-bold leading-[1.18] max-sm:leading-[1.25] tracking-tight text-ink"
          >
            {GALLERY_COPY.headingLine1}{' '}
            <br className="fit:hidden" />
            {GALLERY_COPY.headingLine2}
            <span className="text-brand">{GALLERY_COPY.headingHighlight}</span>
          </Heading>
          <span className="mt-5 max-sm:mt-2.5 fit:mt-3 block h-[3px] w-12 rounded-full bg-brand" aria-hidden />
          <p className="mt-5 max-sm:mt-2.5 fit:mt-3 max-w-md fit:max-w-xl text-sm sm:text-[15px] max-sm:text-[13px] fit:text-sm leading-relaxed max-sm:leading-snug text-ink-muted">{GALLERY_COPY.intro}</p>
        </div>
        <OrbStatCards
          items={stats}
          iconClassName="icon-well fit:h-10 fit:w-10"
          cardClassName="lg:min-w-[7.5rem] xl:min-w-[8.75rem] xl:py-6 fit:py-3.5 fit:pr-5"
        />
      </div>

      <div className="rounded-panel border border-edge bg-surface p-4 sm:p-6 max-sm:p-3 fit:p-4 shadow-neu-sm">
        <GalleryExplorer images={images} />
      </div>
    </section>
  );
}
