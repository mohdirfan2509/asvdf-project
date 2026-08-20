'use client';

import { useEffect, useState } from 'react';
import { Check, ImagePlus } from 'lucide-react';

const inputClass =
  'w-full bg-white border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900';

export default function AdminAboutPage() {
  const [about, setAbout] = useState(null);
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch('/api/admin/content?collection=about_content')
      .then((r) => r.json())
      .then((a) => setAbout(a.data || { headline: '', body: '', image: '' }));
  }, []);

  async function save() {
    setMsg('');
    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ about }),
    });
    const data = await res.json();
    setMsg(res.ok ? 'Saved' : data.error || 'Could not save');
  }

  async function onImage(file) {
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
    const data = await res.json();
    setUploading(false);
    if (res.ok && data.url) setAbout((prev) => ({ ...prev, image: data.url }));
    else setMsg(data.error || 'Upload failed');
  }

  if (!about) return <p className="text-sm text-zinc-500 p-4">Loading…</p>;

  return (
    <div className="space-y-4">
      <div className="bg-white border border-zinc-200 rounded-lg p-5">
        <h1 className="text-xl font-semibold text-zinc-900 tracking-tight">About</h1>
        <p className="text-sm text-zinc-500 mt-1">Company story shown on the website.</p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-lg p-5 space-y-4">
        <div>
          <label className="text-xs font-medium text-zinc-600 block mb-1.5">Headline</label>
          <input
            value={about.headline || ''}
            onChange={(e) => setAbout({ ...about, headline: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-600 block mb-1.5">Story</label>
          <textarea
            rows={6}
            value={about.body || ''}
            onChange={(e) => setAbout({ ...about, body: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-600 block mb-1.5">Photo</label>
          {about.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={about.image} alt="" className="h-40 w-full object-cover rounded-md border border-zinc-200 mb-3" />
          ) : (
            <div className="h-40 rounded-md bg-zinc-50 border border-dashed border-zinc-300 flex items-center justify-center mb-3 text-zinc-300">
              <ImagePlus className="w-7 h-7" strokeWidth={1.5} />
            </div>
          )}
          <label className="inline-flex cursor-pointer">
            <span className="inline-flex items-center gap-2 border border-zinc-300 bg-white text-zinc-800 text-sm font-medium px-3.5 py-2 rounded-md hover:bg-zinc-50">
              <ImagePlus className="w-4 h-4" strokeWidth={1.75} />
              {uploading ? 'Uploading…' : 'Choose photo'}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => onImage(e.target.files?.[0])}
            />
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={save}
        className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-zinc-800"
      >
        <Check className="w-4 h-4" strokeWidth={1.75} />
        Save
      </button>
      {msg && <p className="text-sm text-zinc-600">{msg}</p>}
    </div>
  );
}
