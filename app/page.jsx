import SpaApp from '@/components/spa/SpaApp';
import { getBlogs, getClients, getGallery, getProjects, getSiteSettings } from '@/lib/content/queries';
import { SERVICES } from '@/lib/content/services';
import { buildMetadata } from '@/lib/seo/metadata';
import { BRAND_NAME } from '@/lib/seo/site';

export const revalidate = 60;

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: settings.seo_title || `${BRAND_NAME} | VDF Flooring & Industrial Flooring`,
    description:
      settings.seo_description ||
      'ASVDF Flooring installs VDF and industrial concrete floors for warehouses, plants, and commercial buildings. Based in Hyderabad.',
    path: '/',
    image: settings.hero_image || '/banner.png',
    absoluteTitle: true,
  });
}

export default async function HomePage() {
  // Same queries as the dedicated routes, so each homepage section matches its page.
  const [settings, projects, clients, gallery, blogs] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getClients(),
    getGallery(),
    getBlogs(),
  ]);
  return <SpaApp content={{ settings, projects, clients, services: SERVICES, gallery, blogs }} />;
}
