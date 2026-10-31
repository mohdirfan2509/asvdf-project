import AboutHero from '@/components/about/AboutHero';
import OurStory from '@/components/about/OurStory';
import { ABOUT_COPY } from '@/lib/seo/page-content';

/** About hero and story; shared by /about and the homepage. */
export default function AboutSection({ image, id, headingAs = 'h2', className = '' }) {
  return (
    <section
      id={id}
      aria-labelledby="about-title"
      className={`space-y-6 sm:space-y-8 rounded-panel border border-white/80 bg-surface p-4 sm:p-6 lg:p-8 shadow-neu-sm ${className}`}
    >
      <AboutHero copy={ABOUT_COPY} image={image} headingAs={headingAs} headingId="about-title" />
      <OurStory copy={ABOUT_COPY} />
    </section>
  );
}
