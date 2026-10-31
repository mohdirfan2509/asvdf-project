'use client';

import { useEffect, useState } from 'react';
import { Mail, Phone, Trash2 } from 'lucide-react';

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function AdminEnquiriesPage() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');

  async function load() {
    setError('');
    try {
      const res = await fetch('/api/admin/content?collection=inquiries');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not load enquiries');
      const list = Array.isArray(data.data) ? data.data : [];
      setRows(list.slice().sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || ''))));
    } catch (err) {
      setError(err.message);
      setRows([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id) {
    if (!confirm('Delete this enquiry permanently?')) return;
    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collection: 'inquiries', action: 'delete', id }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Could not delete the enquiry');
      return;
    }
    load();
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-zinc-200 rounded-lg p-5">
        <h1 className="text-xl font-semibold text-zinc-900 tracking-tight">Enquiries</h1>
        <p className="text-sm text-zinc-500 mt-1">Messages sent from the website contact form. Newest first.</p>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 text-red-700 px-3 py-2.5 text-sm">{error}</div>
      ) : null}

      {rows === null ? <p className="text-sm text-zinc-500 p-4">Loading…</p> : null}

      {rows?.length === 0 && !error ? (
        <div className="bg-white border border-zinc-200 rounded-lg p-10 text-center text-sm text-zinc-500">
          No enquiries yet.
        </div>
      ) : null}

      <ul className="space-y-3">
        {rows?.map((row) => (
          <li key={row.id} className="bg-white border border-zinc-200 rounded-lg p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  {row.full_name}
                  {row.company_name ? <span className="font-normal text-zinc-500"> · {row.company_name}</span> : null}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {formatDate(row.created_at)}
                  {row.service ? ` · ${row.service}` : ''}
                  {row.location ? ` · ${row.location}` : ''}
                </p>
              </div>
              <button
                type="button"
                onClick={() => remove(row.id)}
                className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:text-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} /> Delete
              </button>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm text-zinc-700">{row.message}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <a href={`mailto:${row.email}`} className="inline-flex items-center gap-1.5 text-zinc-700 hover:text-zinc-900">
                <Mail className="h-4 w-4" strokeWidth={1.75} /> {row.email}
              </a>
              <a href={`tel:${row.phone}`} className="inline-flex items-center gap-1.5 text-zinc-700 hover:text-zinc-900">
                <Phone className="h-4 w-4" strokeWidth={1.75} /> {row.phone}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
