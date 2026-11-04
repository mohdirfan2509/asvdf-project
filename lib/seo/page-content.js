/**
 * Unique SEO copy for indexable pages.
 * Company facts are limited to information already on the site (lib/seo/company.js, the service list,
 * equipment, published stats). Location pages add only public facts about each area's industrial
 * hubs and climate, never projects or clients there that have not been confirmed.
 */

import { FOUNDED_YEAR } from '@/lib/stats';
import { ALL_INDIA_AREA, COMPANY, SERVICE_AREAS } from '@/lib/seo/company';
import { formatDisplayPhone } from '@/lib/contact';
import { SERVICES } from '@/lib/content/services';

const PHONE = formatDisplayPhone(COMPANY.phone);
const EMAIL = COMPANY.email;
const GSTIN = COMPANY.gstin;
const SERVICE_TITLES = SERVICES.map((service) => service.title);
const SERVICE_LIST_TEXT = `${SERVICE_TITLES.slice(0, -1).join(', ')} and ${SERVICE_TITLES.at(-1)}`;

/** Curing minimums from IS 456:2000 (cl. 13.5.1), used wherever the site talks about programme length. */
const CURING_NOTE =
  'IS 456 calls for at least 7 days of moist curing for ordinary Portland cement concrete and at least 10 days where blended cements or mineral admixtures are used, extended in hot, dry weather.';

const AREA_NAMES = SERVICE_AREAS.map((area) => area.name);
const NAMED_AREAS_TEXT = `${AREA_NAMES.slice(0, -1).join(', ')} and ${AREA_NAMES.at(-1)}`;

