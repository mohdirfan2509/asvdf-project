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
  const { settings, projects, clients, testimonials, services, about, gallery, blogs, faqs } = content || {};

  return (
    <div className="spa-shell font-sans antialiased text-ink selection:bg-brand selection:text-white">
      <div className="spa-nav-sticky">
        <div className="w-full max-w-[1440px] mx-auto">
          <Navbar settings={settings} activePath="/" />
        </div>
      </div>

      <main id="main">
        <section id="home" aria-label="Home" className="spa-section spa-section--auto">
          <Home settings={settings} />
        </section>

        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 pt-6 lg:pt-8 space-y-6 lg:space-y-8">
          <ProjectsSection id="projects" settings={settings} projects={projects} className="home-section" />
          <ClientsSection
            id="clients"
            settings={settings}
            clients={clients}
            testimonials={testimonials}
            className="home-section"
          />
          <ServicesOverview id="services" settings={settings} services={services} className="home-section" />
          <AboutSection id="about" image={about?.image} className="home-section" />
          <ContactSection id="contact" settings={settings} services={services} className="home-section" />
          <GallerySection id="gallery" settings={settings} images={gallery} className="home-section" />
          <TestimonialsSection
            id="testimonials"
            settings={settings}
            testimonials={testimonials}
            clients={clients}
            className="home-section"
          />
          <BlogsSection id="blogs" blogs={blogs} className="home-section" />
          <FaqSection id="faqs" settings={settings} faqs={faqs} className="home-section" />
        </div>
      </main>

      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 pt-6 lg:pt-8 pb-28 md:pb-10">
        <CrawlableFooter settings={settings} />
      </div>

      <MobileContactBar settings={settings} />
      <FloatingContact settings={settings} />
    </div>
  );
}
