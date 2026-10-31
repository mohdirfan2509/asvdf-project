import { DEFAULT_PHONE, DEFAULT_WHATSAPP } from '../contact.js';
import { STAT_DEFAULTS } from '../stats.js';
import { STARTER_ARTICLES } from './blog-articles.js';
import { FAQ_ENTRIES } from './faq-entries.js';

const img = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const seedSettings = {
  id: 1,
  company_name: 'ASVDF Flooring',
  legal_name: 'ASVDF FLOORING PRIVATE LIMITED',
  gstin: '36ABBCA9210B2Z7',
  pan: 'ABBCA9210B',
  phone: DEFAULT_PHONE,
  whatsapp: DEFAULT_WHATSAPP,
  email: 'info@asvdf.com',
  working_hours: 'Everyday 7:00 AM to 9:00 PM',
  address:
    'Ground Floor, Flat No. 22-250/7/5/A/1, Plot No. 7, Survey No. 324/EE, Airport Residency Phase II, Near ORR Toll Plaza, Shamshabad, Ranga Reddy, Telangana – 501218',
  seo_title: 'ASVDF Flooring | Premium VDF Flooring Solutions in India',
  seo_description:
    'ASVDF Flooring delivers high-performance VDF, industrial and commercial flooring. Built for durability. Designed to last.',
  seo_keywords:
    'VDF flooring, vacuum dewatered flooring, industrial flooring, ASVDF, flooring contractors India',
  hero_badge: 'PREMIUM FLOORING SOLUTIONS',
  hero_heading_1: 'Stronger Floors.',
  hero_heading_2: 'Stronger ',
  hero_highlight: 'Foundations.',
  hero_subtext:
    'High-performance flooring solutions for industrial, commercial and infrastructure projects. Built for durability. Designed to last.',
  hero_image: '/banner.png',
  cta_primary: 'Explore Our Services',
  cta_secondary: 'View Our Projects',
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

const service = (id, title, description, imageId, category, sortOrder) => ({
  id,
  title,
  description,
  image: img(imageId, 600),
  category,
  featured: true,
  published: true,
  sort_order: sortOrder,
});

export const seedServices = [
  service('s1', 'VDF Flooring', 'High-strength industrial flooring with superior durability and long-lasting performance.', '1581094794329-c8112a89af12', 'Industrial Flooring', 0),
  service('s2', 'PQC Flooring', 'High-quality Pavement Quality Concrete (PQC) flooring designed for heavy-duty industrial, commercial, and infrastructure applications, delivering excellent strength, durability, and long-term performance.', '1581092160607-ee22621dd758', 'Concrete Solutions', 1),
  service('s3', 'Laser Screed Flooring', 'Advanced laser screed technology for level and smooth concrete floors.', '1504384308090-c894fdcc538d', 'Concrete Solutions', 2),
  service('s4', 'Concrete Densification Flooring', 'Densification improves surface hardness, dust resistance, and overall durability.', '1581092160562-40aa08e78837', 'Concrete Solutions', 3),
  service('s5', 'Epoxy Flooring', 'Seamless, chemical-resistant epoxy floors for industrial and commercial spaces.', '1586528116311-ad8dd3c8310d', 'Industrial Flooring', 4),
  service('s6', 'Floor Hardener Application', 'Enhances surface strength and wear resistance for heavy traffic areas.', '1578575437130-527eed3abbec', 'Industrial Flooring', 5),
  service('s7', 'Groove Cutting & Joint Filling', 'Precision cutting and joint filling to control cracks and improve floor life.', '1506521781263-d8422e82f27a', 'Concrete Solutions', 6),
  service('s8', 'Concrete Repair & Restoration', 'Restoring damaged concrete surfaces for safety, strength, and longevity.', '1441986300917-64674bd600d8', 'Concrete Solutions', 7),
  service('s9', 'Floor Grinding & Polishing', 'Achieves smooth, polished surfaces with enhanced aesthetics and durability.', '1565008447742-97f6f38c985c', 'Industrial Flooring', 8),
];

export const seedClients = [
  { id: 'c1', name: 'TATA Projects', logo: '', industry: 'Infrastructure', featured: true, published: true, sort_order: 0 },
  { id: 'c2', name: 'L&T', logo: '', industry: 'Infrastructure', featured: true, published: true, sort_order: 1 },
  { id: 'c3', name: 'Adani', logo: '', industry: 'Industrial', featured: true, published: true, sort_order: 2 },
  { id: 'c4', name: 'JSW', logo: '', industry: 'Industrial', featured: true, published: true, sort_order: 3 },
  { id: 'c5', name: 'DHL', logo: '', industry: 'Logistics', featured: true, published: true, sort_order: 4 },
  { id: 'c6', name: 'Godrej', logo: '', industry: 'Commercial', featured: true, published: true, sort_order: 5 },
  { id: 'c7', name: 'Reliance', logo: '', industry: 'Industrial', featured: true, published: true, sort_order: 6 },
  { id: 'c8', name: 'Ultratech', logo: '', industry: 'Industrial', featured: true, published: true, sort_order: 7 },
  { id: 'c9', name: 'Ashok Leyland', logo: '', industry: 'Automotive', featured: true, published: true, sort_order: 8 },
  { id: 'c10', name: 'Mahindra', logo: '', industry: 'Automotive', featured: true, published: true, sort_order: 9 },
  { id: 'c11', name: 'Bosch', logo: '', industry: 'Industrial', featured: true, published: true, sort_order: 10 },
  { id: 'c12', name: 'Siemens', logo: '', industry: 'Industrial', featured: true, published: true, sort_order: 11 },
];

export const seedTestimonials = [
  {
    id: 't1',
    name: 'Ravi Kumar',
    role: 'Plant Manager',
    quote: 'ASVDF delivered a flawless VDF floor on schedule. Highly recommended.',
    avatar: img('1507003211169-0a1dd7228f2d', 200),
    rating: 5,
    featured: true,
    published: true,
    sort_order: 0,
  },
  {
    id: 't2',
    name: 'Ananya Sharma',
    role: 'Project Head',
    quote: 'Quality workmanship and professional team throughout the project.',
    avatar: img('1573496359142-b8d87734a5a2', 200),
    rating: 5,
    featured: true,
    published: true,
    sort_order: 1,
  },
  {
    id: 't3',
    name: 'Suresh Reddy',
    role: 'Warehouse Owner',
    quote: 'Durable finish that stands up to heavy forklift traffic every day.',
    avatar: img('1500648767791-00dcc994a43e', 200),
    rating: 5,
    featured: true,
    published: true,
    sort_order: 2,
  },
];

export const seedBlogs = [
  {
    id: 'b1',
    title: 'What is VDF Flooring and Why It Matters',
    slug: 'what-is-vdf-flooring',
    excerpt: 'Learn how vacuum dewatered flooring improves strength and durability.',
    body: 'VDF (Vacuum Dewatered Flooring) removes excess water from concrete to create denser, stronger industrial floors. Ideal for warehouses, factories and high-traffic spaces.',
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
    body: 'Warehouse floors need abrasion resistance, flatness and low maintenance. ASVDF designs systems matched to load and traffic patterns.',
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

export const seedMachinery = [
  { id: 'm1', name: 'Vacuum Dewatering Unit', specs: 'High-capacity vacuum system for VDF', image: img('1581092160607-ee22621dd758', 600), featured: true, published: true, sort_order: 0 },
  { id: 'm2', name: 'Power Trowel', specs: 'Ride-on finishing for large slabs', image: img('1504384308090-c894fdcc538d', 600), featured: true, published: true, sort_order: 1 },
  { id: 'm3', name: 'Concrete Screed', specs: 'Laser-guided leveling accuracy', image: img('1581094794329-c8112a89af12', 600), featured: true, published: true, sort_order: 2 },
];

export const seedFaqs = FAQ_ENTRIES;

export const seedMilestones = [
  { id: 'ms1', year: '2015', title: 'Company Founded', description: 'ASVDF Flooring started with a focus on industrial VDF systems.', published: true, sort_order: 0 },
  { id: 'ms2', year: '2018', title: '100+ Projects', description: 'Crossed 100 completed flooring projects across India.', published: true, sort_order: 1 },
  { id: 'ms3', year: '2022', title: 'Advanced Machinery', description: 'Expanded fleet with modern vacuum and finishing equipment.', published: true, sort_order: 2 },
  { id: 'ms4', year: '2025', title: 'Pan-India Delivery', description: 'Serving industrial and commercial clients nationwide.', published: true, sort_order: 3 },
];

export const seedValues = [
  { id: 'v1', title: 'Quality', description: 'Precision workmanship on every slab.', icon: 'shield', published: true, sort_order: 0 },
  { id: 'v2', title: 'Safety', description: 'Site safety and compliance first.', icon: 'shield-check', published: true, sort_order: 1 },
  { id: 'v3', title: 'Reliability', description: 'On-time delivery you can trust.', icon: 'clock', published: true, sort_order: 2 },
  { id: 'v4', title: 'Partnership', description: 'Long-term client relationships.', icon: 'users', published: true, sort_order: 3 },
];

export const seedAbout = {
  id: 1,
  headline: 'About ASVDF Flooring',
  body: 'ASVDF Flooring specializes in high-performance VDF and industrial flooring systems. We combine modern machinery, skilled teams and strict quality control to deliver floors that last.',
  image: img('1581094794329-c8112a89af12'),
};

export const seedSections = [
  { id: 'sec1', key: 'home', label: 'Home', enabled: true, sort_order: 0 },
  { id: 'sec2', key: 'projects', label: 'Projects', enabled: true, sort_order: 1 },
  { id: 'sec3', key: 'clients', label: 'Clients', enabled: true, sort_order: 2 },
  { id: 'sec4', key: 'services', label: 'Services', enabled: true, sort_order: 3 },
  { id: 'sec12', key: 'machinery', label: 'Machinery', enabled: true, sort_order: 4 },
  { id: 'sec5', key: 'about', label: 'About Us', enabled: true, sort_order: 5 },
  { id: 'sec6', key: 'milestones', label: 'Milestones', enabled: true, sort_order: 6 },
  { id: 'sec7', key: 'values', label: 'Core Values', enabled: true, sort_order: 7 },
  { id: 'sec8', key: 'contact', label: 'Contact Us', enabled: true, sort_order: 8 },
  { id: 'sec9', key: 'contact_form', label: 'Contact Form', enabled: false, sort_order: 9 },
  { id: 'sec10', key: 'testimonials', label: 'Testimonials', enabled: true, sort_order: 10 },
  { id: 'sec11', key: 'blogs', label: 'Blogs', enabled: true, sort_order: 11 },
  { id: 'sec13', key: 'gallery', label: 'Gallery', enabled: true, sort_order: 12 },
  { id: 'sec14', key: 'faqs', label: 'FAQs', enabled: true, sort_order: 13 },
  { id: 'sec15', key: 'footer', label: 'Footer', enabled: true, sort_order: 14 },
];
