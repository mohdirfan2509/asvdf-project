import { STAT_DEFAULTS } from '../stats.js';
import { STARTER_ARTICLES } from './blog-articles.js';
const img = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/** Only the admin-editable numbers; company details are fixed in lib/seo/company.js. */
export const seedSettings = {
  id: 1,
  ...STAT_DEFAULTS,
};

export const seedProjects = [
  {
    id: 'p1',
    slug: 'manufacturing-plant-flooring-hyderabad',
    title: 'Manufacturing Plant Flooring',
    category: 'Industrial',
    location: 'Hyderabad',
    area: '45,000 sq.ft',
    image: img('1581094794329-c8112a89af12'),
    featured: true,
    published: true,
    sort_order: 0,
  },
  {
    id: 'p2',
    slug: 'commercial-complex-flooring-bengaluru',
    title: 'Commercial Complex Flooring',
    category: 'Commercial',
    location: 'Bengaluru',
    area: '32,500 sq.ft',
    image: img('1565008447742-97f6f38c985c'),
    featured: true,
    published: true,
    sort_order: 1,
  },
  {
    id: 'p3',
    slug: 'logistics-warehouse-flooring-chennai',
    title: 'Logistics Warehouse Flooring',
    category: 'Infrastructure',
    location: 'Chennai',
    area: '60,000 sq.ft',
    image: img('1586528116311-ad8dd3c8310d'),
    featured: true,
    published: true,
    sort_order: 2,
  },
  {
    id: 'p4',
    slug: 'automobile-unit-flooring-pune',
    title: 'Automobile Unit Flooring',
    category: 'Industrial',
    location: 'Pune',
    area: '28,000 sq.ft',
    image: img('1581092160607-ee22621dd758'),
    featured: true,
    published: true,
    sort_order: 3,
  },
  {
    id: 'p5',
    slug: 'retail-showroom-flooring-mumbai',
    title: 'Retail Showroom Flooring',
    category: 'Retail',
    location: 'Mumbai',
    area: '12,000 sq.ft',
    image: img('1441986300917-64674bd600d8'),
    featured: true,
    published: true,
    sort_order: 4,
  },
  {
    id: 'p6',
    slug: 'cold-storage-flooring-vijayawada',
    title: 'Cold Storage Flooring',
    category: 'Infrastructure',
    location: 'Vijayawada',
    area: '18,500 sq.ft',
    image: img('1578575437130-527eed3abbec'),
    featured: true,
    published: true,
    sort_order: 5,
  },
  {
    id: 'p7',
    slug: 'parking-area-flooring-hyderabad',
    title: 'Parking Area Flooring',
    category: 'Commercial',
    location: 'Hyderabad',
    area: '22,000 sq.ft',
    image: img('1506521781263-d8422e82f27a'),
    featured: true,
    published: true,
    sort_order: 6,
  },
  {
    id: 'p8',
    slug: 'food-processing-unit-flooring-coimbatore',
    title: 'Food Processing Unit Flooring',
    category: 'Industrial',
    location: 'Coimbatore',
    area: '16,000 sq.ft',
    image: img('1504384308090-c894fdcc538d'),
    featured: true,
    published: true,
    sort_order: 7,
  },
];

export const seedClients = [
  { id: 'c1', name: 'TATA Projects', logo: '', featured: true, published: true, sort_order: 0 },
  { id: 'c2', name: 'L&T', logo: '', featured: true, published: true, sort_order: 1 },
  { id: 'c3', name: 'Adani', logo: '', featured: true, published: true, sort_order: 2 },
  { id: 'c4', name: 'JSW', logo: '', featured: true, published: true, sort_order: 3 },
  { id: 'c5', name: 'DHL', logo: '', featured: true, published: true, sort_order: 4 },
  { id: 'c6', name: 'Godrej', logo: '', featured: true, published: true, sort_order: 5 },
  { id: 'c7', name: 'Reliance', logo: '', featured: true, published: true, sort_order: 6 },
  { id: 'c8', name: 'Ultratech', logo: '', featured: true, published: true, sort_order: 7 },
  { id: 'c9', name: 'Ashok Leyland', logo: '', featured: true, published: true, sort_order: 8 },
  { id: 'c10', name: 'Mahindra', logo: '', featured: true, published: true, sort_order: 9 },
  { id: 'c11', name: 'Bosch', logo: '', featured: true, published: true, sort_order: 10 },
  { id: 'c12', name: 'Siemens', logo: '', featured: true, published: true, sort_order: 11 },
];

