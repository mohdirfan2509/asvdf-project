/**
 * FAQ content. Answers use only confirmed company facts (services, regions, contact routes);
 * durations, lifespans and materials are explained as factors, never as promises.
 */
const faq = (id, category, question, answer, keywords, sortOrder) => ({
  id,
  question,
  answer,
  category,
  keywords,
  featured: true,
  published: true,
  sort_order: sortOrder,
});

export const FAQ_ENTRIES = [
  faq(
    'f6',
    'Services',
    'What types of flooring solutions do you offer?',
    'ASVDF Flooring provides VDF (vacuum dewatered) flooring, PQC flooring, laser screed flooring, concrete densification flooring, epoxy flooring, floor hardener application, groove cutting and joint filling, concrete repair and restoration, and floor grinding and polishing. Each service can be used on its own or combined, depending on what the floor needs to handle.',
    'services, VDF, PQC, laser screed, densification, epoxy, hardener, joint filling, repair, grinding, polishing',
    0
  ),
  faq(
    'f1',
    'Services',
    'What is VDF flooring?',
    'VDF (Vacuum Dewatered Flooring) is a concrete flooring technique that removes excess water to increase strength, durability and surface finish.',
    'VDF, vacuum dewatered flooring, concrete',
    1
  ),
  faq(
    'f7',
    'Services',
    'Which flooring solution is best for industrial facilities?',
    'There is no single best floor for every facility. The right system depends on how the floor will be used: expected loads and racking, forklift and vehicle traffic, chemical or oil exposure, cleaning methods, temperature and moisture conditions, and the project specification. We recommend a system once we understand these requirements for each area of the building.',
    'industrial, best flooring, recommendation, loads, traffic, chemicals',
    2
  ),
  faq(
    'f8',
    'Materials',
    'What materials are used in industrial flooring?',
    'Most industrial floors start with a concrete slab built to the project specification. Depending on the system, the surface may then be finished by vacuum dewatering and power trowelling, treated with a surface hardener or densifier, ground and polished, or coated with an epoxy system. Joints are cut and filled with a suitable joint filler. The exact products are selected for each project based on its requirements.',
    'materials, concrete, hardener, densifier, epoxy, joint filler',
    3
  ),
  faq(
    'f9',
    'Materials',
    'What is the difference between VDF and PQC flooring?',
    'VDF (vacuum dewatered flooring) is a finishing method: after concrete is placed, surplus water is extracted with vacuum mats before power trowelling, which densifies the wearing surface. PQC (pavement quality concrete) refers to high-strength concrete designed for pavements and heavy-duty slabs, such as roads, yards and parking areas. They answer different questions: PQC describes the concrete and its use, while VDF describes how a slab surface is finished. The right choice depends on the project specification.',
    'VDF, PQC, pavement quality concrete, vacuum dewatering, difference',
    4
  ),
  faq(
    'f10',
    'Materials',
    'Are your flooring solutions environmentally friendly?',
    'A durable floor that lasts without frequent rework uses fewer materials over its life, so getting the slab, finishing, joints and curing right is the most practical sustainability measure. Where suitable, the finished concrete surface itself can serve as the floor without an additional covering. Environmental performance still depends on the materials and specification chosen for each project, and we do not claim certifications for our flooring.',
    'environment, sustainable, eco-friendly, green',
    5
  ),
  faq(
    'f2',
    'Installation',
    'How long does the installation process take?',
    'It depends on the project. The main factors are the total area, the flooring system, site readiness and preparation, the concrete requirements, weather and site conditions, and the curing and finishing the specification calls for. Large or live sites may also need to be done in phases. We confirm a programme once we have reviewed your project details.',
    'duration, timeline, how long, schedule, curing',
    6
  ),
  faq(
    'f4',
    'Installation',
    'How does vacuum densification work?',
    'After the slab is placed and levelled, vacuum mats extract surplus water so the wearing surface densifies. The floor is then power-trowelled, joints are cut, and the slab is cured.',
    'vacuum densification, process, power trowel, curing, joints',
    7
  ),
  faq(
    'f11',
    'Maintenance',
    'What is the lifespan of industrial flooring?',
    'Lifespan varies with the flooring system, the quality of installation, the traffic and loads the floor carries, the operating environment, and how well it is maintained. Regular cleaning, quick attention to damaged joints, and timely repairs all help a floor stay in service longer. We do not quote a fixed number of years because conditions differ so much between sites.',
    'lifespan, durability, how long does a floor last, life',
    8
  ),
  faq(
    'f12',
    'Maintenance',
    'Do you provide flooring maintenance services?',
    'We provide repair and restoration work for existing floors, including concrete repair and restoration, groove cutting and joint filling, and floor grinding and polishing. Share details and photos of your floor, and we can discuss the work it needs.',
    'maintenance, repair, restoration, joint filling, grinding, polishing',
    9
  ),
  faq(
    'f13',
    'Projects',
    'Which industries do you serve?',
    'Our floors are used in warehouses and logistics buildings, factories and manufacturing plants, automobile units, commercial buildings, and similar industrial and infrastructure facilities.',
    'industries, warehouses, logistics, factories, manufacturing, automobile, commercial, infrastructure',
    10
  ),
  faq(
    'f14',
    'Projects',
    'Do you undertake large-scale industrial and infrastructure projects?',
    'Yes. We take on industrial and infrastructure flooring work using vacuum dewatering units, power trowels, screeds and laser screed equipment. Every project is planned around its area, specification and site conditions, so share your requirements and we will discuss how the work can be carried out.',
    'large projects, infrastructure, capacity, equipment, laser screed',
    11
  ),
  faq(
    'f3',
    'Projects',
    'Do you work across India?',
    'The registered office is in Shamshabad, Ranga Reddy, Telangana. We take VDF and industrial flooring work across Telangana, Andhra Pradesh, Karnataka (including Bengaluru), Maharashtra, Odisha, and Chennai.',
    'locations, service areas, India, Telangana, Hyderabad, Bengaluru, Chennai',
    12
  ),
  faq(
    'f15',
    'Projects',
    'What information is required to request a flooring quotation?',
    'Helpful details include the project location, the approximate floor area, how the floor will be used, the flooring type if you already know it, the current site condition, and any drawings or specifications you have. Send them through the contact form, by phone or WhatsApp, or by email.',
    'quotation, quote, information, drawings, specification, area',
    13
  ),
  faq(
    'f5',
    'Projects',
    'How do I request a VDF flooring quotation?',
    'Share city, approximate area, and building type by calling or WhatsApp +91 90632 22804, emailing info@asvdf.com, or using the contact form. We quote from those details rather than a public rate card.',
    'quotation, quote, contact, phone, WhatsApp, email, price',
    14
  ),
];
