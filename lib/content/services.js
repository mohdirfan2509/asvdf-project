/**
 * The nine ASVDF services, in display order. Each `path` is that service's landing page
 * (copy in PAGE_COPY, lib/seo/page-content.js). Images are web copies of services-images/*:
 * `image` (960px WebP) for cards and page banners, `shareImage` (1200×630 JPEG) for social previews.
 */
const service = (id, slug, title, description, imageAlt) => ({
  id,
  title,
  description,
  image: `/images/services/${slug}.webp`,
  shareImage: `/images/services/share/${slug}.jpg`,
  imageAlt,
  path: `/${slug}`,
});

export const SERVICES = [
  service(
    's1',
    'vdf-flooring',
    'VDF Flooring',
    'High-strength industrial flooring with superior durability and long-lasting performance.',
    'VDF flooring: operator power trowelling a vacuum dewatered concrete floor'
  ),
  service(
    's2',
    'pqc-flooring',
    'PQC Flooring',
    'High-quality Pavement Quality Concrete (PQC) flooring designed for heavy-duty industrial, commercial, and infrastructure applications, delivering excellent strength, durability, and long-term performance.',
    'PQC flooring: pavement quality concrete for heavy-duty areas'
  ),
  service(
    's3',
    'laser-screed-flooring',
    'Laser Screed Flooring',
    'Advanced laser screed technology for level and smooth concrete floors.',
    'Laser screed flooring: laser-guided levelling of a concrete floor'
  ),
  service(
    's4',
    'concrete-densification-flooring',
    'Concrete Densification Flooring',
    'Densification improves surface hardness, dust resistance, and overall durability.',
    'Concrete densification: hardened, dust-resistant concrete floor'
  ),
  service(
    's5',
    'epoxy-flooring',
    'Epoxy Flooring',
    'Seamless, chemical-resistant epoxy floors for industrial and commercial spaces.',
    'Epoxy flooring: seamless industrial epoxy floor'
  ),
  service(
    's6',
    'floor-hardener-application',
    'Floor Hardener Application',
    'Enhances surface strength and wear resistance for heavy traffic areas.',
    'Floor hardener application on a fresh concrete floor'
  ),
  service(
    's7',
    'groove-cutting-joint-filling',
    'Groove Cutting & Joint Filling',
    'Precision cutting and joint filling to control cracks and improve floor life.',
    'Groove cutting and joint filling on an industrial concrete floor'
  ),
  service(
    's8',
    'bar-bending-services',
    'Bar Bending Services',
    'Accurate cutting, bending and fixing of reinforcement steel as per drawings and bar bending schedules.',
    'Bar bending: cutting, bending and fixing of reinforcement steel'
  ),
  service(
    's9',
    'floor-grinding-polishing',
    'Floor Grinding & Polishing',
    'Achieves smooth, polished surfaces with enhanced aesthetics and durability.',
    'Floor grinding and polishing of a concrete floor'
  ),
];

export function serviceByPath(path) {
  return SERVICES.find((item) => item.path === path) || null;
}
