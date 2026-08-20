'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

export default function ProjectsGrid({ projects = [], title = 'Our Projects', showAllLink = false }) {
  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [projects]);
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80">
      <div className="flex items-end justify-between gap-3 mb-4">
        <div>
          <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-1">Portfolio</p>
          <h2 className="text-2xl sm:text-3xl font-[800] tracking-tight text-slate-900">{title}</h2>
        </div>
        {showAllLink && (
          <Link href="/projects" className="text-xs font-[600] text-[#7C3AED]">View all</Link>
        )}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-3 mb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-[600] ${
              active === cat ? 'bg-[#7C3AED] text-white' : 'bg-[#F6F7FB] text-slate-600 neu-inset'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((project) => (
          <article key={project.id} className="bg-[#F6F7FB] rounded-2xl overflow-hidden neu-sm border border-white">
            <div
              className="h-40 bg-cover bg-center"
              style={{ backgroundImage: `url('${project.image}')` }}
              role="img"
              aria-label={project.title}
            />
            <div className="p-3.5">
              <p className="text-[10px] font-[700] text-[#7C3AED] uppercase mb-1">{project.category}</p>
              <h3 className="text-sm font-[700] text-slate-900 mb-1">{project.title}</h3>
              <p className="text-[11px] text-slate-500">{project.location}{project.area ? ` · ${project.area}` : ''}</p>
            </div>
          </article>
        ))}
        {!filtered.length && <p className="text-sm text-slate-500 col-span-full">No projects published yet.</p>}
      </div>
    </section>
  );
}
