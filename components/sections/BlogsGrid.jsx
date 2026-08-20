'use client';

import Link from 'next/link';

export default function BlogsGrid({ blogs = [], showAllLink = false }) {
  return (
    <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80">
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-1">Insights</p>
          <h2 className="text-2xl sm:text-3xl font-[800] tracking-tight text-slate-900">Blogs</h2>
        </div>
        {showAllLink && <Link href="/blog" className="text-xs font-[600] text-[#7C3AED]">View all</Link>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.slug}`} className="bg-[#F6F7FB] rounded-2xl overflow-hidden neu-sm border border-white block">
            {blog.cover && <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url('${blog.cover}')` }} />}
            <div className="p-3.5">
              <p className="text-[10px] font-[700] text-[#7C3AED] uppercase mb-1">{blog.category}</p>
              <h3 className="text-sm font-[700] text-slate-900 mb-1">{blog.title}</h3>
              <p className="text-[12px] text-slate-500 line-clamp-2">{blog.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
