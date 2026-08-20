'use client';

import { useEffect, useState } from 'react';
import { Check, ChevronUp, ChevronDown } from 'lucide-react';

export default function AdminSectionsPage() {
  const [sections, setSections] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/admin/content?collection=page_sections')
      .then((r) => r.json())
      .then((d) => setSections(Array.isArray(d.data) ? d.data : []));
  }, []);

  async function save() {
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sections }),
    });
    setMsg('Saved');
  }

  function move(index, dir) {
    const sorted = sections.slice().sort((a, b) => a.sort_order - b.sort_order);
    const target = index + dir;
    if (target < 0 || target >= sorted.length) return;
    [sorted[index], sorted[target]] = [sorted[target], sorted[index]];
    setSections(sorted.map((s, i) => ({ ...s, sort_order: i })));
  }

  const sorted = sections.slice().sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-zinc-200 rounded-lg p-5">
        <h1 className="text-xl font-semibold text-zinc-900 tracking-tight">Sections</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Turn sections on or off. Use arrows to change order on the website.
        </p>
      </div>

      <div className="space-y-2">
        {sorted.map((section, index) => {
          const on = section.enabled !== false;
          return (
            <div
              key={section.id || section.key}
              className="bg-white border border-zinc-200 rounded-lg p-3.5 flex items-center gap-3"
            >
              <button
                type="button"
                onClick={() => {
                  setSections(
                    sections.map((s) =>
                      s.key === section.key ? { ...s, enabled: !on } : s
                    )
                  );
                }}
                className={`min-w-[5rem] rounded-md py-2 px-3 text-sm font-medium border ${
                  on
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-white text-zinc-500 border-zinc-300'
                }`}
              >
                {on ? 'On' : 'Off'}
              </button>
              <span className="flex-1 text-sm font-medium text-zinc-900">{section.label}</span>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  className="w-8 h-8 rounded-md border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50"
                  onClick={() => move(index, -1)}
                  aria-label="Move up"
                >
                  <ChevronUp className="w-4 h-4" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-md border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50"
                  onClick={() => move(index, 1)}
                  aria-label="Move down"
                >
                  <ChevronDown className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          );
        })}
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