export const seedBlogs = [
  {
    id: 'b1',
    title: 'What is VDF Flooring and Why It Matters',
    slug: 'what-is-vdf-flooring',
    excerpt: 'Learn how vacuum dewatered flooring improves strength and durability.',
    body: `VDF flooring is vacuum dewatered flooring: a concrete slab whose wearing surface is densified by extracting surplus water before power trowelling.

Fresh concrete needs extra water to be placed. If that water stays in the top of the slab, the surface is weaker, more porous, and more likely to dust under wheels. VDF uses vacuum mats and a pump to pull that free water out. The cement paste packs more tightly, so strength and abrasion resistance at the surface go up.

In India the same method is also called vacuum densification flooring or vacuum dewatering flooring. The site sequence is the same: place and level the concrete, apply vacuum, finish with power trowels, cut joints, and cure.

VDF is used where the floor is a working surface — warehouses, factories, logistics buildings, automobile units, and similar industrial slabs. It is not a paint or a resin. Chemical-resistant rooms may still need an epoxy or other coating on a prepared substrate.

ASVDF Flooring installs VDF as a core service from our Hyderabad office, using vacuum dewatering units, power trowels, and screeds.`,
    cover: img('1581094794329-c8112a89af12'),
    category: 'Flooring Solutions',
    tags: ['VDF Flooring', 'Concrete Floors'],
    seo_title: 'What is VDF Flooring? | ASVDF Flooring Guide',
    seo_description: 'Complete guide to VDF flooring benefits, process and applications for industrial projects.',
    featured: true,
    published: true,
    published_at: '2026-01-15T00:00:00.000Z',
  },
  {
    id: 'b2',
    title: 'Choosing Industrial Flooring for Warehouses',
    slug: 'industrial-flooring-for-warehouses',
    excerpt: 'Key factors when selecting flooring for logistics and storage facilities.',
    body: `Warehouse floors fail in predictable ways: a soft wearing surface that dusts, joints that spall under forklifts, and flatness that does not match the handling equipment. Choosing a system means matching those risks, not picking a finish from a catalogue photo.

Start with traffic. Pallet movers, counterbalance trucks, and narrow-aisle machines load the slab differently. Then look at racking point loads, housekeeping, and whether any area needs a coated, chemical-resistant surface. Most logistics buildings are well served by a vacuum dewatered (VDF) concrete wearing surface, with hardeners where abrasion is severe.

Joint layout belongs in the drawing, not as an afterthought. So does the pour sequence: a live warehouse may need bays, which affects cost and programme. Curing time is part of the installation, not optional downtime.

ASVDF Flooring installs warehouse and industrial slabs from Hyderabad.`,
    cover: img('1586528116311-ad8dd3c8310d'),
    category: 'Industrial Flooring',
    tags: ['Warehouse Flooring', 'Industrial Flooring'],
    seo_title: 'Industrial Flooring for Warehouses | ASVDF',
    seo_description: 'How to choose the right industrial flooring for warehouses and logistics hubs.',
    featured: true,
    published: true,
    published_at: '2026-02-01T00:00:00.000Z',
  },
  ...STARTER_ARTICLES,
];

export const seedGallery = [
  { id: 'g1', title: 'Plant Floor', image: img('1581094794329-c8112a89af12'), category: 'Industrial', featured: true, published: true, sort_order: 0 },
  { id: 'g2', title: 'Warehouse', image: img('1586528116311-ad8dd3c8310d'), category: 'Infrastructure', featured: true, published: true, sort_order: 1 },
  { id: 'g3', title: 'Commercial Hall', image: img('1565008447742-97f6f38c985c'), category: 'Commercial', featured: true, published: true, sort_order: 2 },
  { id: 'g4', title: 'Factory Bay', image: img('1581092160607-ee22621dd758'), category: 'Industrial', featured: true, published: true, sort_order: 3 },
  { id: 'g5', title: 'Retail Floor', image: img('1441986300917-64674bd600d8'), category: 'Retail', featured: true, published: true, sort_order: 4 },
  { id: 'g6', title: 'Cold Storage', image: img('1578575437130-527eed3abbec'), category: 'Infrastructure', featured: true, published: true, sort_order: 5 },
  { id: 'g7', title: 'Parking Deck', image: img('1506521781263-d8422e82f27a'), category: 'Commercial', featured: true, published: true, sort_order: 6 },
  { id: 'g8', title: 'Polished Concrete', image: img('1497366216548-37526070297c'), category: 'Commercial', featured: true, published: true, sort_order: 7 },
  { id: 'g9', title: 'Production Floor', image: img('1504384308090-c894fdcc538d'), category: 'Industrial', featured: true, published: true, sort_order: 8 },
  { id: 'g10', title: 'Office Campus', image: img('1497366811353-6870744d04b2'), category: 'Commercial', featured: true, published: true, sort_order: 9 },
  { id: 'g11', title: 'Loading Bay', image: img('1586528116311-ad8dd3c8310d', 1000), category: 'Infrastructure', featured: true, published: true, sort_order: 10 },
  { id: 'g12', title: 'Heavy Duty Slab', image: img('1581092160562-40aa08e78837'), category: 'Industrial', featured: true, published: true, sort_order: 11 },
];
