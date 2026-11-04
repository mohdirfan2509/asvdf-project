import AboutHero from '@/components/about/AboutHero';
import OurStory from '@/components/about/OurStory';
import { ABOUT_IMAGE } from '@/lib/content/media';
import { ABOUT_COPY } from '@/lib/seo/page-content';

/** About hero and story; shared by /about and the homepage. */
export default function AboutSection({ id, headingAs = 'h2', className = '' }) {
  return (
    <section
      id={id}
      aria-labelledby="about-title"
      className={`space-y-6 sm:space-y-8 max-sm:space-y-4 fit:space-y-5 rounded-panel border border-edge bg-surface p-4 sm:p-6 max-sm:p-3.5 lg:p-8 fit:p-6 shadow-neu-sm ${className}`}
    >
      <AboutHero copy={ABOUT_COPY} image={ABOUT_IMAGE} headingAs={headingAs} headingId="about-title" />
      <OurStory copy={ABOUT_COPY} />
    </section>
  );
}
