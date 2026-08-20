'use client';

import { useState } from 'react';

export default function GalleryGrid({ images = [] }) {
  const [lightbox, setLightbox] = useState(null);
  return (
    <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80">
      <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-1">Work</p>
      <h2 className="text-2xl sm:text-3xl font-[800] tracking-tight text-slate-900 mb-4">Gallery</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {images.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setLightbox(img)}
            className="aspect-[4/3] rounded-xl overflow-hidden bg-cover bg-center neu-sm"
            style={{ backgroundImage: `url('${img.image}')` }}
            aria-label={img.title || 'Gallery image'}
          />
        ))}
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox.image} alt={lightbox.title || ''} className="max-h-[85vh] max-w-full rounded-xl" />
        </div>
      )}
    </section>
  );
}