/** States without their own location page (Tamil Nadu is listed; only Chennai has a page). */
const OTHER_STATES = [
  'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Kerala', 'Madhya Pradesh', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

const UNION_TERRITORIES = [
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

/**
 * Extra depth for the location pages: what is built in each area (public facts about its industry, no
 * claimed projects), plus the specification and project-flow sections every location page shares.
 */
const LOCATION_DEPTH = {
  hyderabad: {
    name: 'Hyderabad',
    industries:
      'Hyderabad’s demand for heavy-duty floors comes from a mix of sectors: pharmaceutical and bulk-drug plants around Genome Valley, Patancheru and Pashamylaram; aerospace and precision manufacturing at Adibatla; distribution and e-commerce warehouses near the airport and along the Bengaluru highway; and the basements, parking decks and service areas of the city’s large commercial and IT campuses.',
    needs: [
      'Pharma and life-sciences plants — a dense VDF base that is ready for epoxy or PU coatings in production and clean areas',
      'Warehouses and logistics parks — flat, abrasion-resistant floors for forklifts, pallet trucks and racking',
      'Commercial basements and parking decks — durable trowelled concrete that resists tyre wear and dusting',
    ],
    mobilisation: 'Our Shamshabad office is inside the Hyderabad region, so site visits and mobilisation are quick and supervision stays close to the job.',
  },
  bangalore: {
    name: 'Bengaluru',
    industries:
      'Around Bengaluru, industrial floors are built for electronics and aerospace suppliers, automotive plants and their vendor parks around Bidadi and Hosur Road, warehousing hubs at Hoskote, Nelamangala and Dobbaspet, and the basements and service floors of the city’s technology parks and commercial buildings.',
    needs: [
      'Electronics and precision plants — dust-free, level floors that can take a coating where the process needs it',
      'Automotive and engineering units — slabs that resist abrasion and point loads from machines and material handling',
      'Warehousing on the highway corridors — large-bay VDF floors planned for racking and forklift traffic',
    ],
    mobilisation: 'Crews and vacuum dewatering equipment travel from our Shamshabad base in Hyderabad, so pour dates are planned with the main contractor before mobilisation.',
  },
  chennai: {
    name: 'Chennai',
    industries:
      'The Chennai region is one of India’s main automotive and electronics manufacturing belts, with large plants and supplier parks around Sriperumbudur, Oragadam and the Chengalpattu side, port-linked logistics to the north near Ennore, and warehousing along the Bengaluru and GST road corridors.',
    needs: [
      'Automotive and component plants — high-abrasion floors with hardener for forklift and trolley routes',
      'Port-linked and highway warehouses — large VDF floors laid bay by bay for racking and docks',
      'Coastal sites — careful curing and joint detailing in a humid climate with heavy northeast-monsoon rain',
    ],
    mobilisation: 'Crews and equipment mobilise from our Hyderabad base, so we fix pour sequences and site readiness with the client before travelling.',
  },
  telangana: {
    name: 'Telangana',
    industries:
      'Outside the Hyderabad core, Telangana’s industrial floors serve pharma and chemical units, food processing and rice mills, textile units around the Kakatiya Mega Textile Park near Warangal, cement and mineral-based industry in the north and south of the state, and the warehouses and cold stores that serve them.',
    needs: [
      'Food, rice-mill and cold-storage buildings — hard-wearing floors that are easy to clean',
      'Pharma and chemical units — a sound VDF slab as the base for resin coatings where chemicals are handled',
      'District warehouses and godowns — cost-effective VDF floors for stacking and handling',
    ],
    mobilisation: 'Being registered in Telangana, we reach most sites in the state directly from Shamshabad with our own vacuum dewatering and finishing equipment.',
  },
  andhraPradesh: {
    name: 'Andhra Pradesh',
    industries:
      'Andhra Pradesh has several distinct industrial clusters: the Sri City zone near Tirupati, the automotive belt around Penukonda in Anantapur district, port-based industry, pharma and steel around Visakhapatnam, and food processing, aquaculture and warehousing along the coast and around Vijayawada and Guntur.',
    needs: [
      'Manufacturing plants in industrial zones — VDF floors with hardener for machine and forklift areas',
      'Aqua, seafood and food-processing units — dense slabs that can take hygienic coatings and frequent washing',
      'Port and coastal warehouses — large floors planned for heavy stacking and humid coastal conditions',
    ],
    mobilisation: 'Sites in Andhra Pradesh are served from our Hyderabad base, with travel and pour dates agreed once the site is ready for flooring.',
  },
  karnataka: {
    name: 'Karnataka',
    industries:
      'Beyond Bengaluru, Karnataka’s industrial floors are built for engineering and automotive units around Mysuru, Tumakuru and Hubballi–Dharwad, aerospace and precision-engineering suppliers in Belagavi, steel and mineral industry in the Ballari region, and food parks and warehouses along the state’s highway corridors.',
    needs: [
      'Engineering and automotive units — floors that resist abrasion and impact from machining and handling',
      'Steel and heavy-industry buildings — thicker slabs to the structural design with hard-wearing finishes',
      'Food parks and warehouses — level, durable floors for racking, stacking and cleaning',
    ],
    mobilisation: 'Karnataka sites are served from our Hyderabad base; we plan crew travel around pour dates agreed with the client.',
  },
  maharashtra: {
    name: 'Maharashtra',
    industries:
      'Maharashtra has some of India’s largest flooring demand: the Bhiwandi warehousing belt near Mumbai, the automotive and engineering cluster around Pune and Chakan, manufacturing in Aurangabad (Chhatrapati Sambhajinagar) and Nashik, and logistics and manufacturing around Nagpur and MIHAN.',
    needs: [
      'Large warehouses and logistics parks — high-flatness VDF floors for racking, docks and heavy forklift traffic',
      'Automotive and engineering plants — abrasion-resistant floors with hardener for production and assembly areas',
      'Monsoon-season programmes — pours and protection planned around the heavy June–September rains',
    ],
    mobilisation: 'Maharashtra projects are mobilised from our Hyderabad base, so we lock pour dates and site readiness before travel.',
  },
  odisha: {
    name: 'Odisha',
    industries:
      'Odisha’s floors are driven by heavy industry: steel, aluminium and power plants around Angul, Jharsuguda and Kalinganagar, port-based industry and storage at Paradip and Dhamra, and manufacturing, warehousing and commercial building around Bhubaneswar and Cuttack.',
    needs: [
      'Steel, metals and power plant buildings — robust slabs to the structural design with hard-wearing finishes',
      'Port and bulk-storage sheds — large VDF floors laid for heavy stacking and vehicle movement',
      'Coastal and cyclone-season sites — curing and protection planned for humidity and heavy rain',
    ],
    mobilisation: 'Odisha sites are served from our Hyderabad base, with pour dates and site readiness confirmed before mobilisation.',
  },
};

function locationSections(area) {
  return [
    {
      heading: `VDF and Trimix flooring for ${area.name} industry`,
      paragraphs: [area.industries, 'The floor each of these buildings needs is different, so the system is chosen for the actual use:'],
      bullets: area.needs,
    },
    {
      heading: `Floor specifications we plan for in ${area.name}`,
      paragraphs: [
        'A VDF (Trimix) floor is only as good as its specification and the way it is executed. Before quoting we confirm:',
      ],
      bullets: [
        'Slab thickness, concrete grade and reinforcement, taken from the structural design for the racking, forklift and machine loads',
        'Surface finish — a power-trowelled VDF finish, with dry-shake floor hardener where abrasion is high',
        'Levels and flatness, checked during finishing, with tighter tolerances agreed for high-bay racking aisles',
        'Joint layout — saw-cut contraction joints at planned spacing, construction joints at bay edges, and filling or sealing once the slab has shrunk',
        'Curing method and period, agreed before the pour so the floor is not loaded too early',
      ],
      links: [
        { href: '/vdf-flooring-process', label: 'The VDF process step by step' },
        { href: '/floor-hardener-application', label: 'Floor hardener application' },
      ],
    },
    {
      heading: `How a ${area.name} flooring project runs`,
      paragraphs: [
        'Send the site location, approximate area, building type and any drawings or BOQ. We review them, visit or survey the site where needed, and send a written quotation with the scope, specification and programme.',
        `${area.mobilisation} On site, our team handles placing, vacuum dewatering, power floating and trowelling, joint cutting and curing as one sequence, and the floor is handed over after the agreed curing period.`,
      ],
      links: [
        { href: '/vdf-flooring-cost', label: 'What affects the rate' },
        { href: '/trimix-flooring', label: 'Trimix flooring explained' },
      ],
    },
  ];
}

function locationFaqs(area) {
  return [
    {
      question: `What is the VDF flooring rate per sq ft in ${area.name}?`,
      answer: `It depends on the floor area, slab thickness, concrete grade, reinforcement, hardener, joints, site access and mobilisation to ${area.name}. We do not publish a fixed rate because it would not match your site. Share the area and drawings and we will send a quotation.`,
    },
    {
      question: `Do you lay Trimix flooring in ${area.name}?`,
      answer: `Yes. Trimix is the common Indian name for VDF (vacuum dewatered) flooring, and we lay it for warehouses, factories and commercial buildings in ${area.name}.`,
    },
  ];
}

export const PAGE_COPY = {
  vdfFlooring: {
    path: '/vdf-flooring',
    title: 'VDF Flooring Contractors & Services (Trimix)',
    description:
      'ASVDF Flooring installs VDF (Trimix) flooring for warehouses, factories and industrial buildings across India. Request a quotation for vacuum dewatered floors.',
    h1: 'VDF Flooring Services',
    eyebrow: 'Vacuum dewatered flooring',
    intro:
      'VDF flooring — vacuum dewatered flooring, also widely called Trimix flooring in India — is a concrete floor system used where slabs need higher surface strength, better abrasion resistance, and a denser finish than ordinary concrete. ASVDF Flooring installs VDF floors for industrial, warehouse, and commercial buildings from the registered office in Shamshabad, Hyderabad, with project delivery all over India, including Hyderabad, Bengaluru, Chennai, Telangana, Andhra Pradesh, Karnataka, Maharashtra and Odisha.',
    sections: [
      {
        heading: 'What is VDF flooring?',
        paragraphs: [
          'VDF stands for vacuum dewatered flooring. After concrete is placed and levelled, vacuum mats extract surplus water from the slab surface. Lowering that water-cement ratio densifies the top layer, increases compressive strength, and leaves a tighter, more wear-resistant finish.',
          'In Indian industrial construction the same system is also described as vacuum densification flooring or vacuum dewatering flooring. The job is the same: a heavy-duty concrete floor that can take forklifts, racking, and plant traffic without an early dusty, weak surface.',
        ],
      },
      {
        heading: 'Where VDF flooring is used',
        paragraphs: [
          'VDF is specified on large, load-bearing slabs rather than as a decorative overlay. Typical applications include warehouses, manufacturing plants, logistics hubs, automobile units, food processing areas, and parking decks.',
        ],
        bullets: [
          'Warehouse and logistics floors with pallet-mover and forklift traffic',
          'Factory and plant floors where abrasion and point loads matter',
          'Commercial halls and back-of-house areas that need a durable concrete finish',
          'Infrastructure slabs such as loading bays and parking areas',
        ],
      },
      {
        heading: 'How we install VDF flooring',
        paragraphs: [
          'Work follows a site sequence rather than a coating recipe. The slab is poured and struck off, vacuum dewatering is applied with our vacuum unit, and the surface is power-trowelled to the specified finish. Joints, hardeners, and curing are planned around traffic, loads, and the construction programme.',
          'The programme depends on the floor area, site readiness, the concrete specification, weather and the curing time the specification calls for. We confirm timelines after reviewing your project details.',
        ],
        links: [
          { href: '/vdf-flooring-process', label: 'See the VDF flooring process' },
          { href: '/vacuum-densification-flooring', label: 'How vacuum densification works' },
        ],
      },
      {
        heading: 'Benefits and limits',
        paragraphs: [
          'A correctly executed VDF floor is denser and stronger at the wearing surface than a slab left with excess bleed water. That helps with dusting, abrasion, and everyday industrial use. It is still a concrete floor: chemical attack, steep hygiene specs, or a seamless coloured finish may need an additional system such as epoxy. We match the system to the site instead of treating VDF as the answer to every brief.',
        ],
        links: [
          { href: '/industrial-flooring', label: 'Industrial flooring options' },
          { href: '/vdf-flooring-cost', label: 'What affects VDF flooring cost' },
        ],
      },
      {
        heading: 'VDF flooring specifications',
        paragraphs: [
          'There is no single “standard” VDF floor. The specification is set for each building from its loads, traffic and use, and it should be fixed before the quotation so every contractor prices the same floor.',
        ],
        bullets: [
          'Slab thickness, concrete grade and reinforcement — from the structural design for racking legs, forklift wheels and machine bases',
          'Sub-base — compacted and levelled, often with a separation membrane, because a weak base cracks even a well-finished slab',
          'Bay layout — the pour is split into bays so each one can be dewatered and finished while the concrete is workable',
          'Finish — power-floated and trowelled, with a dry-shake hardener where abrasion is high',
          'Joints — contraction joints saw-cut at planned spacing, construction joints at bay edges, and filling or sealing later',
          'Curing — moist curing or curing compound for the full period before the floor is loaded',
        ],
      },
      {
        heading: 'Common VDF floor problems and how they are avoided',
        paragraphs: [
          'Most floor complaints trace back to execution rather than the concept. A careful VDF contractor plans against them from the start:',
        ],
        bullets: [
          'Dusting and a weak surface — avoided by thorough dewatering, correctly timed trowelling and full curing',
          'Random cracking — controlled with a sound sub-base, joints cut at the right time and spacing, and early curing',
          'Joint edge damage under forklifts — reduced with proper joint detailing and filling once the slab has shrunk',
          'Uneven or wavy floors — prevented by setting levels before the pour and checking them during screeding and finishing',
        ],
      },
      {
        heading: 'VDF compared with other floors',
        bullets: [
          'VDF vs ordinary trowelled concrete — VDF removes surplus water, so the surface is denser and more wear-resistant',
          'VDF vs epoxy — VDF is the concrete floor itself; epoxy is a coating added on top for chemicals, hygiene or colour',
          'VDF vs laser screed — laser screeding sets the levels on very large pours; it can be combined with vacuum dewatering and trowelling',
          'VDF vs tiles or stone — a monolithic VDF slab has no grout lines to break under forklifts and is far quicker to lay over large areas',
        ],
        links: [
          { href: '/epoxy-flooring', label: 'Epoxy flooring' },
          { href: '/laser-screed-flooring', label: 'Laser screed flooring' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is VDF flooring?',
        answer:
          'VDF (vacuum dewatered flooring) is a concrete flooring method that removes surplus water from the slab surface so the wearing layer is denser, stronger, and more durable. It is widely used for warehouses, factories, and other heavy-duty floors.',
      },
      {
        question: 'Is VDF the same as vacuum densification flooring?',
        answer:
          'In practice, yes for most industrial briefs in India. Vacuum densification describes what the vacuum step does: it densifies the concrete surface by extracting water. ASVDF installs this as VDF / vacuum dewatered flooring.',
      },
      {
        question: 'Is VDF flooring the same as Trimix flooring?',
        answer:
          'Yes. Trimix (sometimes spelt Tremix) is the name many builders in India use for vacuum dewatered flooring. The process is the same: place and level the concrete, extract surplus water with vacuum mats, then power-float and trowel the surface.',
      },
      {
        question: 'How do I request a VDF flooring quotation?',
        answer:
          `Share the site location, approximate area, building type, and any load or finish notes. Call or WhatsApp ${PHONE}, email ${EMAIL}, or use the contact form. We recommend a system and quotation from those details.`,
      },
      {
        question: 'How long does a VDF floor last?',
        answer:
          'A well-specified, properly cured VDF floor is a long-term structural floor. Its service life depends on the loads and traffic, the specification, joint maintenance and how early it was loaded, so maintenance of joints and timely repairs matter as much as the original installation.',
      },
    ],
    related: [
      { href: '/trimix-flooring', label: 'Trimix flooring explained' },
      { href: '/vdf-flooring-contractors', label: 'Working with a VDF flooring contractor' },
      { href: '/warehouse-flooring', label: 'Warehouse flooring' },
      { href: '/projects', label: 'Flooring projects' },
      { href: '/contact', label: 'Request a quotation' },
    ],
  },

  trimix: {
    path: '/trimix-flooring',
    title: 'Trimix Flooring Contractors in India',
    description:
      'Trimix flooring is vacuum dewatered (VDF) concrete flooring. ASVDF Flooring lays Trimix floors for warehouses, factories and commercial buildings across India.',
    h1: 'Trimix Flooring',
    eyebrow: 'Trimix / VDF flooring',
    intro:
      'Trimix flooring is the name many builders, architects and site engineers in India use for vacuum dewatered flooring (VDF). It is a concrete floor laid in one sequence — placed, levelled, vacuum dewatered, power-floated and trowelled — so the wearing surface ends up denser and harder than a conventionally finished slab. ASVDF Flooring lays Trimix floors from its registered office in Shamshabad, Hyderabad, with project delivery all over India.',
    sections: [
      {
        heading: 'Why it is called Trimix',
        paragraphs: [
          'The word comes from Tremix, a Swedish maker of vacuum dewatering equipment whose name became shorthand for the method on Indian sites. Over time “Tremix” and “Trimix” came to mean the whole floor system, whichever brand of vacuum pump and mats is used.',
          'So when a tender, BOQ or enquiry asks for Trimix flooring, VDF flooring, vacuum dewatered flooring or vacuum densification flooring, it is asking for the same kind of floor. The specification that matters is the concrete grade, slab thickness, finish, joints and curing, not the label.',
        ],
        links: [
          { href: '/vdf-flooring', label: 'VDF flooring services' },
          { href: '/vacuum-densification-flooring', label: 'How vacuum densification works' },
        ],
      },
      {
        heading: 'How a Trimix floor is laid',
        paragraphs: [
          'Every step depends on the one before it, so the crew, the vacuum unit and the finishing equipment have to be on site together for each pour.',
        ],
        bullets: [
          'Base and formwork — the compacted sub-base, any membrane and the bay shuttering are set to level, with reinforcement and dowels in place as designed',
          'Placing and levelling — concrete of the specified grade is placed bay by bay and compacted and struck off with a vibrating screed',
          'Vacuum dewatering — filter pads and suction mats go onto the fresh concrete and the vacuum pump draws out surplus water, lowering the water–cement ratio near the surface',
          'Power floating — once the slab can take the machine, a power float with a disc flattens the surface and closes the pores',
          'Hardener (if specified) — a dry-shake floor hardener is broadcast and worked in during floating for higher abrasion resistance',
          'Power trowelling — repeated passes with trowel blades produce the dense, smooth industrial finish',
          'Joints — contraction joints are saw-cut once the concrete can be cut cleanly, then sealed or filled later as specified',
          'Curing — the slab is kept moist or sealed with a curing compound for the full curing period before it takes traffic',
        ],
        links: [{ href: '/vdf-flooring-process', label: 'The VDF / Trimix process in detail' }],
      },
      {
        heading: 'What Trimix flooring gives you',
        paragraphs: [
          'Removing surplus water from the top of the slab is what makes the difference. The surface layer has less free water to leave voids behind, so it is stronger and less porous. In practice that means:',
        ],
        bullets: [
          'Higher surface strength and better abrasion resistance under forklifts, pallet trucks and trolleys',
          'Less dusting than a slab finished with bleed water still on the surface',
          'Lower drying shrinkage near the surface, which helps limit surface cracking',
          'A level, smooth finish that suits racking, material handling and easy cleaning',
          'Walkable sooner after finishing than a slab left to bleed and set on its own',
        ],
      },
      {
        heading: 'Where Trimix floors are used',
        paragraphs: [
          'Trimix is chosen for large, hard-working concrete floors rather than decorative finishes. Typical projects include warehouses and logistics parks, factory and plant floors, automobile workshops and showrooms, cold storage and food processing areas, commercial basements and parking decks, and loading bays.',
          'Where a floor also needs chemical resistance, strict hygiene or a coloured seamless finish, a Trimix slab is often the base for an epoxy or PU coating applied after curing.',
        ],
        links: [
          { href: '/warehouse-flooring', label: 'Warehouse flooring' },
          { href: '/industrial-flooring', label: 'Industrial flooring' },
          { href: '/epoxy-flooring', label: 'Epoxy over a Trimix slab' },
        ],
      },
      {
        heading: 'Getting a Trimix flooring quotation',
        paragraphs: [
          `Trimix flooring is priced per square foot or square metre, but the rate depends on area, slab thickness, concrete grade, reinforcement, hardener, joints, site access and location. Share the city, approximate area, building type and any drawings or BOQ. Call or WhatsApp ${PHONE}, email ${EMAIL}, or use the contact form, and we will come back with a recommendation and quotation for your site.`,
        ],
        links: [
          { href: '/vdf-flooring-cost', label: 'What affects the rate' },
          { href: '/contact', label: 'Request a Trimix flooring quotation' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is Trimix flooring?',
        answer:
          'Trimix flooring is vacuum dewatered (VDF) concrete flooring. After the concrete is placed and levelled, vacuum mats draw surplus water out of the surface, and the slab is then power-floated and trowelled to a dense, hard finish.',
      },
      {
        question: 'Is Trimix flooring the same as VDF flooring?',
        answer:
          'Yes. Trimix (or Tremix) is the common Indian name for vacuum dewatered flooring, so Trimix, VDF, vacuum dewatering and vacuum densification flooring all describe the same system.',
      },
      {
        question: 'Trimix or epoxy flooring — which is better?',
        answer:
          'They do different jobs. Trimix is the structural concrete floor itself, built for load and abrasion. Epoxy is a resin coating applied over a cured concrete floor for chemical resistance, hygiene or colour. Many plants use both: a Trimix slab with epoxy in selected areas.',
      },
      {
        question: 'How soon can a Trimix floor be used?',
        answer: `Light foot traffic is usually possible soon after finishing, but vehicles and racking should wait until the slab has been cured and gained strength. ${CURING_NOTE}`,
      },
      {
        question: 'Do you lay Trimix flooring outside Hyderabad?',
        answer: `Yes. Our registered office is in Shamshabad, Hyderabad, and we take Trimix and VDF flooring work all over India, including ${NAMED_AREAS_TEXT}.`,
      },
    ],
    related: [
      { href: '/vdf-flooring-contractors', label: 'VDF & Trimix flooring contractors' },
      { href: '/floor-hardener-application', label: 'Floor hardener application' },
      { href: '/groove-cutting-joint-filling', label: 'Groove cutting & joint filling' },
      { href: '/projects', label: 'Flooring projects' },
    ],
  },

  vacuumDensification: {
    path: '/vacuum-densification-flooring',
    title: 'Vacuum Densification (VDF) Flooring',
    description:
      'How vacuum densification and vacuum dewatering strengthen concrete floors. ASVDF Flooring explains the process used on VDF industrial slabs.',
    h1: 'Vacuum Densification Flooring',
    eyebrow: 'Process explained',
    intro:
      'Vacuum densification flooring is the technical name for what happens during VDF installation: a vacuum is applied to fresh concrete so surplus water leaves the slab and the surface becomes denser. ASVDF Flooring uses vacuum dewatering equipment as part of our VDF flooring work for industrial and warehouse slabs.',
    sections: [
      {
        heading: 'What vacuum densification means',
        paragraphs: [
          'Fresh concrete always contains more water than is needed for hydration. That extra water helps placement, but if it stays in the wearing surface it leaves a weaker, more porous top. Vacuum densification applies suction through mats on the slab so that free water is drawn out before finishing.',
          'The cement paste at the surface packs more tightly. Compressive strength and abrasion resistance of that layer go up. The slab is still concrete — the vacuum step is not a chemical hardener and not a resin coating.',
        ],
      },
      {
        heading: 'Vacuum densification vs vacuum dewatering',
        paragraphs: [
          'Teams in India use both phrases. Dewatering describes the water leaving the slab. Densification describes the result: a tighter surface matrix. On site they are the same vacuum step on a VDF floor. If a specification says vacuum densification, vacuum dewatering, or VDF, we treat it as this system unless the document clearly asks for something else.',
        ],
        links: [
          { href: '/vdf-flooring', label: 'VDF flooring services' },
          { href: '/vdf-flooring-process', label: 'On-site VDF process' },
        ],
      },
      {
        heading: 'Equipment used on site',
        paragraphs: [
          'A vacuum dewatering unit provides the suction. After dewatering, ride-on or walk-behind power trowels close and finish the surface. Levelling accuracy on larger slabs is helped by screed work before the vacuum mats go down. ASVDF maintains vacuum dewatering units, power trowels, and concrete screeds for this sequence.',
        ],
      },
      {
        heading: 'When the process is the right choice',
        paragraphs: [
          'Vacuum densification is most useful on large, trafficked concrete floors — warehouses, plants, and similar industrial slabs — where a stronger wearing surface is worth the extra step. It is less relevant for thin toppings, decorative residential floors, or rooms that will be fully coated for chemical resistance anyway. Those briefs are discussed as industrial or epoxy systems rather than forced into VDF.',
        ],
        links: [{ href: '/industrial-flooring', label: 'Industrial flooring services' }],
      },
    ],
    faqs: [
      {
        question: 'How does vacuum densification work?',
        answer:
          'After the concrete is placed and levelled, vacuum mats are laid on the surface and connected to a pump. Surplus water is extracted, the surface densifies, and the slab is then power-trowelled. Curing and joint cutting follow the project specification.',
      },
      {
        question: 'Does vacuum densification replace floor hardener?',
        answer:
          'No. Vacuum densification reduces surplus water in the surface. A dry-shake hardener, if specified, is a separate material applied during finishing for extra abrasion resistance. We use one or both depending on traffic and the specification.',
      },
    ],
    related: [
      { href: '/vdf-flooring', label: 'VDF flooring' },
      { href: '/vdf-flooring-process', label: 'Installation process' },
      { href: '/contact', label: 'Talk to ASVDF' },
    ],
  },

  industrial: {
    path: '/industrial-flooring',
    title: 'Industrial Flooring Contractors & Services',
    description:
      'Heavy-duty industrial flooring for plants, factories, and warehouses. ASVDF Flooring installs VDF, concrete, and related industrial floor systems.',
    h1: 'Industrial Flooring Services',
    eyebrow: 'Plants, factories, heavy-duty slabs',
    intro:
      'Industrial floors have to take point loads, wheeled traffic, and daily abrasion — not just look finished on handover. ASVDF Flooring builds heavy-duty floors for plants, warehouses, and factories, with VDF (vacuum dewatered) concrete as a core system and epoxy coatings where the brief needs chemical or abrasion protection.',
    sections: [
      {
        heading: 'What industrial flooring has to do',
        paragraphs: [
          'A factory or warehouse slab is a working surface. Forklifts, pallet trucks, racking feet, and process equipment all bear on the same concrete. Dusting, ruts, and early joint failure slow operations. The floor specification should follow loads, traffic type, flatness needs, and any chemical or hygiene requirements — not a generic “industrial finish”.',
        ],
      },
      {
        heading: 'Systems we install',
        paragraphs: [
          'VDF flooring is the usual base for large industrial slabs that need a dense, power-trowelled wearing surface. Laser screeding sets the level on large pours, and floor hardener adds wear resistance during finishing. Epoxy is used where a seamless, chemical-resistant layer is required over a prepared substrate, and PQC for external yards and roads.',
          `Our full service list: ${SERVICE_LIST_TEXT}.`,
        ],
        links: [
          { href: '/vdf-flooring', label: 'VDF flooring' },
          { href: '/warehouse-flooring', label: 'Warehouse flooring' },
          { href: '/concrete-flooring', label: 'Concrete flooring' },
          { href: '/services', label: 'All services' },
        ],
      },
      {
        heading: 'Industrial applications',
        bullets: [
          'Manufacturing plant floors',
          'Automobile and engineering units',
          'Food processing areas (where a concrete or coated system is specified)',
          'Warehousing and logistics buildings',
          'Loading bays and production aisles',
        ],
      },
      {
        heading: 'How a project is run',
        paragraphs: [
          'We plan around pour sequence, access, curing, and the client’s commissioning date. Machinery on site includes vacuum dewatering units, power trowels, and screeds. Quality control is treated as part of the pour, not a report written afterwards. ASVDF is based in Hyderabad and executes industrial flooring projects across major industrial hubs in India.',
        ],
        links: [{ href: '/projects', label: 'View flooring projects' }],
      },
    ],
    faqs: [
      {
        question: 'What type of projects require industrial flooring?',
        answer:
          'Plants, warehouses, factories, logistics buildings, and other spaces with heavy wheeled traffic or concentrated loads. If the floor is a production surface rather than an office finish, it should be specified as industrial flooring.',
      },
      {
        question: 'Do you only install VDF?',
        answer: `No. VDF is a core system, and our services are ${SERVICE_LIST_TEXT}. The recommendation follows the brief, not a single product.`,
      },
    ],
    related: [
      { href: '/vdf-flooring-contractors', label: 'Industrial flooring contractors' },
      { href: '/vdf-flooring-hyderabad', label: 'Industrial flooring in Hyderabad' },
      { href: '/contact', label: 'Request a quotation' },
    ],
  },

  warehouse: {
    path: '/warehouse-flooring',
    title: 'Warehouse Flooring Contractors & Solutions',
    description:
      'Warehouse flooring for logistics and storage buildings. ASVDF Flooring installs VDF and heavy-duty concrete floors for forklift and racking use.',
    h1: 'Warehouse Flooring Solutions',
    eyebrow: 'Logistics and storage slabs',
    intro:
      'Warehouse flooring has to stay flat and wear-resistant under forklifts, pallet movers, and racking. ASVDF Flooring installs VDF and heavy-duty concrete floors for logistics and storage buildings, including large-area slabs where vacuum dewatering is used to strengthen the wearing surface.',
    sections: [
      {
        heading: 'What warehouse floors need',
        paragraphs: [
          'Aisle traffic is repetitive. Narrow-aisle trucks and reach trucks punish joints and any soft surface layer. Racking transfers high point loads. Housekeeping teams want a floor that does not dust. Those needs point toward a dense concrete wearing surface, controlled joints, and a finish that matches the handling equipment — not a thin decorative topping.',
        ],
      },
      {
        heading: 'Why VDF is common in warehouses',
        paragraphs: [
          'Vacuum dewatered flooring is widely used on warehouse slabs because it densifies the surface after the pour. The result is better abrasion resistance for wheel traffic compared with a slab left with excess bleed water. Floor hardeners can be added where the specification asks for still higher wear resistance.',
        ],
        links: [
          { href: '/vdf-flooring', label: 'VDF flooring services' },
          { href: '/vacuum-densification-flooring', label: 'Vacuum densification explained' },
        ],
      },
      {
        heading: 'Planning a warehouse slab',
        paragraphs: [
          'Pour bays, joint layout, and curing windows should be agreed before concrete arrives. Access for vacuum equipment and trowels matters on tight programmes. We ask for area, racking layout if known, equipment type, and handover date so the system and sequence fit the building rather than the other way around.',
        ],
        links: [
          { href: '/blog/industrial-flooring-for-warehouses', label: 'Guide: choosing warehouse flooring' },
          { href: '/vdf-flooring-cost', label: 'Cost factors' },
        ],
      },
    ],
    faqs: [
      {
        question: 'Is VDF suitable for warehouse flooring?',
        answer:
          'Yes. VDF is a standard choice for warehouse and logistics slabs that need a dense, power-trowelled concrete surface for forklift traffic. The exact build-up still depends on loads, flatness needs, and any overlay the client specifies.',
      },
      {
        question: 'How long does warehouse flooring installation take?',
        answer: `It depends on area, pour sequence and site readiness, and curing must be included: ${CURING_NOTE} Larger logistics buildings are programmed in bays. We confirm the programme after reviewing the site.`,
      },
    ],
    related: [
      { href: '/industrial-flooring', label: 'Industrial flooring' },
      { href: '/projects', label: 'Warehouse and logistics projects' },
      { href: '/contact', label: 'Request a warehouse flooring quotation' },
    ],
  },

  concrete: {
    path: '/concrete-flooring',
    title: 'Concrete Flooring Contractors & Services',
    description:
      'Concrete flooring for industrial and commercial buildings, including VDF slabs. ASVDF Flooring delivers durable concrete floors from Hyderabad.',
    h1: 'Concrete Flooring Services',
    eyebrow: 'Industrial and commercial slabs',
    intro:
      'Concrete flooring is the base of most industrial and many commercial buildings. ASVDF Flooring installs concrete floors ranging from vacuum dewatered VDF slabs for heavy use to durable commercial floors for halls, parking, and back-of-house areas.',
    sections: [
      {
        heading: 'Concrete as a flooring system',
        paragraphs: [
          'A concrete floor is more than a structural slab that happens to be walked on. Mix, placement, dewatering, finishing, joints, and curing decide whether the surface lasts under traffic. We treat those steps as the flooring system, especially on large industrial pours.',
        ],
      },
      {
        heading: 'VDF and conventional concrete floors',
        paragraphs: [
          'VDF adds vacuum dewatering so the wearing surface is denser than a conventional trowelled slab. That extra step is justified where abrasion and strength at the surface matter. Commercial halls, showrooms, and some parking areas may use a well-finished concrete floor without vacuum dewatering when loads are lighter. We recommend the build-up from use, not from a single product name.',
        ],
        links: [
          { href: '/vdf-flooring', label: 'VDF flooring' },
          { href: '/industrial-flooring', label: 'Industrial flooring' },
        ],
      },
      {
        heading: 'Commercial concrete flooring',
        paragraphs: [
          'Commercial spaces still need floors that clean well and wear evenly. ASVDF installs durable concrete floors for commercial complexes, parking areas, and similar buildings. Where a seamless coated finish is required, epoxy is discussed as a separate layer on a prepared substrate.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between VDF and ordinary concrete flooring?',
        answer:
          'Both start with a concrete slab. VDF adds vacuum dewatering to remove surplus water from the surface before power trowelling, which densifies the wearing layer. Ordinary concrete floors skip that vacuum step and rely on finishing and curing alone.',
      },
      {
        question: 'Do you install polished concrete?',
        answer:
          'Yes, as floor grinding and polishing for warehouses, showrooms, offices and other commercial spaces: the slab is ground, densified and polished to the required sheen. Our focus is industrial and commercial performance flooring rather than decorative residential finishes.',
      },
    ],
    related: [
      { href: '/warehouse-flooring', label: 'Warehouse flooring' },
      { href: '/vdf-flooring-process', label: 'How we build the slab' },
      { href: '/contact', label: 'Request a quotation' },
    ],
  },

  process: {
    path: '/vdf-flooring-process',
    title: 'VDF Flooring Process: Step-by-Step Method',
    description:
      'How ASVDF Flooring installs VDF (Trimix) flooring: placement, vacuum dewatering, power trowel finishing, joints and curing on industrial slabs.',
    h1: 'VDF Flooring Process',
    eyebrow: 'From pour to handover',
    intro:
      'A VDF floor is built in sequence. Skipping a step — or rushing curing — shows up later as dusting, weak surface mortar, or joint problems. This is how ASVDF Flooring typically executes vacuum dewatered flooring on industrial and warehouse sites.',
    sections: [
      {
        heading: '1. Site and pour planning',
        paragraphs: [
          'Bay sizes, access, reinforcement, levels, and joint layout are agreed before concrete is ordered. The programme has to leave time for dewatering, trowelling, and curing, not only for the pump.',
        ],
      },
      {
        heading: '2. Placement and levelling',
        paragraphs: [
          'Concrete is placed and struck off to level. Screed work sets the flatness the vacuum mats will sit on. A slab that is out of level before dewatering will not be rescued by the vacuum step.',
        ],
      },
      {
        heading: '3. Vacuum dewatering',
        paragraphs: [
          'Filter pads and vacuum mats go onto the fresh surface and are connected to the vacuum dewatering unit. Surplus water is extracted so the top layer densifies. This is the vacuum densification step that defines VDF.',
        ],
        links: [{ href: '/vacuum-densification-flooring', label: 'Vacuum densification in detail' }],
      },
      {
        heading: '4. Power trowel finishing',
        paragraphs: [
          'After dewatering, power trowels close the surface to the specified finish — typically a dense, smooth industrial trowel finish suitable for warehousing or plant use. Floor hardener, if specified, is applied at the finishing stage.',
        ],
      },
      {
        heading: '5. Joints, curing, and handover',
        paragraphs: [
          `Saw-cut joints are timed to control cracking. Curing protects the slab while strength develops: ${CURING_NOTE} Handover follows the curing window agreed with the client so early traffic does not mark a green floor.`,
        ],
        links: [
          { href: '/vdf-flooring', label: 'VDF flooring services' },
          { href: '/vdf-flooring-cost', label: 'What this sequence means for cost' },
        ],
      },
      {
        heading: 'What the client prepares before flooring starts',
        bullets: [
          'A compacted, levelled sub-base, with any membrane in place',
          'Reinforcement, dowels and embedded items fixed as per drawings',
          'Confirmed concrete supply, pump access and pour timings',
          'Water and power on site for the vacuum pump and finishing equipment',
          'A covered or protected area for curing in hot or rainy weather',
        ],
      },
      {
        heading: 'Quality checks during a VDF pour',
        bullets: [
          'Concrete checked on arrival, with workability matched to placing and dewatering',
          'Levels and screed rails checked before and during placing',
          'Dewatering time judged against the slab thickness and the amount of water drawn out',
          'Floating and trowelling started at the right set, with the surface checked between passes',
          'Joints cut as soon as the concrete can be cut cleanly, and curing started immediately after finishing',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long does VDF flooring installation take?',
        answer: `Area, access, and pour sequence decide the programme, plus curing: ${CURING_NOTE} Large warehouses are split into bays. We confirm timelines after reviewing the site.`,
      },
      {
        question: 'Can operations continue during installation?',
        answer:
          'Pours need a clear, controlled area. Phased bays are sometimes possible in live warehouses. That has to be planned with the client; it is not assumed.',
      },
      {
        question: 'Is the Trimix process the same as the VDF process?',
        answer:
          'Yes. Trimix is the common Indian name for vacuum dewatered flooring, so the steps — placing, levelling, vacuum dewatering, floating, trowelling, joint cutting and curing — are the same.',
      },
    ],
    related: [
      { href: '/vdf-flooring-contractors', label: 'How ASVDF runs a flooring contract' },
      { href: '/contact', label: 'Discuss your site sequence' },
    ],
  },

  cost: {
    path: '/vdf-flooring-cost',
    title: 'VDF Flooring Cost & Rate per Sq Ft Factors',
    description:
      'What affects VDF (Trimix) flooring cost and rate per sq ft: area, thickness, access, finish, joints and programme. Request a site-specific quotation.',
    h1: 'VDF Flooring Cost Factors',
    eyebrow: 'Quotation inputs',
    intro:
      'VDF flooring is quoted from the site, not from a public rate list. Slab area is only one input. Thickness, access, finish, joints, hardeners, and programme all change labour, plant, and concrete. ASVDF Flooring prepares quotations from those details rather than advertising a single price per square foot.',
    sections: [
      {
        heading: 'What usually drives the quotation',
        bullets: [
          'Area and bay layout — larger floors can be more efficient per square foot, but need more plant time and joint planning',
          'Slab thickness and reinforcement — structural design is not the same on every building',
          'Site access — pumping distance, working hours, and whether bays can be closed',
          'Finish — standard power-trowel VDF versus additional hardener or a later coating',
          'Joints and detailing — saw cuts, filling, and edges around pits or machine bases',
          'Location and logistics — mobilisation from our Hyderabad base to the project site',
          'Programme — night pours, phased live-site work, and compressed curing windows',
        ],
      },
      {
        heading: 'What we need for a quotation',
        paragraphs: [
          `Send the city, approximate area in square feet, building type (warehouse, plant, commercial), and any drawing or load note you already have. Photos of the site help. Call or WhatsApp ${PHONE} or use the contact form. We do not publish a generic VDF flooring cost because a number without those inputs would be misleading.`,
        ],
        links: [{ href: '/contact', label: 'Request a VDF flooring quotation' }],
      },
      {
        heading: 'Cost versus the wrong system',
        paragraphs: [
          'The cheapest slab is not always the lowest cost in use. A floor that dusts or ruts under forklifts is expensive to live with. Matching VDF, a conventional concrete finish, or epoxy to the actual traffic is part of keeping lifetime cost down. We will say when VDF is not the right spend.',
        ],
        links: [
          { href: '/vdf-flooring', label: 'VDF flooring services' },
          { href: '/industrial-flooring', label: 'Other industrial systems' },
        ],
      },
      {
        heading: 'Why VDF rates differ between quotations',
        paragraphs: [
          'Two rates per square foot for “VDF flooring” can describe very different floors. Before comparing numbers, check that each quotation includes the same items:',
        ],
        bullets: [
          'Whether concrete supply is included, or only labour and equipment for placing and finishing',
          'Slab thickness and concrete grade assumed in the rate',
          'Hardener — included or not, and at what application rate',
          'Joint cutting, joint filling and edge detailing',
          'Curing materials and supervision',
          'Mobilisation, travel and accommodation for sites away from the contractor’s base',
        ],
      },
      {
        heading: 'Ways to control cost without weakening the floor',
        bullets: [
          'Fix the specification early so changes do not come mid-pour',
          'Have the sub-base, levels and access ready before the flooring crew mobilises',
          'Plan large, continuous pour days rather than many small ones',
          'Use hardener and coatings only where the traffic or process actually needs them',
        ],
      },
    ],
    faqs: [
      {
        question: 'What factors affect VDF flooring cost?',
        answer:
          'Area, thickness, reinforcement, access, specified finish, hardener, joints, site location, and programme. Concrete and plant time follow those choices.',
      },
      {
        question: 'Do you share a rate per square foot online?',
        answer:
          'No. A public rate would ignore thickness, access, and finish. We quote from project details so the number matches the work.',
      },
      {
        question: 'Is VDF flooring cheaper than epoxy flooring?',
        answer:
          'They are not direct alternatives. VDF is the concrete floor itself, while epoxy is a coating applied over a cured concrete floor. A project usually needs the slab either way; epoxy is an additional cost added only where chemical resistance, hygiene or colour are required.',
      },
    ],
    related: [
      { href: '/vdf-flooring-contractors', label: 'How contracting and quoting work' },
      { href: '/vdf-flooring-hyderabad', label: 'Projects from our Hyderabad office' },
    ],
  },

  contractors: {
    path: '/vdf-flooring-contractors',
    title: 'VDF & Trimix Flooring Contractors in India',
    description:
      'ASVDF Flooring is a VDF and Trimix flooring contractor based in Hyderabad, working all over India: site survey, quotation, installation and handover.',
    h1: 'VDF Flooring Contractors in India',
    eyebrow: 'How we take on a flooring contract',
    intro:
      'Choosing a VDF (Trimix) flooring contractor is about who can pour, dewater, finish, and hand over a slab that still performs after traffic starts. ASVDF Flooring is a VDF and industrial flooring contractor based in Hyderabad, executing projects across major industrial hubs in India.',
    sections: [
      {
        heading: 'What a VDF contractor should own on site',
        paragraphs: [
          'VDF is not a coating crew’s job. The contractor needs to control concrete placement, vacuum dewatering, power trowelling, joints, and curing as one sequence. Ask who supplies the vacuum unit, how joints are laid out, and how curing is protected — not only for a square-foot rate.',
        ],
        links: [{ href: '/vdf-flooring-process', label: 'Our installation process' }],
      },
      {
        heading: 'How ASVDF works',
        paragraphs: [
          'We start from site details and, where needed, a visit. The recommendation covers VDF, industrial concrete, or epoxy according to use. Quotation follows area, access, and specification. On site we use vacuum dewatering units, power trowels, and screeds, with supervision aimed at a floor that meets the brief rather than a rushed trowel finish.',
        ],
      },
      {
        heading: 'Near you, from Hyderabad',
        paragraphs: [
          'Searches for “VDF flooring contractors near me” should still resolve to a real office and a real phone number. The registered office of ASVDF FLOORING PRIVATE LIMITED is in Shamshabad, Ranga Reddy, Telangana (Hyderabad). We take industrial and warehouse flooring work all over India, including Hyderabad, Bengaluru, Chennai, Telangana, Andhra Pradesh, Karnataka, Maharashtra and Odisha. We do not list branch offices we do not have.',
        ],
        links: [
          { href: '/vdf-flooring-hyderabad', label: 'VDF flooring in Hyderabad' },
          { href: '/vdf-flooring-bangalore', label: 'VDF flooring in Bengaluru' },
          { href: '/vdf-flooring-chennai', label: 'VDF flooring in Chennai' },
          { href: '/contact', label: 'Contact ASVDF Flooring' },
        ],
      },
      {
        heading: 'Questions to ask any VDF flooring contractor',
        paragraphs: ['Whether you are comparing contractors, vendors or service providers, these questions separate a real VDF crew from a reseller:'],
        bullets: [
          'Do you own and operate the vacuum dewatering pump, mats, power floats and trowels, or subcontract the work?',
          'Who supervises on site, and how many bays can you finish in a day with the crew you are sending?',
          'How do you set levels, and how do you check flatness during finishing?',
          'When and how will joints be cut, and when are they filled?',
          'How will the slab be cured, for how long, and who maintains it?',
          'Can you show floors you have laid that are already in use?',
        ],
      },
      {
        heading: 'What our scope covers',
        paragraphs: [
          'The written quotation sets the exact scope for each project. A typical VDF contract from ASVDF covers placing and levelling the concrete, vacuum dewatering, power floating and trowelling, hardener application where specified, saw-cutting of joints and supervision of curing. Related work such as laser screeding, joint filling, epoxy coating, floor grinding and polishing, and bar bending can be added to the same contract so one team is responsible for the floor.',
        ],
        links: [
          { href: '/services', label: 'All flooring services' },
          { href: '/trimix-flooring', label: 'Trimix flooring' },
        ],
      },
    ],
    faqs: [
      {
        question: 'How do I choose a VDF flooring contractor?',
        answer:
          'Check that they install vacuum dewatered slabs themselves, can explain process and joints, will quote from your drawings or area, and can be reached at a real office. Photographs of similar industrial floors help. Avoid contractors who only sell a coating as “VDF”.',
      },
      {
        question: 'Are VDF flooring contractors and Trimix flooring contractors the same?',
        answer:
          'Yes. Trimix is a common Indian name for vacuum dewatered (VDF) flooring, so contractors, vendors and service providers use both terms for the same work. ASVDF Flooring installs it end to end with its own vacuum dewatering units, power floats and trowels.',
      },
      {
        question: 'Does ASVDF work only in Hyderabad?',
        answer:
          'The registered office is in Shamshabad, Hyderabad (Ranga Reddy, Telangana). We install VDF and industrial floors all over India, including Hyderabad, Bengaluru, Chennai, Telangana, Andhra Pradesh, Karnataka, Maharashtra and Odisha.',
      },
      {
        question: 'What information should I send to VDF flooring contractors for a quotation?',
        answer:
          'Site location, approximate floor area, building type and use, slab thickness and concrete grade if designed, any drawings or BOQ, the expected start date and site access. With the same information sent to every contractor, quotations can be compared fairly.',
      },
    ],
    related: [
      { href: '/vdf-flooring', label: 'VDF flooring services' },
      { href: '/industrial-flooring', label: 'Industrial flooring contractors' },
      { href: '/projects', label: 'Completed flooring work' },
    ],
  },

  hyderabad: {
    path: '/vdf-flooring-hyderabad',
    title: 'VDF Flooring Contractors in Hyderabad',
    description:
      'VDF flooring contractor in Hyderabad. ASVDF FLOORING PRIVATE LIMITED installs vacuum dewatered industrial and warehouse floors from Shamshabad, Ranga Reddy, Telangana.',
    h1: 'VDF Flooring Contractors in Hyderabad',
    eyebrow: 'Registered office: Shamshabad, Ranga Reddy',
    intro: `ASVDF FLOORING PRIVATE LIMITED is based in Shamshabad, on the Hyderabad side of Ranga Reddy district, and installs VDF flooring, industrial floors, and commercial concrete floors for sites across the city and the rest of Telangana. If you need a VDF flooring contractor in Hyderabad, call ${PHONE}.`,
    sections: [
      {
        heading: 'Office in Shamshabad',
        paragraphs: [
          `The registered office is at ${COMPANY.address}. That is the address for drawings, quotations, and site discussions. GSTIN ${GSTIN}.`,
        ],
      },
      {
        heading: 'Industrial and warehousing areas around Hyderabad',
        paragraphs: [
          'Hyderabad’s industrial and logistics building is spread around the Outer Ring Road. Warehousing has grown along the airport and Bengaluru highway corridor at Shamshabad, Kothur and Shadnagar, and to the north around Medchal. Older manufacturing estates such as Jeedimetla, Patancheru and Pashamylaram, and the pharma and life-sciences cluster at Genome Valley, add plant floors, labs and stores that need durable, cleanable slabs.',
          'We install vacuum dewatered VDF slabs and related industrial systems for plants, warehouses, and commercial buildings in and around the city, wherever we are asked to visit.',
        ],
      },
      {
        heading: 'Site conditions in Hyderabad',
        paragraphs: [
          `Summer temperatures in Hyderabad regularly pass 40°C in April and May, which speeds up setting and evaporation. Pours are planned for cooler hours with curing started promptly and kept up for the full period. ${CURING_NOTE} The southwest monsoon from June to September affects external slabs and open sites, so pour dates and protection are agreed in advance.`,
        ],
      },
      {
        heading: 'Services from this office',
        bullets: SERVICE_TITLES,
        links: [
          { href: '/vdf-flooring', label: 'VDF flooring' },
          { href: '/vdf-flooring-telangana', label: 'VDF flooring in Telangana' },
          { href: '/services', label: 'All services' },
        ],
      },
      {
        heading: 'Visit, call, or send drawings',
        paragraphs: [
          `Email ${EMAIL}. WhatsApp and phone: ${PHONE}. Working hours: ${COMPANY.workingHours}. Share area, Hyderabad location, and building type for a quotation.`,
        ],
        links: [{ href: '/contact', label: 'Contact the Shamshabad office' }],
      },
      ...locationSections(LOCATION_DEPTH.hyderabad),
    ],
    faqs: [
      {
        question: 'Do you install VDF flooring in Hyderabad?',
        answer:
          'Yes. The registered office is in Shamshabad, Ranga Reddy, Telangana. We install VDF and industrial flooring for Hyderabad sites and for projects all over India, including Bengaluru, Chennai, Telangana, Andhra Pradesh, Karnataka, Maharashtra and Odisha.',
      },
      {
        question: 'How do I get a quotation for a Hyderabad site?',
        answer: `Call or WhatsApp ${PHONE}, email ${EMAIL}, or use the website contact form with area and site location.`,
      },
      ...locationFaqs(LOCATION_DEPTH.hyderabad),
    ],
    related: [
      { href: '/vdf-flooring-bangalore', label: 'VDF flooring in Bengaluru' },
      { href: '/vdf-flooring-chennai', label: 'VDF flooring in Chennai' },
      { href: '/contact', label: 'Contact' },
    ],
  },

  bangalore: {
    path: '/vdf-flooring-bangalore',
    title: 'VDF Flooring Contractors in Bangalore',
    description:
      'VDF flooring contractor for Bangalore / Bengaluru. ASVDF Flooring installs warehouse and industrial vacuum dewatered floors in Karnataka from our Shamshabad office.',
    h1: 'VDF Flooring Contractors in Bangalore',
    eyebrow: 'Bengaluru and Karnataka sites',
    intro:
      'ASVDF Flooring takes VDF, warehouse, and industrial flooring work in Bangalore (Bengaluru) and the rest of Karnataka. We do not claim a Bangalore branch office. Crews and plant are mobilised from the registered office in Shamshabad, Hyderabad.',
    sections: [
      {
        heading: 'Warehouse and plant floors in Bengaluru',
        paragraphs: [
          'Bengaluru’s logistics parks, factories, and commercial buildings need dense, trafficked concrete — not only a decorative finish. Vacuum dewatered (VDF) slabs are a common specification for those warehouses and plants. We quote from area, access, and drawings, then programme pours around your handover date.',
        ],
      },
      {
        heading: 'Industrial and warehousing areas in and around Bengaluru',
        paragraphs: [
          'Manufacturing is concentrated in KIADB and older industrial estates such as Peenya, Bommasandra, Jigani and Electronic City, with large plants further out towards Hosur Road and Bidadi. Warehousing has grown along the highways out of the city, notably at Hoskote on the Old Madras Road side and at Nelamangala and Dobbaspet on the Tumakuru road. Those buildings are typical VDF briefs: large slabs, racking and forklift traffic.',
        ],
      },
      {
        heading: 'Site conditions in Bengaluru',
        paragraphs: [
          'At around 900 m above sea level, Bengaluru is milder than most of south India, which helps concreting for much of the year. It receives rain from both the southwest and northeast monsoons, with September and October usually the wettest months, so open sites and external slabs need pour dates and protection agreed in advance.',
        ],
      },
      {
        heading: 'How a Karnataka site is run',
        paragraphs: [
          'After you send location and approximate square footage, we confirm whether we can staff and plant the job. Installation still follows the same VDF sequence: placement, vacuum dewatering, power trowel, joints, and curing. Travel and logistics from Telangana are part of the quotation, not a hidden extra sprung on site.',
        ],
        links: [
          { href: '/vdf-flooring-karnataka', label: 'VDF flooring across Karnataka' },
          { href: '/vdf-flooring-process', label: 'Installation process' },
        ],
      },
      ...locationSections(LOCATION_DEPTH.bangalore),
    ],
    faqs: [
      {
        question: 'Do you have an office in Bangalore?',
        answer:
          'No. The registered office is in Shamshabad, Telangana. Bangalore and other Karnataka sites are project locations we travel to, not a second listed office.',
      },
      {
        question: 'Can you quote a Bengaluru warehouse floor?',
        answer: `Yes. Send the area of the city, approximate sq.ft, and building type to ${PHONE} or ${EMAIL}.`,
      },
      ...locationFaqs(LOCATION_DEPTH.bangalore),
    ],
    related: [
      { href: '/warehouse-flooring', label: 'Warehouse flooring' },
      { href: '/vdf-flooring-hyderabad', label: 'Hyderabad office' },
      { href: '/contact', label: 'Request a quotation' },
    ],
  },

  chennai: {
    path: '/vdf-flooring-chennai',
    title: 'VDF Flooring Contractors in Chennai',
    description:
      'VDF flooring contractor for Chennai. ASVDF Flooring installs industrial and warehouse vacuum dewatered floors in Chennai from our Telangana office.',
    h1: 'VDF Flooring Contractors in Chennai',
    eyebrow: 'Chennai project delivery',
    intro:
      'ASVDF Flooring installs VDF and industrial concrete floors for Chennai plants, warehouses, and commercial buildings. The registered office remains in Shamshabad, Telangana. Chennai is a service city, not a claimed second headquarters.',
    sections: [
      {
        heading: 'Industrial floors for Chennai sites',
        paragraphs: [
          'Chennai’s manufacturing and logistics buildings typically need abrasion-resistant slabs for forklifts and racking. VDF (vacuum dewatered flooring) is the system we install for that brief, with epoxy only where the specification needs a coated surface.',
        ],
      },
      {
        heading: 'Industrial and warehousing areas around Chennai',
        paragraphs: [
          'The automobile and electronics belt west of the city runs through SIPCOT parks at Sriperumbudur, Irungattukottai and Oragadam, with Mahindra World City near Chengalpattu to the south-west and Gummidipoondi to the north. Older estates such as Ambattur and Guindy hold smaller plants and stores. Warehousing follows the Chennai–Bengaluru highway and the routes to Chennai and Ennore ports.',
        ],
      },
      {
        heading: 'Site conditions in Chennai',
        paragraphs: [
          'Chennai is hot and humid for most of the year, and unlike most of India it gets most of its rain from the northeast monsoon between October and December, when Bay of Bengal cyclones also occur. Pours and curing are planned around that season. IS 456 treats concrete exposed to a coastal environment as severe exposure, which matters for external slabs, yards and pavements near the coast.',
        ],
      },
      {
        heading: 'Quotation and mobilisation',
        paragraphs: [
          'Share the Chennai location, area, and any drawing. We confirm programme, plant, and supervision from the Shamshabad office. Cost includes the work on slab plus the logistics of delivering that crew — we would rather say that in the quote than pretend a local shopfront exists.',
        ],
        links: [
          { href: '/vdf-flooring', label: 'VDF flooring services' },
          { href: '/vdf-flooring-cost', label: 'What affects cost' },
        ],
      },
      ...locationSections(LOCATION_DEPTH.chennai),
    ],
    faqs: [
      {
        question: 'Do you install VDF flooring in Chennai?',
        answer:
          'Yes, as a project location. The company office is in Shamshabad, Ranga Reddy, Telangana.',
      },
      ...locationFaqs(LOCATION_DEPTH.chennai),
    ],
    related: [
      { href: '/industrial-flooring', label: 'Industrial flooring' },
      { href: '/contact', label: 'Request a quotation' },
    ],
  },

  telangana: {
    path: '/vdf-flooring-telangana',
    title: 'VDF Flooring Contractors in Telangana',
    description:
      'VDF flooring across Telangana from ASVDF FLOORING PRIVATE LIMITED, Shamshabad, Ranga Reddy. Industrial and warehouse vacuum dewatered floors statewide.',
    h1: 'VDF Flooring Contractors in Telangana',
    eyebrow: 'Statewide from Shamshabad',
    intro:
      'ASVDF FLOORING PRIVATE LIMITED is registered in Telangana. We install VDF and industrial flooring across the state — Hyderabad and Shamshabad included — from the office near ORR Toll Plaza, Airport Residency Phase II.',
    sections: [
      {
        heading: 'A Telangana contractor, not a visiting brand only',
        paragraphs: [
          `GSTIN ${GSTIN} is a Telangana GST registration. The office address is in Shamshabad, Ranga Reddy district. That is the base for quotations, plant, and crews for industrial floors elsewhere in the state as well as in Hyderabad.`,
        ],
      },
      {
        heading: 'Where in Telangana',
        paragraphs: [
          'We take plant, warehouse, and commercial slab work anywhere in Telangana we can reach with supervision and vacuum dewatering equipment. Send the town or industrial park name with approximate area. We will say clearly if a site is not practical for the current programme.',
          'Most industrial building in the state is around Hyderabad: TGIIC industrial parks and estates such as Patancheru, Pashamylaram, Jeedimetla and Medchal, the Genome Valley life-sciences cluster, and warehousing at Shamshabad, Kothur and Shadnagar. Beyond the capital region, Warangal, Karimnagar, Nalgonda and the Ramagundam industrial area have their own plants, mills and storage buildings.',
        ],
        links: [
          { href: '/vdf-flooring-hyderabad', label: 'Hyderabad / Shamshabad office' },
          { href: '/vdf-flooring-andhra-pradesh', label: 'Andhra Pradesh' },
        ],
      },
      {
        heading: 'Site conditions in Telangana',
        paragraphs: [
          `Telangana summers are hot and dry, with April and May temperatures often above 40°C and higher still in the north of the state. That calls for hot-weather concreting practice: cooler pour times, prompt curing, and curing kept up for the full period. ${CURING_NOTE} Most rain falls during the southwest monsoon from June to September.`,
        ],
      },
      ...locationSections(LOCATION_DEPTH.telangana),
    ],
    faqs: [
      {
        question: 'Is ASVDF a Telangana company?',
        answer: `Yes. ASVDF FLOORING PRIVATE LIMITED is registered with GSTIN ${GSTIN} (Telangana) and the office is in Shamshabad, Ranga Reddy.`,
      },
      ...locationFaqs(LOCATION_DEPTH.telangana),
    ],
    related: [
      { href: '/vdf-flooring', label: 'VDF flooring' },
      { href: '/contact', label: 'Contact' },
    ],
  },

  andhraPradesh: {
    path: '/vdf-flooring-andhra-pradesh',
    title: 'VDF Flooring Contractors in Andhra Pradesh',
    description:
      'VDF flooring contractor for Andhra Pradesh. ASVDF Flooring installs industrial and warehouse floors across AP from the Shamshabad, Telangana office.',
    h1: 'VDF Flooring Contractors in Andhra Pradesh',
    eyebrow: 'Andhra Pradesh project delivery',
    intro:
      'ASVDF Flooring takes VDF, warehouse, and industrial flooring work across Andhra Pradesh. There is no claimed Andhra branch office. Jobs are planned and resourced from Shamshabad, Ranga Reddy, Telangana — next door to AP, which is why statewide Andhra work is a normal part of our coverage.',
    sections: [
      {
        heading: 'Industrial slabs in AP',
        paragraphs: [
          'Manufacturing units, logistics buildings, and commercial slabs in Andhra Pradesh are quoted the same way as Telangana sites: area, access, finish, and programme. Vacuum dewatering, power trowelling, and joint cutting stay on our crew — we do not rebrand a local coating contractor as VDF.',
        ],
        links: [
          { href: '/vdf-flooring-process', label: 'How we install VDF' },
          { href: '/vdf-flooring-telangana', label: 'Telangana office' },
        ],
      },
      {
        heading: 'Industrial and warehousing areas in Andhra Pradesh',
        paragraphs: [
          'Industrial building in Andhra Pradesh is spread along the coast and the main highways: Sri City on the Tamil Nadu border, Visakhapatnam with its port, steel and pharma units at Parawada and the Atchutapuram SEZ, Kakinada, Krishnapatnam port near Nellore, and the Vijayawada region. Inland, the Anantapur area has grown with automobile manufacturing. Plants, port warehouses and logistics parks in these areas are typical heavy-duty flooring briefs.',
        ],
      },
      {
        heading: 'Site conditions in Andhra Pradesh',
        paragraphs: [
          `Andhra Pradesh has a long Bay of Bengal coastline, and cyclones can reach it before the southwest monsoon (April–May) and after it (October–December). Coastal sites call for durable, well-covered concrete: IS 456 classifies a coastal environment as severe exposure. Summers inland and on the coastal plains are very hot, so pours are timed for cooler hours and curing is kept up for the full period. ${CURING_NOTE}`,
        ],
      },
      ...locationSections(LOCATION_DEPTH.andhraPradesh),
    ],
    faqs: [
      {
        question: 'Do you work across Andhra Pradesh?',
        answer:
          'Yes. Send the town or industrial area, approximate sq.ft, and building type. The registered office is in Shamshabad, Telangana.',
      },
      ...locationFaqs(LOCATION_DEPTH.andhraPradesh),
    ],
    related: [
      { href: '/industrial-flooring', label: 'Industrial flooring' },
      { href: '/contact', label: 'Request a quotation' },
    ],
  },

  karnataka: {
    path: '/vdf-flooring-karnataka',
    title: 'VDF Flooring Contractors in Karnataka',
    description:
      'VDF flooring across Karnataka, including Bangalore. ASVDF Flooring installs vacuum dewatered industrial floors from our Telangana office.',
    h1: 'VDF Flooring Contractors in Karnataka',
    eyebrow: 'Statewide Karnataka coverage',
    intro:
      'ASVDF Flooring installs VDF and industrial flooring across Karnataka, including Bengaluru and other industrial towns. Coverage is project-based from Shamshabad, not a chain of Karnataka offices.',
    sections: [
      {
        heading: 'Bengaluru and the rest of the state',
        paragraphs: [
          'Bengaluru has its own page because it is a named city we serve. The rest of Karnataka — other manufacturing and warehouse locations — is quoted the same way: send the place, area, and use. If we can plant and supervise the pour, we take the job.',
          'Outside Bengaluru, KIADB industrial areas and manufacturing towns include Tumakuru, Mysuru, Hubballi–Dharwad, Belagavi, Kolar and Ballari, with Mangaluru on the coast handling port-linked industry and storage.',
        ],
        links: [{ href: '/vdf-flooring-bangalore', label: 'VDF flooring in Bangalore' }],
      },
      {
        heading: 'What you should expect',
        paragraphs: [
          'A Karnataka quotation includes mobilisation from Telangana. The slab process does not change: vacuum dewatering, finishing, joints, curing. Ask us for recent site photographs when you enquire.',
        ],
      },
      {
        heading: 'Site conditions across Karnataka',
        paragraphs: [
          'Conditions vary across the state. The coastal belt around Mangaluru gets very heavy southwest monsoon rain from June to September, and IS 456 treats a coastal environment as severe exposure for concrete. North Karnataka, around Ballari and Kalaburagi, is hot and dry in summer and needs hot-weather concreting care. The southern plateau around Bengaluru and Mysuru is milder.',
        ],
      },
      ...locationSections(LOCATION_DEPTH.karnataka),
    ],
    faqs: [
      {
        question: 'Do you cover the whole of Karnataka?',
        answer:
          'Yes, as a service area. Confirm the town with us. The office address is Shamshabad, Telangana.',
      },
      ...locationFaqs(LOCATION_DEPTH.karnataka),
    ],
    related: [
      { href: '/warehouse-flooring', label: 'Warehouse flooring' },
      { href: '/contact', label: 'Contact' },
    ],
  },

  maharashtra: {
    path: '/vdf-flooring-maharashtra',
    title: 'VDF Flooring Contractors in Maharashtra',
    description:
      'VDF flooring contractor for Maharashtra. ASVDF Flooring installs industrial and warehouse vacuum dewatered floors statewide from Shamshabad, Telangana.',
    h1: 'VDF Flooring Contractors in Maharashtra',
    eyebrow: 'Maharashtra project delivery',
    intro:
      'ASVDF Flooring takes industrial VDF flooring work across Maharashtra. We do not list a Maharashtra office. Each site is a mobilisation from the registered address in Shamshabad, Ranga Reddy, Telangana.',
    sections: [
      {
        heading: 'Heavy-duty floors, travelling crew',
        paragraphs: [
          'Maharashtra plants, warehouses, and commercial slabs are assessed on access, area, and programme like any other out-of-state job. If vacuum dewatering plant and supervision can be on that site for the pour window, we quote. If they cannot, we will say no rather than invent a local franchise.',
        ],
        links: [
          { href: '/vdf-flooring-contractors', label: 'How we contract' },
          { href: '/contact', label: 'Send site details' },
        ],
      },
      {
        heading: 'Industrial and warehousing areas in Maharashtra',
        paragraphs: [
          'Maharashtra’s MIDC industrial areas cover most of the state. Around Pune, the automobile and engineering belt runs through Chakan, Talegaon, Ranjangaon and Pimpri-Chinchwad. Bhiwandi, north-east of Mumbai, is one of the country’s largest warehousing hubs, and Taloja and the area around JNPA (Nhava Sheva) port serve Navi Mumbai. Further east are Chhatrapati Sambhajinagar (Waluj, Shendra and AURIC), Nashik (Satpur, Ambad and Sinnar) and Nagpur, with MIHAN and Butibori.',
        ],
      },
      {
        heading: 'Site conditions in Maharashtra',
        paragraphs: [
          `The southwest monsoon from June to September is the main constraint: Mumbai and the Konkan coast get very heavy rain, so external slabs and open sites are best programmed outside those months or properly protected. Vidarbha, around Nagpur, has some of India’s hottest summers, with May temperatures often above 45°C, which calls for hot-weather concreting and careful curing. ${CURING_NOTE}`,
        ],
      },
      ...locationSections(LOCATION_DEPTH.maharashtra),
    ],
    faqs: [
      {
        question: 'Do you work in Maharashtra?',
        answer:
          'Yes. Maharashtra is a listed service state. The company office is in Shamshabad, Telangana.',
      },
      ...locationFaqs(LOCATION_DEPTH.maharashtra),
    ],
    related: [
      { href: '/industrial-flooring', label: 'Industrial flooring' },
      { href: '/vdf-flooring-hyderabad', label: 'Office' },
    ],
  },

  odisha: {
    path: '/vdf-flooring-odisha',
    title: 'VDF Flooring Contractors in Odisha',
    description:
      'VDF flooring contractor for Odisha. ASVDF Flooring installs warehouse and industrial vacuum dewatered floors in Odisha from our Telangana office.',
    h1: 'VDF Flooring Contractors in Odisha',
    eyebrow: 'Odisha project delivery',
    intro:
      'ASVDF Flooring installs VDF and industrial concrete floors for Odisha plants, warehouses, and commercial buildings. Odisha is a service state. The registered office is in Shamshabad, Telangana — we do not advertise an Odisha branch.',
    sections: [
      {
        heading: 'Quoting an Odisha floor',
        paragraphs: [
          'Send the town or industrial estate, approximate area, and building type. The quotation will include mobilisation and the same vacuum dewatering sequence we use in Telangana. If the site or programme cannot be staffed properly, we will say so before you award the work.',
        ],
        links: [
          { href: '/vdf-flooring', label: 'VDF flooring services' },
          { href: '/contact', label: 'Request a quotation' },
        ],
      },
      {
        heading: 'Industrial and warehousing areas in Odisha',
        paragraphs: [
          'Odisha’s heavy industry is built around minerals, metals and power: Kalinganagar near Jajpur, Angul, Jharsuguda, Rourkela and Sambalpur in the west, and the Paradip port area with its refinery and port-linked storage. Bhubaneswar and Khordha have growing IDCO industrial estates, warehousing and commercial buildings. Steel and aluminium plants, ancillary units and warehouses all need heavy-duty floors.',
        ],
      },
      {
        heading: 'Site conditions in Odisha',
        paragraphs: [
          'Coastal Odisha is among the most cyclone-prone parts of India’s east coast, with storms most common in October–November and also before the monsoon in April–May. Most rain falls in the southwest monsoon from June to September. Western Odisha, around Jharsuguda and Sambalpur, has very hot summers. Coastal and port sites need concrete detailed for severe exposure under IS 456, and pour dates should allow for the cyclone and monsoon seasons.',
        ],
      },
      ...locationSections(LOCATION_DEPTH.odisha),
    ],
    faqs: [
      {
        question: 'Do you take flooring work in Odisha?',
        answer: `Yes. Odisha is one of the states we serve. Call ${PHONE} or email ${EMAIL} with location and area.`,
      },
      ...locationFaqs(LOCATION_DEPTH.odisha),
    ],
    related: [
      { href: '/warehouse-flooring', label: 'Warehouse flooring' },
      { href: '/vdf-flooring-hyderabad', label: 'Hyderabad office' },
    ],
  },

  india: {
    path: ALL_INDIA_AREA.path,
    title: 'VDF Flooring Contractors Across India',
    description:
      'ASVDF Flooring takes VDF, industrial and warehouse flooring projects in every state and union territory of India, with crews and equipment mobilised from Hyderabad.',
    h1: 'VDF Flooring Across India',
    eyebrow: 'Every state and union territory',
    intro: `ASVDF FLOORING PRIVATE LIMITED is registered in Shamshabad, Hyderabad, and installs flooring all over India. ${NAMED_AREAS_TEXT} have their own pages, but they are not the limit of where we work: we take projects in every other state and union territory too, with crews, supervision and equipment mobilised from Shamshabad for each site.`,
    sections: [
      {
        heading: 'States we cover',
        paragraphs: [
          'Alongside the areas listed above, we take projects in these states:',
        ],
        bullets: OTHER_STATES,
      },
      {
        heading: 'Union territories',
        paragraphs: [
          'We also work in all eight union territories. Island and remote sites, such as the Andaman and Nicobar Islands, Lakshadweep and high-altitude Ladakh, depend on shipping or road access for equipment and materials, so we assess them case by case before quoting.',
        ],
        bullets: UNION_TERRITORIES,
      },
      {
        heading: 'Industrial and warehousing hubs',
        paragraphs: [
          'Heavy-duty floors are needed wherever plants, warehouses and logistics parks are built. Major hubs include Delhi NCR (Gurugram, Manesar, Noida and Greater Noida), Gujarat (Ahmedabad, Sanand, Vadodara and Surat), Pithampur near Indore, Kolkata and Howrah, Jamshedpur, Ludhiana, Coimbatore, Kochi and Guwahati, along with the many smaller industrial estates set up by state industrial development corporations. Any city or town in India is covered; send us the location.',
        ],
      },
      {
        heading: 'How an out-of-state project works',
        bullets: [
          'Share the location, approximate area, building type and any drawings or load requirements',
          'We review the site details and, where needed, plan a site visit',
          'The quotation covers the flooring work and the travel, logistics and accommodation for the crew and equipment',
          'Crew, supervision and equipment such as vacuum dewatering units, power trowels and screeds are mobilised from Shamshabad',
          'Installation follows the same sequence as our Hyderabad projects: placement, vacuum dewatering, power trowelling, joints and curing',
        ],
        links: [
          { href: '/vdf-flooring-process', label: 'Our installation process' },
          { href: '/vdf-flooring-cost', label: 'What affects the quotation' },
        ],
      },
      {
        heading: 'Site conditions across India',
        paragraphs: [
          `Concreting practice changes with the region. The southwest monsoon (June to September) and, on the south-east coast, the northeast monsoon (October to December) decide when external slabs and open sites can be poured. IS 456 treats a coastal environment as severe exposure for concrete. Hot summers across the plains call for hot-weather concreting (IS 7861 Part 1), while winters in north India and the hill states call for cold-weather practice (IS 7861 Part 2) to protect fresh concrete from low temperatures. ${CURING_NOTE}`,
        ],
      },
      {
        heading: 'Services available everywhere',
        bullets: SERVICE_TITLES,
        links: [{ href: '/services', label: 'All services' }],
      },
    ],
    faqs: [
      {
        question: 'Do you work outside the states listed on your website?',
        answer:
          'Yes. The listed cities and states have their own pages, but we take projects in every state and union territory of India. Send the location with the approximate area and building type.',
      },
      {
        question: 'Do you have offices in other states?',
        answer:
          'No. The registered office is in Shamshabad, Ranga Reddy, Telangana. Projects in other states are run by crews and supervision mobilised from there for each site.',
      },
      {
        question: 'Does an out-of-state project cost more?',
        answer:
          'The flooring work is priced the same way everywhere. Travel, transport of equipment and accommodation for the crew are added for out-of-state sites and shown in the quotation.',
      },
      {
        question: 'How do I get a quotation for a site outside Telangana?',
        answer: `Call or WhatsApp ${PHONE}, email ${EMAIL}, or use the contact form with the site location, approximate area and building type.`,
      },
    ],
    related: [
      ...SERVICE_AREAS.map((area) => ({ href: area.path, label: `VDF flooring in ${area.name}` })),
      { href: '/contact', label: 'Request a quotation' },
    ],
  },

  pqcFlooring: {
    path: '/pqc-flooring',
    title: 'PQC Flooring | Pavement Quality Concrete',
    description:
      'PQC (pavement quality concrete) for yards, roads, parking and heavy-duty industrial areas. ASVDF Flooring builds rigid concrete pavements to specification.',
    h1: 'PQC Flooring Services',
    eyebrow: 'Pavement quality concrete',
    intro:
      'PQC — pavement quality concrete — is high-strength concrete designed for rigid pavements that carry heavy, repeated wheel loads. ASVDF Flooring constructs PQC for industrial yards, internal roads, parking areas and heavy-duty slabs, working from Shamshabad, Hyderabad, with projects all over India, including Hyderabad, Bengaluru, Chennai, Telangana, Andhra Pradesh, Karnataka, Maharashtra and Odisha.',
    sections: [
      {
        heading: 'What is PQC?',
        paragraphs: [
          'PQC is the top, load-bearing layer of a concrete pavement. Because pavements fail mainly by bending, PQC is designed on flexural strength rather than cube strength alone. In India, IRC:15 and MoRTH Section 602 set the requirements, commonly a minimum 28-day flexural strength of 4.5 MPa, with the slab laid over a prepared sub-base such as dry lean concrete (DLC).',
        ],
      },
      {
        heading: 'Where PQC is used',
        bullets: [
          'Industrial yards, container and truck parking areas',
          'Internal plant roads and approach roads',
          'Loading docks and hardstands for heavy vehicles',
          'Parking areas and other external slabs exposed to weather and traffic',
        ],
      },
      {
        heading: 'How PQC is constructed',
        paragraphs: [
          'The sub-grade and sub-base are prepared to level, then concrete of the approved mix is placed, compacted and finished to the specified surface. A textured finish is applied where skid resistance is needed. Contraction joints are cut at the designed spacing and sealed, and the pavement is cured thoroughly before it carries traffic.',
        ],
        links: [{ href: '/groove-cutting-joint-filling', label: 'Groove cutting and joint filling' }],
      },
      {
        heading: 'PQC or VDF?',
        paragraphs: [
          'PQC describes the concrete and the pavement it forms, typically outdoors. VDF describes how an industrial floor surface is finished, typically indoors. Some projects use both: PQC for yards and roads, VDF for the warehouse or factory floor.',
        ],
        links: [{ href: '/vdf-flooring', label: 'VDF flooring' }],
      },
    ],
    faqs: [
      {
        question: 'What does PQC stand for?',
        answer:
          'PQC stands for pavement quality concrete: a high-strength concrete designed on flexural strength for rigid pavements such as roads, yards and parking areas.',
      },
      {
        question: 'What is the difference between PQC and DLC?',
        answer:
          'DLC (dry lean concrete) is a lower-strength sub-base laid under the pavement. PQC is the high-strength wearing slab placed on top that carries the traffic.',
      },
      {
        question: 'How do I get a PQC flooring quotation?',
        answer:
          `Share the location, approximate area, expected vehicle loads and any drawings or specifications. Call or WhatsApp ${PHONE}, email ${EMAIL}, or use the contact form.`,
      },
    ],
    related: [
      { href: '/vdf-flooring', label: 'VDF flooring' },
      { href: '/groove-cutting-joint-filling', label: 'Joint cutting and filling' },
      { href: '/bar-bending-services', label: 'Bar bending services' },
      { href: '/contact', label: 'Request a quotation' },
    ],
  },

  laserScreed: {
    path: '/laser-screed-flooring',
    title: 'Laser Screed Flooring Services',
    description:
      'Laser screed flooring for warehouses and factories that need flat, level concrete. ASVDF Flooring uses laser-guided screeding for large industrial slabs.',
    h1: 'Laser Screed Flooring',
    eyebrow: 'Laser-guided concrete levelling',
    intro:
      'Laser screed flooring uses a laser-guided screeding machine to strike off fresh concrete to a precise level. It is used on large industrial slabs where flatness matters for racking, forklifts and material handling. ASVDF Flooring provides laser screed flooring from Shamshabad, Hyderabad, for projects all over India, including Hyderabad, Bengaluru, Chennai, Telangana, Andhra Pradesh, Karnataka, Maharashtra and Odisha.',
    sections: [
      {
        heading: 'How laser screeding works',
        paragraphs: [
          'A rotating laser transmitter sets a reference plane across the site. Receivers on the screed head read that plane and adjust the head height continuously as concrete is placed, while the machine vibrates and levels the surface. This gives far more consistent levels than manual screeding with rails over large areas.',
        ],
      },
      {
        heading: 'Flatness and levelness',
        paragraphs: [
          'Industrial floors are specified by measurable flatness and levelness, for example the FM classes in the Concrete Society’s TR34 or FF/FL numbers under ACI 117. Laser screeding is one of the main ways to meet these classes on large pours. Final results also depend on the sub-base, concrete mix, finishing and curing.',
        ],
      },
      {
        heading: 'Where it is used',
        bullets: [
          'Warehouses and distribution centres with high racking',
          'Factories and plants with forklift traffic',
          'Large slabs where wide daily pours are planned',
          'Floors that will receive VDF finishing or a surface hardener',
        ],
      },
      {
        heading: 'Combining with other systems',
        paragraphs: [
          'Laser screeding sets the level; the surface is then finished to suit the use. On many industrial floors it is followed by vacuum dewatering, floor hardener and power trowelling, then joint cutting and curing.',
        ],
        links: [
          { href: '/vdf-flooring', label: 'VDF flooring' },
          { href: '/floor-hardener-application', label: 'Floor hardener application' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is laser screed flooring?',
        answer:
          'It is a concrete floor levelled by a laser-guided screeding machine, which keeps the surface to a precise level across large areas.',
      },
      {
        question: 'Why use a laser screed instead of manual screeding?',
        answer:
          'On large slabs, laser control gives more consistent levels with fewer high and low spots, which helps meet the flatness that racking and forklifts need.',
      },
      {
        question: 'Can laser screeding be combined with VDF?',
        answer:
          'Yes. The laser screed levels the concrete, and vacuum dewatering and power trowelling then densify and finish the surface.',
      },
    ],
    related: [
      { href: '/vdf-flooring', label: 'VDF flooring' },
      { href: '/warehouse-flooring', label: 'Warehouse flooring' },
      { href: '/floor-hardener-application', label: 'Floor hardener application' },
      { href: '/contact', label: 'Request a quotation' },
    ],
  },

  concreteDensification: {
    path: '/concrete-densification-flooring',
    title: 'Concrete Densification | Dust-Proof Floors',
    description:
      'Concrete densification hardens floor surfaces, reduces dusting and improves abrasion resistance. ASVDF Flooring treats new and existing industrial floors.',
    h1: 'Concrete Densification Flooring',
    eyebrow: 'Chemical hardening for concrete',
    intro:
      'Concrete densification is a liquid treatment that hardens the top layer of a concrete floor, reduces dusting and improves resistance to wear. It suits new slabs and existing floors that have started to dust. ASVDF Flooring provides densification from Shamshabad, Hyderabad, for sites all over India, including Hyderabad, Bengaluru, Chennai, Telangana, Andhra Pradesh, Karnataka, Maharashtra and Odisha.',
    sections: [
      {
        heading: 'How densifiers work',
        paragraphs: [
          'Silicate densifiers (lithium, sodium or potassium based) soak into the concrete and react with free calcium hydroxide left from cement hydration. The reaction forms additional calcium silicate hydrate, the same binder that gives concrete its strength, which fills pores near the surface. The result is a denser, harder surface that sheds less dust.',
        ],
      },
      {
        heading: 'Benefits',
        bullets: [
          'Reduced surface dusting',
          'Better abrasion resistance under trolleys and forklifts',
          'Lower absorption, so spills are easier to clean',
          'A gradual sheen with regular cleaning',
          'No coating that can peel or delaminate',
        ],
      },
      {
        heading: 'How it is applied',
        paragraphs: [
          'The floor is cleaned, and repaired where needed. The densifier is then applied evenly at the manufacturer’s coverage rate. Some products must be kept wet and scrubbed in, then the residue removed; lithium-based products usually penetrate without scrubbing. Densifiers are also used during grinding and polishing.',
        ],
        links: [{ href: '/floor-grinding-polishing', label: 'Floor grinding and polishing' }],
      },
      {
        heading: 'Limits to know',
        paragraphs: [
          'A densifier strengthens the concrete you already have; it does not fill cracks, level an uneven slab or protect against strong chemicals. Damaged floors need repair first, and chemical areas may need an epoxy system.',
        ],
        links: [{ href: '/epoxy-flooring', label: 'Epoxy flooring' }],
      },
    ],
    faqs: [
      {
        question: 'What does a concrete densifier do?',
        answer:
          'It reacts with the concrete to form extra binder in the surface pores, making the floor harder, less dusty and more resistant to abrasion.',
      },
      {
        question: 'Can densification be done on an old floor?',
        answer:
          'Yes, provided the surface is cleaned and any damage is repaired first. It is a common treatment for older floors that have started to dust.',
      },
      {
        question: 'Is densification the same as a coating?',
        answer:
          'No. A densifier penetrates and reacts inside the concrete, so there is no surface film to peel. A coating such as epoxy forms a separate layer on top.',
      },
    ],
    related: [
      { href: '/floor-grinding-polishing', label: 'Floor grinding and polishing' },
      { href: '/floor-hardener-application', label: 'Floor hardener application' },
      { href: '/vacuum-densification-flooring', label: 'Vacuum densification' },
      { href: '/contact', label: 'Request a quotation' },
    ],
  },

  epoxyFlooring: {
    path: '/epoxy-flooring',
    title: 'Industrial Epoxy Flooring Contractors',
    description:
      'Industrial epoxy flooring for factories, workshops, food, pharma and commercial areas. Seamless, chemical-resistant floors installed by ASVDF Flooring.',
    h1: 'Epoxy Flooring Services',
    eyebrow: 'Seamless resin floors',
    intro:
      'Epoxy flooring is a resin system applied over prepared concrete to create a seamless, hard-wearing and easy-to-clean surface. It is used where floors face spills, frequent washing or hygiene requirements. ASVDF Flooring installs epoxy floors from Shamshabad, Hyderabad, for projects all over India, including Hyderabad, Bengaluru, Chennai, Telangana, Andhra Pradesh, Karnataka, Maharashtra and Odisha.',
    sections: [
      {
        heading: 'Types of epoxy flooring',
        bullets: [
          'Epoxy coatings: thin, roller-applied systems for dust-proofing and light traffic',
          'Self-levelling epoxy: smooth, seamless floors for production and clean areas',
          'Epoxy mortar or screed: thicker systems for heavy wear and impact',
          'Anti-slip finishes with broadcast aggregate for wet or sloped areas',
        ],
      },
      {
        heading: 'Where epoxy is used',
        paragraphs: [
          'Typical areas include manufacturing plants, automobile workshops, food and pharmaceutical units, laboratories, electrical rooms, service bays and commercial back-of-house areas. Line marking and colour zoning can be built into the floor.',
        ],
      },
      {
        heading: 'Surface preparation comes first',
        paragraphs: [
          'Most epoxy failures start with the substrate. The concrete is mechanically prepared by grinding or shot blasting, cracks and damaged joints are repaired, and moisture is checked before priming. The chosen system is then applied in layers to the specified thickness.',
        ],
        links: [{ href: '/groove-cutting-joint-filling', label: 'Groove cutting and joint filling' }],
      },
      {
        heading: 'Choosing the right system',
        paragraphs: [
          'Thickness, texture and resin type should follow the traffic, chemicals, cleaning method and slip resistance needed in each area. For dry storage with heavy traffic, a hardened or polished concrete floor may be the better choice.',
        ],
        links: [
          { href: '/floor-grinding-polishing', label: 'Polished concrete' },
          { href: '/blog/polished-concrete-vs-epoxy-flooring', label: 'Polished concrete vs epoxy' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is epoxy flooring used for?',
        answer:
          'It provides a seamless, chemical-resistant and easy-to-clean surface for factories, workshops, food and pharma units, laboratories and similar areas.',
      },
      {
        question: 'Can epoxy be applied over an existing concrete floor?',
        answer:
          'Yes, if the concrete is sound. It must be mechanically prepared, repaired where needed and checked for moisture before the epoxy is applied.',
      },
      {
        question: 'Is epoxy flooring slippery?',
        answer:
          'A smooth finish can be slippery when wet. Anti-slip textures can be added for wet areas, ramps and wash-down zones.',
      },
    ],
    related: [
      { href: '/industrial-flooring', label: 'Industrial flooring' },
      { href: '/floor-grinding-polishing', label: 'Floor grinding and polishing' },
      { href: '/blog/why-epoxy-flooring-is-ideal-for-industrial-facilities', label: 'Why epoxy suits industrial facilities' },
      { href: '/contact', label: 'Request a quotation' },
    ],
  },

  floorHardener: {
    path: '/floor-hardener-application',
    title: 'Floor Hardener Application Services',
    description:
      'Dry-shake floor hardener application for industrial concrete floors with heavy traffic. ASVDF Flooring improves abrasion resistance on new slabs.',
    h1: 'Floor Hardener Application',
    eyebrow: 'Wear-resistant concrete surfaces',
    intro:
      'A floor hardener is a dry-shake topping worked into fresh concrete to create a harder, more abrasion-resistant wearing surface. It is widely used on warehouse and factory floors with forklift and trolley traffic. ASVDF Flooring applies floor hardeners from Shamshabad, Hyderabad, on projects all over India, including Hyderabad, Bengaluru, Chennai, Telangana, Andhra Pradesh, Karnataka, Maharashtra and Odisha.',
    sections: [
      {
        heading: 'What is a dry-shake hardener?',
        paragraphs: [
          'Dry-shake hardeners are factory-blended mixes of cement and hard aggregates. Non-metallic hardeners use mineral aggregates such as quartz or corundum; metallic hardeners use iron aggregate for the heaviest wear. Coloured versions are available for zoning.',
        ],
      },
      {
        heading: 'How it is applied',
        paragraphs: [
          'The hardener is broadcast evenly over the fresh slab once bleed water has dissipated, usually in two passes. Each pass is floated in with power trowels so it becomes part of the concrete surface, and the floor is then trowelled to its final finish and cured. Timing is critical: applying too early or trowelling too steeply can cause blistering.',
        ],
      },
      {
        heading: 'Benefits',
        bullets: [
          'Higher abrasion and impact resistance',
          'Less dusting from the wearing surface',
          'Integral with the slab, so no separate layer to peel',
          'Works well with VDF and laser screed floors',
        ],
      },
      {
        heading: 'New floors, and existing ones',
        paragraphs: [
          'Dry-shake hardeners can only be applied to fresh concrete during the pour. For an existing floor, the usual options are chemical densification, grinding, or a resin system.',
        ],
        links: [
          { href: '/concrete-densification-flooring', label: 'Concrete densification' },
          { href: '/epoxy-flooring', label: 'Epoxy flooring' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between metallic and non-metallic hardeners?',
        answer:
          'Non-metallic hardeners use mineral aggregates such as quartz or corundum. Metallic hardeners use iron aggregate and are chosen for the heaviest wear and impact.',
      },
      {
        question: 'Can a floor hardener be applied to an old floor?',
        answer:
          'A dry-shake hardener cannot; it must be worked into fresh concrete. Existing floors are usually treated with a liquid densifier or a resin system instead.',
      },
      {
        question: 'Is floor hardener used with VDF flooring?',
        answer:
          'Often, yes. The hardener is broadcast and trowelled into the VDF slab after vacuum dewatering to give a more wear-resistant surface.',
      },
    ],
    related: [
      { href: '/vdf-flooring', label: 'VDF flooring' },
      { href: '/laser-screed-flooring', label: 'Laser screed flooring' },
      { href: '/concrete-densification-flooring', label: 'Concrete densification' },
      { href: '/contact', label: 'Request a quotation' },
    ],
  },

  grooveCutting: {
    path: '/groove-cutting-joint-filling',
    title: 'Groove Cutting & Joint Filling Services',
    description:
      'Saw-cut groove cutting and joint filling for industrial concrete floors. Control cracking and protect joint edges from forklift damage with ASVDF Flooring.',
    h1: 'Groove Cutting & Joint Filling',
    eyebrow: 'Concrete floor joints',
    intro:
      'Groove cutting creates planned joints so a concrete slab cracks in straight lines where it is meant to, rather than randomly. Joint filling then protects those joints from traffic damage. ASVDF Flooring provides groove cutting and joint filling for new and existing floors from Shamshabad, Hyderabad, all over India, including Hyderabad, Bengaluru, Chennai, Telangana, Andhra Pradesh, Karnataka, Maharashtra and Odisha.',
    sections: [
      {
        heading: 'Why concrete floors need joints',
        paragraphs: [
          'Concrete shrinks as it dries. Without joints, that movement shows up as random cracks. Contraction joints, saw-cut to a set depth (commonly about a quarter of the slab thickness), create weakened planes so the slab cracks neatly beneath the cut.',
        ],
      },
      {
        heading: 'Groove cutting',
        paragraphs: [
          'Joints are cut with floor saws to the designed layout, spacing and depth. Timing matters: cutting is done within hours of finishing, once the concrete can be cut without ravelling but before uncontrolled cracks form.',
        ],
      },
      {
        heading: 'Joint filling',
        paragraphs: [
          'Open joints chip at the edges under hard forklift wheels. A semi-rigid filler, such as a two-component epoxy or polyurea, supports the joint edges while allowing slight movement. Where practical, filling is delayed so the slab has shrunk and the joints are closer to their final width.',
        ],
        bullets: [
          'Semi-rigid fillers for forklift traffic areas',
          'Flexible sealants for external and movement joints',
          'Refilling and edge repair on existing floors',
        ],
      },
      {
        heading: 'Repairing damaged joints',
        paragraphs: [
          'Spalled joints can be repaired by cutting back the damaged edges, rebuilding them with a suitable repair material and refilling the joint.',
        ],
      },
    ],
    faqs: [
      {
        question: 'When should joints be cut in a new concrete floor?',
        answer:
          'Usually within hours of finishing, once the surface can be cut cleanly without ravelling, and before random shrinkage cracks form.',
      },
      {
        question: 'Why do joints need to be filled?',
        answer:
          'Filling supports the joint edges so hard wheels do not chip them, and keeps dirt and debris out of the joint.',
      },
      {
        question: 'Can you repair damaged joints on an existing floor?',
        answer:
          'Yes. Damaged edges are cut back and rebuilt with a repair material, and the joint is then refilled with a suitable filler.',
      },
    ],
    related: [
      { href: '/concrete-densification-flooring', label: 'Concrete densification' },
      { href: '/vdf-flooring', label: 'VDF flooring' },
      { href: '/pqc-flooring', label: 'PQC flooring' },
      { href: '/contact', label: 'Request a quotation' },
    ],
  },

  barBending: {
    path: '/bar-bending-services',
    title: 'Bar Bending & Rebar Fixing Services',
    description:
      'Bar bending services: cutting, bending and fixing of TMT reinforcement bars at site as per drawings and bar bending schedules (BBS). ASVDF Flooring.',
    h1: 'Bar Bending Services',
    eyebrow: 'Reinforcement steel work',
    intro:
      'Bar bending is the cutting, bending and fixing of reinforcement steel so it matches the structural drawings exactly. ASVDF Flooring provides bar bending services at site for industrial, commercial and infrastructure projects, from Shamshabad, Hyderabad, all over India, including Hyderabad, Bengaluru, Chennai, Telangana, Andhra Pradesh, Karnataka, Maharashtra and Odisha.',
    sections: [
      {
        heading: 'What bar bending involves',
        paragraphs: [
          'Reinforcement bars, usually TMT bars to IS 1786, are cut to the required lengths and bent to the shapes shown in the drawings, such as hooks, cranks, stirrups and links. The bent bars are then placed in position and tied together with binding wire so the cage holds its shape during concreting.',
        ],
      },
      {
        heading: 'Working from the bar bending schedule',
        paragraphs: [
          'A bar bending schedule (BBS) lists each bar by mark, diameter, shape, cutting length, quantity and weight. Cutting and bending to the BBS keeps bend dimensions, laps and quantities consistent with the design. Bending and fixing follow the drawings and accepted practice such as IS 2502, with cover and detailing as per IS 456.',
        ],
      },
      {
        heading: 'Where it is used',
        bullets: [
          'Footings, pedestals and columns',
          'Beams, slabs and staircases',
          'Reinforced floor slabs and pavements, including dowel and tie bars',
          'Retaining walls, pits and other reinforced concrete elements',
        ],
      },
      {
        heading: 'Why accurate bar bending matters',
        bullets: [
          'Correct shapes and lengths so the steel fits the formwork and design',
          'Proper cover, spacing and laps for strength and durability',
          'Less steel wastage through planned cutting lengths',
          'A rigid, well-tied cage that stays in place while concrete is poured',
        ],
        links: [
          { href: '/pqc-flooring', label: 'PQC flooring' },
          { href: '/vdf-flooring', label: 'VDF flooring' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is a bar bending schedule (BBS)?',
        answer:
          'A BBS is a table that lists every reinforcement bar in a structure by mark, diameter, shape, cutting length, number and weight. It is used to cut, bend and fix the steel accurately.',
      },
      {
        question: 'Do you also fix the reinforcement at site?',
        answer:
          'Yes. We cut and bend the bars, then place and tie them in position with binding wire as per the structural drawings.',
      },
      {
        question: 'What details do you need for a bar bending quotation?',
        answer:
          `Share the structural drawings or BBS, the approximate steel quantity, the project location and your schedule. Call or WhatsApp ${PHONE}, or email ${EMAIL}.`,
      },
    ],
    related: [
      { href: '/pqc-flooring', label: 'PQC flooring' },
      { href: '/vdf-flooring', label: 'VDF flooring' },
      { href: '/laser-screed-flooring', label: 'Laser screed flooring' },
      { href: '/contact', label: 'Request a quotation' },
    ],
  },

  grindingPolishing: {
    path: '/floor-grinding-polishing',
    title: 'Concrete Floor Grinding & Polishing',
    description:
      'Concrete floor grinding and polishing for warehouses, showrooms and commercial spaces. Smooth, durable polished concrete floors by ASVDF Flooring.',
    h1: 'Floor Grinding & Polishing',
    eyebrow: 'Polished concrete',
    intro:
      'Floor grinding and polishing refines the concrete surface itself into a smooth, durable and low-maintenance floor. It is used to restore worn floors, prepare surfaces for coatings and create polished concrete finishes. ASVDF Flooring provides grinding and polishing from Shamshabad, Hyderabad, all over India, including Hyderabad, Bengaluru, Chennai, Telangana, Andhra Pradesh, Karnataka, Maharashtra and Odisha.',
    sections: [
      {
        heading: 'How grinding and polishing works',
        paragraphs: [
          'Planetary floor grinders with diamond tooling remove the weak top layer and surface defects. The floor is then honed and polished through progressively finer grits, each removing the scratches of the one before. A densifier is applied during the process to harden the surface, and a guard can be added for stain resistance.',
        ],
        links: [{ href: '/concrete-densification-flooring', label: 'Concrete densification' }],
      },
      {
        heading: 'Uses',
        bullets: [
          'Polished concrete for warehouses, showrooms and offices',
          'Restoring worn or dusting floors',
          'Removing old coatings and adhesives',
          'Preparing concrete before epoxy or other coatings',
        ],
      },
      {
        heading: 'Benefits',
        bullets: [
          'Dense, abrasion-resistant surface with no coating to peel',
          'Reduced dusting and easier cleaning',
          'A finish from matte to high sheen, depending on the grit sequence',
          'Better light reflection in large spaces',
        ],
      },
      {
        heading: 'Good to know',
        paragraphs: [
          'Polished concrete depends on the quality of the slab underneath. Cracks and damaged joints should be repaired first, and areas with frequent chemical spills may be better served by an epoxy system.',
        ],
        links: [
          { href: '/epoxy-flooring', label: 'Epoxy flooring' },
          { href: '/blog/polished-concrete-vs-epoxy-flooring', label: 'Polished concrete vs epoxy' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between grinding and polishing?',
        answer:
          'Grinding uses coarse diamond tools to remove the top layer and level defects. Polishing uses progressively finer tools to refine that surface to the desired smoothness and sheen.',
      },
      {
        question: 'Can an old concrete floor be polished?',
        answer:
          'Yes, if the slab is sound. Repairs are done first, then the floor is ground, densified and polished.',
      },
      {
        question: 'Does polished concrete need a coating?',
        answer:
          'No coating is needed. A penetrating densifier hardens the surface, and an optional guard improves stain resistance.',
      },
    ],
    related: [
      { href: '/concrete-densification-flooring', label: 'Concrete densification' },
      { href: '/epoxy-flooring', label: 'Epoxy flooring' },
      { href: '/groove-cutting-joint-filling', label: 'Groove cutting and joint filling' },
      { href: '/contact', label: 'Request a quotation' },
    ],
  },
};

/** Every location page, and the contractors page, links on to the rest-of-India page. */
const AREA_PATHS = new Set([...SERVICE_AREAS.map((area) => area.path), PAGE_COPY.contractors.path]);
Object.values(PAGE_COPY)
  .filter((copy) => AREA_PATHS.has(copy.path))
  .forEach((copy) => copy.related.push({ href: ALL_INDIA_AREA.path, label: 'VDF flooring in other states and cities' }));

export const HOME_HERO_COPY = {
  badge: 'VDF & Trimix Flooring Contractors',
  headingLine1: 'Stronger Floors.',
  headingLine2: 'Stronger ',
  headingHighlight: 'Foundations.',
  subtext:
    'High-performance flooring solutions for industrial, commercial and infrastructure projects. Built for durability. Designed to last.',
  ctaPrimary: 'Explore Our Services',
  ctaSecondary: 'View Our Projects',
};

export const ABOUT_COPY = {
  eyebrow: 'About ASVDF Flooring',
  h1Line1: 'Building Stronger Foundations.',
  h1Line2: 'Creating ',
  h1Highlight: 'Lasting Value.',
  intro: [
    'ASVDF Flooring Private Limited (ASVDF) is a leading provider of high-performance flooring solutions for industrial, commercial, and infrastructure projects.',
    'With a commitment to quality, innovation, and customer satisfaction, we deliver floors that stand the test of time and performance.',
  ],
  badgeTitle: `Since ${FOUNDED_YEAR}`,
  badgeText: 'Delivering quality VDF and industrial flooring solutions.',
  storyEyebrow: 'Our Story',
  storyHeadingLine1: 'A Legacy of Quality',
  storyHeadingLine2: 'and Commitment.',
  story:
    'Founded with a vision to redefine flooring standards, ASVDF Flooring has grown into a trusted name across industries. Our journey is built on hard work, technical expertise, and a relentless focus on delivering durable, high-performance flooring solutions.',
  pillars: [
    {
      title: 'Mission',
      text: 'To deliver innovative and durable flooring solutions that enhance spaces and exceed expectations.',
    },
    {
      title: 'Vision',
      text: 'To be the most trusted flooring solutions provider, recognized for quality, innovation, and integrity.',
    },
    {
      title: 'Our Approach',
      text: 'We combine advanced technology, skilled workforce, and best practices to deliver results that last.',
    },
    {
      title: 'Why Choose Us?',
      text: 'Quality materials, timely delivery, safety-first approach, and unmatched customer support.',
    },
  ],
};

export const ABOUT_EXTRA = {
  title: 'About',
  description:
    'ASVDF Flooring is a VDF and industrial flooring contractor (ASVDF FLOORING PRIVATE LIMITED) based in Shamshabad, Hyderabad, installing vacuum dewatered floors for plants, warehouses, and commercial buildings.',
  sections: [
    {
      heading: 'What we do',
      paragraphs: [
        'ASVDF Flooring specialises in high-performance VDF and industrial flooring systems. We combine modern machinery, skilled teams, and quality control to deliver floors meant to last under real traffic — warehouses, plants, and commercial buildings included.',
      ],
    },
    {
      heading: 'How we work',
      paragraphs: [
        `ASVDF FLOORING PRIVATE LIMITED (GSTIN 36ABBCA9210B2Z7, PAN ABBCA9210B) started in ${FOUNDED_YEAR} with a focus on industrial VDF systems. The plant list includes vacuum dewatering units, power trowels, and concrete screeds. The registered office is in Shamshabad, Ranga Reddy, Telangana. We take work all over India, including Hyderabad, Bengaluru, Chennai, Telangana, Andhra Pradesh, Karnataka, Maharashtra and Odisha.`,
      ],
    },
    {
      heading: 'Registered office',
      paragraphs: [
        'Ground Floor, Flat No. 22-250/7/5/A/1, Plot No. 7, Survey No. 324/EE, Airport Residency Phase II, Near ORR Toll Plaza, Shamshabad, Ranga Reddy, Telangana – 501218.',
      ],
    },
  ],
};

/** "How we work" values on /about. */
export const ABOUT_VALUES = [
  { title: 'Quality', description: 'Precision workmanship on every slab.' },
  { title: 'Safety', description: 'Site safety and compliance first.' },
  { title: 'Reliability', description: 'On-time delivery you can trust.' },
  { title: 'Partnership', description: 'Long-term client relationships.' },
];

export const CONTACT_COPY = {
  title: 'Contact',
  description:
    'Request a VDF flooring quotation from ASVDF FLOORING PRIVATE LIMITED. Call +91 90632 22804, email asvdfflooringpvtltd@gmail.com, or write to the Shamshabad, Hyderabad office.',
  h1: 'Contact ASVDF Flooring',
  displayName: 'AS VDF Flooring Private Limited',
  formHeading: 'Send Us a Message',
  locationHeading: 'Our Location',
  quickHeading: 'Quick Ways to Connect',
  privacyTitle: 'We respect your privacy.',
  privacyText: 'Your details are used only to respond to your enquiry.',
  whatsappMessage: 'Hello AS VDF Flooring Team, I would like to enquire about your flooring services.',
  emailSubject: 'Flooring Services Inquiry',
  intro:
    'Share your site location, approximate area, and building type. We will recommend a flooring system and prepare a quotation. For urgent discussions, call or WhatsApp +91 90632 22804. The registered office is in Shamshabad, Ranga Reddy, Telangana – 501218.',
};

/** Timed "request a call back" dialog shown to new visitors. */
export const CALLBACK_COPY = {
  title: 'Want us to call you?',
  text: 'Leave your mobile number and our flooring team will call you back to discuss your project.',
  label: 'Mobile number',
  placeholder: 'Enter your mobile number',
  button: 'Request a Call Back',
  privacy: 'We only use your number to call you about your enquiry.',
  success: 'Thank you! Our team will call you shortly.',
};

export const SERVICES_HUB = {
  title: 'Flooring Services',
  description:
    'VDF flooring, industrial flooring, warehouse flooring, and concrete flooring services from ASVDF Flooring, Hyderabad.',
  eyebrow: 'Our Services',
  h1Line1: 'High-Performance Flooring.',
  h1Line2: 'Built for ',
  h1Highlight: 'Every Need.',
  intro:
    'We deliver advanced flooring solutions tailored for industrial, commercial, and infrastructure spaces. Quality, durability, and precision in every layer.',
  sectionHeading: 'Our Flooring Services',
};

export const PROJECTS_COPY = {
  title: 'Flooring Projects',
  description:
    'Industrial, warehouse, and commercial flooring projects by ASVDF Flooring. Browse completed VDF and concrete floor work.',
  eyebrow: 'Our Projects',
  h1Line1: 'Built with Precision.',
  h1Line2: 'Delivered with ',
  h1Highlight: 'Pride.',
  intro:
    'Explore our diverse range of successful flooring projects across industries. Each project reflects our commitment to quality, innovation, and long-lasting performance.',
};

export const CLIENTS_COPY = {
  title: 'Our Clients',
  description:
    'Clients and partners of ASVDF Flooring — testimonials and the organisations we work with on industrial, commercial and infrastructure flooring.',
  eyebrow: 'Our Clients',
  h1Line1: 'Trusted by Industry Leaders.',
  h1Line2: 'Built on ',
  h1Highlight: 'Trust.',
  intro:
    'We take pride in partnering with forward-thinking companies across industries. Their trust inspires us to deliver excellence in every square foot.',
  galleryHeading: 'Our Esteemed Clients',
  featuredQuote: {
    quote: 'ASVDF Flooring delivered a flawless VDF floor on schedule. Highly recommended.',
    name: 'Manoj',
    role: 'Plant Manager at MEIL',
  },
  secondaryQuote: {
    quote: 'Quality workmanship and professional team throughout the project.',
    name: 'Vamshi Krishna',
    role: 'Project Head at My Home Constructions',
  },
  features: [
    { title: 'Quality Focused', text: 'We ensure the highest standards in every project.' },
    { title: 'On-Time Delivery', text: 'Committed to completing projects on schedule.' },
    { title: 'Long-Term Partnership', text: 'Building lasting relationships through trust and results.' },
  ],
};

export const GALLERY_COPY = {
  eyebrow: 'Our Gallery',
  headingLine1: 'Flooring Excellence',
  headingLine2: 'In ',
  headingHighlight: 'Every Detail.',
  intro:
    'Explore our completed projects and see how we transform spaces with precision, quality, and lasting performance.',
  emptyTitle: 'No photos in this category yet.',
  emptyText: 'Try another category or view all photos.',
};

export const TESTIMONIALS_COPY = {
  eyebrow: 'Testimonials',
  headingLine1: 'Trusted by Clients.',
  headingHighlight: 'Proven',
  headingRest: ' by Results.',
  intro:
    "We take pride in delivering high-performance flooring solutions that exceed expectations. Here's what our clients have to say about their experience with ASVDF.",
  // Company statement (not a customer quote).
  statement:
    'Our commitment to quality, precision, and reliability has earned the trust of leading businesses across industries.',
  gridHeading: 'What our clients say',
  reviews: [
    {
      id: 'abhilash',
      name: 'Abhilash',
      role: 'Project Manager at Varahi Engineers, Hyderabad',
      quote:
        'The VDF floor ASVDF laid for us is dense, level and dust-free. Their team kept to the plan and coordinated well with our site staff.',
      rating: 5,
    },
    {
      id: 'ramanjaneya-reddy',
      name: 'Ramanjaneya Reddy',
      role: 'Proprietor at MERIT Infrastructure, Hyderabad',
      quote:
        'Quality is consistent on every job we give them, and they sort out site issues without us having to follow up.',
      rating: 5,
    },
    {
      id: 'dhananjay',
      name: 'Dhananjay',
      role: 'Project Manager at Ardee Engineers',
      quote:
        'Their laser screed work gave us the flatness our racking needed. Joints were cut on time and the finish was neat across the area.',
      rating: 5,
    },
    {
      id: 'venkat-ramesh',
      name: 'Venkat Ramesh',
      role: 'Proprietor at Bhanu Enterprises',
      quote: 'Clear quotation, no surprises and a strong finish. ASVDF is now our first call for industrial flooring.',
      rating: 5,
    },
    {
      id: 'ashok',
      name: 'Ashok',
      role: 'Project Manager at My Homes',
      quote:
        'Professional crew, the right machinery and proper curing. The floor has held up well under daily traffic.',
      rating: 5,
    },
    {
      id: 'srinivas',
      name: 'Srinivas',
      role: 'Proprietor at Maruti Construction, Hyderabad',
      quote: 'ASVDF delivered our PQC work with a good surface finish and clean joints. Reliable people to work with.',
      rating: 5,
    },
    {
      id: 'mustan-reddy',
      name: 'Mustan Reddy',
      role: 'Project Manager at Ultra Tech Cement Pvt Ltd',
      quote:
        'The hardened floor surface takes heavy loads without dusting, and the work was done safely and to specification.',
      rating: 5,
    },
    {
      id: 'samba-shiva',
      name: 'Samba Shiva',
      role: 'Site Incharge at MVP Construction, Vizag',
      quote:
        'Bar bending and fixing were done accurately as per the drawings, which kept our concreting on schedule.',
      rating: 5,
    },
  ],
  emptyText: 'Client reviews will appear here once they are published.',
  ctaHeading: 'Ready to experience the ASVDF difference?',
  ctaText: "Let's build something exceptional together.",
  ctaButton: 'Request a Quote',
};

export const BLOGS_COPY = {
  eyebrow: 'Our Blog',
  headingLine1: 'Insights. Innovations.',
  headingHighlight: 'Inspiration.',
  intro: 'Expert insights, industry trends, and practical tips on industrial flooring and infrastructure.',
  heroImageAlt: 'ASVDF Flooring hard hat, notebook and laptop on a polished concrete floor',
  categoriesHeading: 'Categories',
  allPosts: 'All Posts',
  tagsHeading: 'Popular Tags',
  searchPlaceholder: 'Search blogs...',
  noResultsTitle: 'No articles found.',
  noResultsText: 'Try another search term or clear your filters.',
  emptyCategoryText: 'There are no articles in this category yet. Check back soon.',
  emptyText: 'Articles will appear here once they are published.',
  author: 'ASVDF Flooring',
  backLink: 'Back to Blogs',
  relatedHeading: 'Related articles',
};

export const FAQS_COPY = {
  eyebrow: 'FAQs',
  headingLine1: 'Find Answers.',
  headingLine2Start: 'Make ',
  headingHighlight: 'Informed',
  headingLine2End: ' Decisions.',
  intro: 'Everything you need to know about our flooring solutions, services, and processes.',
  heroImageAlt: 'Large purple FAQ letters standing on a polished industrial warehouse floor',
  categoriesHeading: 'Categories',
  allQuestions: 'All Questions',
  supportHeading: 'Still have questions?',
  supportText: 'Our team is here to help you.',
  contactCta: 'Contact Us',
  listHeading: 'Frequently Asked Questions',
  searchPlaceholder: 'Search questions...',
  noResultsTitle: 'No matching questions found.',
  noResultsText: 'Try another search term or explore a different category.',
  emptyText: 'Questions and answers will appear here once they are published.',
  stripHeading: "Can't find what you're looking for?",
  stripText: 'Contact our experts for personalized assistance.',
};

export const FINAL_CTA_COPY = {
  eyebrow: "Let's Build Together",
  headingLine1: 'Ready to Build Stronger',
  headingLine2: 'Foundations ',
  headingHighlight: 'Together?',
  text: 'Partner with ASVDF Flooring for reliable, durable, and high-performance flooring solutions tailored to your needs.',
  button: 'Request a Quote',
  imageAlt: 'Underground industrial hall with a polished concrete floor and gantry crane',
};

export const BLOG_INDEX = {
  title: 'Flooring Guides',
  description:
    'Guides on VDF flooring, vacuum dewatering, and industrial warehouse floors from ASVDF Flooring.',
  h1: 'Flooring Guides',
  intro:
    'Short, practical notes on vacuum dewatered flooring and how to specify floors for warehouses and plants.',
};
