import Navbar from '@/components/layout/Navbar';
import MobileContactBar from '@/components/layout/MobileContactBar';
import FloatingContact from '@/components/layout/FloatingContact';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import Home from '@/components/sections/full/Home';
import ProjectsSection from '@/components/projects/ProjectsSection';
import ClientsSection from '@/components/clients/ClientsSection';
import ServicesOverview from '@/components/services/ServicesOverview';
import AboutSection from '@/components/about/AboutSection';
import ContactSection from '@/components/contact/ContactSection';
import GallerySection from '@/components/gallery/GallerySection';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import BlogsSection from '@/components/blogs/BlogsSection';
import FaqSection from '@/components/faqs/FaqSection';

/** Continuous homepage: shared header, every main section in document flow, shared footer. */
export default function SpaApp({ content }) {
  const { settings, projects, clients, services, gallery, blogs } = content || {};
  // Only the fields the header search needs, so article bodies are not sent to the client twice.
  const searchData = {
    blogs: (blogs || []).map(({ slug, title, category, excerpt }) => ({ slug, title, category, excerpt })),
    projects: (projects || []).map(({ id, slug, title, location, category, flooring_type }) => ({
      id,
      slug,
      title,
      location,
      category,
      flooring_type,
    })),
  };

  return (
    <div className="spa-shell font-sans antialiased text-ink selection:bg-brand-solid selection:text-white">
      <div className="spa-nav-sticky">
        <div className="w-full max-w-[1440px] mx-auto">
          <Navbar settings={settings} activePath="/" searchData={searchData} />
        </div>
      </div>

      <main id="main">
        <section
          id="home"
          aria-label="Home"
          className="spa-section spa-section--auto mx-auto w-full max-w-[1440px] px-3 sm:px-4 pt-2"
        >
          <Home settings={settings} />
        </section>

        <div className="home-fit-scope w-full max-w-[1440px] mx-auto px-3 sm:px-4 pt-6 max-sm:pt-4 lg:pt-8 space-y-6 max-sm:space-y-4 lg:space-y-8">
          <ServicesOverview id="services" settings={settings} services={services} className="home-section" />
          <ClientsSection id="clients" settings={settings} clients={clients} className="home-section" />
          <ProjectsSection id="projects" settings={settings} projects={projects} className="home-section" fitScreen />
          <AboutSection id="about" className="home-section" />
          <ContactSection id="contact" settings={settings} services={services} className="home-section" />
          <GallerySection id="gallery" settings={settings} images={gallery} className="home-section" />
          <TestimonialsSection id="testimonials" settings={settings} className="home-section" />
          <BlogsSection id="blogs" blogs={blogs} className="home-section" fitScreen />
          <FaqSection id="faqs" settings={settings} className="home-section" fitScreen />
        </div>
      </main>

      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 pt-6 max-sm:pt-4 lg:pt-8 pb-20 md:pb-10">
        <CrawlableFooter settings={settings} />
      </div>

      <MobileContactBar settings={settings} />
      <FloatingContact settings={settings} />
    </div>
  );
}
