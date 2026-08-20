'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Users, ShieldCheck, Clock, Briefcase, Building2 } from 'lucide-react';

const ICONS = {
  shield: Shield,
  users: Users,
  'shield-check': ShieldCheck,
  clock: Clock,
  briefcase: Briefcase,
  building: Building2,
};

const DEFAULT_FEATURES = [
  { id: 1, icon: 'shield', title: 'Advanced Technology', description: 'World-class machinery and modern techniques.' },
  { id: 2, icon: 'users', title: 'Experienced Team', description: 'Skilled professionals delivering precision and quality.' },
  { id: 3, icon: 'shield-check', title: 'Quality Assurance', description: 'Committed to safety, quality and timely delivery.' },
  { id: 4, icon: 'clock', title: 'On-time Delivery', description: 'We value time and ensure projects stay on schedule.' },
];

const DEFAULT_STATS = [
  { id: 1, icon: 'briefcase', number: '100+', label: 'Projects Completed' },
  { id: 2, icon: 'users', number: '50+', label: 'Happy Clients' },
  { id: 3, icon: 'clock', number: '10+', label: 'Years Experience' },
  { id: 4, icon: 'building', number: '8+', label: 'Industries Served' },
];

export default function HomeHero({ settings }) {
  const s = settings || {};
  return (
    <section className="flex flex-col gap-3">
      <div
        className="relative min-h-[68svh] sm:min-h-[72svh] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden flex items-end sm:items-center neu-lg border border-white/60"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(2,6,23,0.75), rgba(2,6,23,0.25)), url('${s.hero_image || '/banner.png'}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 px-5 sm:px-12 lg:px-16 py-8 sm:py-10 max-w-2xl">
          <div className="inline-flex items-center px-3 py-0.5 rounded-full border border-white/10 bg-slate-950/50 mb-3">
            <span className="text-[10px] font-[600] tracking-widest text-purple-200 uppercase">
              {s.hero_badge || 'PREMIUM FLOORING SOLUTIONS'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-[800] tracking-[-0.04em] leading-[1.08] text-white mb-3">
            {s.hero_heading_1 || 'Stronger Floors.'}
            <br />
            {s.hero_heading_2 || 'Stronger '}
            <span className="bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#D8B4FE] bg-clip-text text-transparent">
              {s.hero_highlight || 'Foundations.'}
            </span>
          </h1>
          <p className="text-sm text-slate-200 mb-5 max-w-lg">{s.hero_subtext}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/services" className="inline-flex items-center gap-2 text-white text-xs font-[600] px-6 py-3 rounded-lg neu-btn-primary">
              {s.cta_primary || 'Explore Our Services'} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/projects" className="inline-flex items-center gap-2 text-slate-900 text-xs font-[600] px-6 py-3 rounded-lg neu-btn-secondary">
              {s.cta_secondary || 'View Our Projects'} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 -mt-2 relative z-10 px-1">
        {DEFAULT_FEATURES.map((item) => {
          const Icon = ICONS[item.icon] || Shield;
          return (
            <div key={item.id} className="bg-white rounded-2xl p-4 neu-md flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#F6F7FB] neu-inset flex items-center justify-center text-[#7C3AED]">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-[600] text-slate-900">{item.title}</h3>
                <p className="text-[11px] text-slate-500">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl px-6 py-4 neu-lg border border-white/80">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {DEFAULT_STATS.map((stat) => {
            const Icon = ICONS[stat.icon] || Briefcase;
            return (
              <div key={stat.id} className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#F6F7FB] neu-inset flex items-center justify-center text-[#7C3AED]">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-lg font-[800] text-[#7C3AED]">{stat.number}</div>
                  <div className="text-[11px] font-[500] text-slate-500">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
