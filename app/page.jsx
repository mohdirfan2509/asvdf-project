import SpaApp from '@/components/spa/SpaApp';
import JsonLd from '@/components/seo/JsonLd';
import { getAllContent } from '@/lib/content/queries';
import { buildMetadata } from '@/lib/seo/metadata';
import { BRAND_NAME } from '@/lib/seo/site';
import { graph, faqNode } from '@/lib/seo/schema';

export const revalidate = 60;

function pickForSite(rows) {
  const list = rows || [];
  const selected = list.filter((r) => r.featured === true);
  return selected.length ? selected : list;
}

export async function generateMetadata() {
  const content = await getAllContent({ homepageOnly: false });
  const settings = content.settings || {};
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
  const content = await getAllContent({ homepageOnly: false });

  const spaContent = {
    ...content,
    projects: pickForSite(content.projects),
    services: pickForSite(content.services),
    clients: pickForSite(content.clients),
    testimonials: pickForSite(content.testimonials),
    blogs: pickForSite(content.blogs),
    gallery: pickForSite(content.gallery),
    machinery: pickForSite(content.machinery),
    faqs: pickForSite(content.faqs),
  };

  const faqLd = graph([
    faqNode(
      (spaContent.faqs || []).map((f) => ({ question: f.question, answer: f.answer }))
    ),
  ]);

  return (
    <>
      {spaContent.faqs?.length ? <JsonLd data={faqLd} /> : null}
      <SpaApp content={spaContent} />
    </>
  );
}
