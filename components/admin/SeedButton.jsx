'use client';

import { useState } from 'react';

export default function SeedButton() {
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function seed() {
    if (!confirm('Load starter photos and text? Safe to run — it fills empty areas only.')) return;
    setLoading(true);
    setMsg('');
    const res = await fetch('/api/admin/seed', { method: 'POST' });
    const data = await res.json();
    setLoading(false);
    setMsg(res.ok ? 'Starter content loaded' : data.error || 'Could not load');
  }

  return (
    <div className="flex flex-col items-start sm:items-end gap-1.5">
      <button
        type="button"
        onClick={seed}
        disabled={loading}
        className="inline-flex items-center rounded-md border border-zinc-300 bg-white text-zinc-800 text-sm font-medium px-3.5 py-2 hover:bg-zinc-50 disabled:opacity-60"
      >
        {loading ? 'Loading…' : 'Load starter content'}
      </button>
      {msg && <span className="text-xs text-zinc-500">{msg}</span>}
    </div>
  );
}
