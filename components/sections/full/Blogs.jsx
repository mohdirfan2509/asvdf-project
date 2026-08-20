'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import SectionFrame from '@/components/layout/SectionFrame';
import QuadCarousel from '@/components/ui/QuadCarousel';

const BLOG_ARTICLES = [
  { id: 1, category: 'Guides', date: 'May 20, 2025', title: 'What is VDF Flooring and Why It Matters', excerpt: 'Learn how vacuum dewatered flooring improves strength and durability.', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop', slug: 'what-is-vdf-flooring' },
  { id: 2, category: 'Industrial', date: 'May 12, 2025', title: 'Choosing Industrial Flooring for Warehouses', excerpt: 'Key factors when selecting flooring for logistics and storage facilities.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop', slug: 'industrial-flooring-for-warehouses' },
  { id: 3, category: 'Insights', date: 'May 05, 2025', title: 'Laser Screed vs Traditional Flooring', excerpt: 'How modern leveling technology changes flatness and speed on site.', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop', slug: null },
  { id: 4, category: 'Case Study', date: 'Apr 28, 2025', title: '100,000 Sq.ft Project Delivery', excerpt: 'A look into a large-scale flooring project delivered with precision.', image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800&auto=format&fit=crop', slug: null },
  { id: 5, category: 'Maintenance', date: 'Apr 20, 2025', title: 'Keeping Industrial Floors Performing', excerpt: 'Practical tips to extend the life of high-traffic concrete floors.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop', slug: null },
  { id: 6, category: 'Guides', date: 'Apr 15, 2025', title: 'Epoxy vs VDF: Which Fits Your Site?', excerpt: 'Match flooring systems to chemical exposure, loads, and budgets.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop', slug: null },
  { id: 7, category: 'Industrial', date: 'Apr 08, 2025', title: 'Floor Hardener Best Practices', excerpt: 'Application timing and finishing tips for abrasion resistance.', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop', slug: null },
  { id: 8, category: 'Insights', date: 'Apr 01, 2025', title: 'Planning Joints for Long Floor Life', excerpt: 'How joint layout protects slabs under forklift traffic.', image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800&auto=format&fit=crop', slug: null },
];

const BG = 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1600&auto=format&fit=crop';

export default function Blogs({ blogs = null }) {
  const source = blogs?.length
    ? blogs.map((b) => ({
        id: b.id,
        category: b.category || 'Article',
        date: b.published_at
          ? new Date(b.published_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
          : '',
        title: b.title,
        excerpt: b.excerpt || '',
        image: b.cover || b.image || BLOG_ARTICLES[0].image,
        slug: b.slug,
      }))
    : BLOG_ARTICLES;

  return (
    <SectionFrame
      eyebrow="Blogs"
      title="Insights from the"
      highlight="flooring floor."
      backgroundImage={BG}
      overlay="light"
    >
      <QuadCarousel
        items={source}
        renderItem={(article) => {
          const card = (
            <article className="group h-full min-h-[200px] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col">
              <div className="relative h-[36%] min-h-[90px] overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute bottom-2 left-2 text-[10px] font-[700] px-2 py-0.5 rounded-md bg-white/95 text-[#7C3AED]">
                  {article.category}
                </span>
              </div>
              <div className="p-3.5 sm:p-4 flex-1 min-h-0 flex flex-col">
                {article.date ? (
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </p>
                ) : null}
                <h3 className="text-sm sm:text-base font-[800] text-slate-900 leading-snug mb-1.5 group-hover:text-[#7C3AED] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 flex-1">
                  {article.excerpt}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-[700] text-[#7C3AED]">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          );

          if (article.slug) {
            return (
              <Link href={`/blog/${article.slug}`} className="block h-full">
                {card}
              </Link>
            );
          }
          return <div className="h-full">{card}</div>;
        }}
      />
    </SectionFrame>
  );
}
