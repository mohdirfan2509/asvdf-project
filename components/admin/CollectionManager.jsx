'use client';

import { useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff, Pencil, Trash2, Plus, ImagePlus, X, Check } from 'lucide-react';

async function uploadFile(file) {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Upload failed');
  return data;
}

function newestFirst(a, b) {
  const ta = a.updated_at || a.created_at || a.published_at || '';
  const tb = b.updated_at || b.created_at || b.published_at || '';
  if (ta || tb) return String(tb).localeCompare(String(ta));
  return String(b.id || '').localeCompare(String(a.id || ''));
}

function previewUrl(row) {
  return row.image || row.cover || row.logo || row.avatar || '';
}

function itemTitle(row) {
  return row.title || row.name || row.question || row.key || 'Item';
}

/**
 * Visual admin editor — clear controls, professional styling.
 * Visible = showing on website. Hidden = saved but not shown.
 */
export default function CollectionManager({
  collection,
  title,
  fields,
  emptyRow,
  helpText,
}) {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState('all');

  async function load() {
    const res = await fetch(`/api/admin/content?collection=${collection}`);
    const data = await res.json();
    setRows(Array.isArray(data.data) ? data.data : []);
  }

  useEffect(() => {
    load();
  }, [collection]);

  async function save() {
    setSaving(true);
    setError('');
    try {
      const now = new Date().toISOString();
      const row = {
        ...editing,
        updated_at: now,
        created_at: editing.created_at || now,
      };
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection, row }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save');
      setEditing(null);
      setInfo('Saved');
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function patchRow(row, patch) {
    setError('');
    const next = {
      ...row,
      ...patch,
      updated_at: new Date().toISOString(),
      created_at: row.created_at || new Date().toISOString(),
    };
    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collection, row: next }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Update failed');
      return;
    }
    await load();
  }

  async function remove(id) {
    if (!confirm('Delete this item permanently? Prefer setting it to Hidden instead.')) return;
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collection, action: 'delete', id }),
    });
    await load();
  }

  async function onImage(field, file) {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const data = await uploadFile(file);
      setEditing((prev) => ({ ...prev, [field]: data.url }));
      setInfo(data.provider === 'cloudinary' ? 'Photo uploaded' : data.warning || 'Photo added');
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  const filtered = useMemo(() => {
    return rows
      .filter((row) => {
        if (filter === 'showing') return row.published !== false && row.featured === true;
        if (filter === 'hidden') return !(row.published !== false && row.featured === true);
        return true;
      })
      .slice()
      .sort(newestFirst);
  }, [rows, filter]);

  const showingCount = rows.filter((r) => r.published !== false && r.featured === true).length;

  const inputClass =
    'w-full bg-white border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900';

  return (
    <div className="space-y-4">
      <div className="bg-white border border-zinc-200 rounded-lg p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 tracking-tight">{title}</h1>
            <p className="text-sm text-zinc-500 mt-1 max-w-xl">
              {helpText || 'Add items, then set Visible to show them on the website. Newest appear first.'}
            </p>
            <div className="flex flex-wrap gap-2 mt-3 text-xs">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-600">
                Total {rows.length}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-600">
                <Eye className="w-3.5 h-3.5" strokeWidth={1.75} />
                Visible {showingCount}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              setEditing({
                ...emptyRow,
                published: true,
                featured: true,
                sort_order: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })
            }
            className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-zinc-800"
          >
            <Plus className="w-4 h-4" strokeWidth={1.75} />
            Add new
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {[
            { id: 'all', label: 'All' },
            { id: 'showing', label: 'Visible' },
            { id: 'hidden', label: 'Hidden' },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`text-sm font-medium px-3 py-1.5 rounded-md ${
                filter === f.id
                  ? 'bg-zinc-900 text-white'
                  : 'border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 text-red-700 px-3 py-2.5 text-sm">
          {error}
        </div>
      )}
      {info && (
        <div className="rounded-md border border-zinc-200 bg-zinc-50 text-zinc-700 px-3 py-2.5 text-sm">
          {info}
        </div>
      )}

      {editing && (
        <div className="bg-white border border-zinc-300 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-zinc-900">
              {editing.id ? 'Edit item' : 'New item'}
            </h2>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="w-8 h-8 rounded-md border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50"
            >
              <X className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>

          <button
            type="button"
            onClick={() =>
              setEditing({
                ...editing,
                featured: !editing.featured,
                published: true,
              })
            }
            className={`w-full sm:w-auto rounded-md px-4 py-3 text-left border transition ${
              editing.featured
                ? 'border-zinc-900 bg-zinc-900 text-white'
                : 'border-zinc-300 bg-white text-zinc-700'
            }`}
          >
            <p className="text-sm font-semibold flex items-center gap-2">
              {editing.featured ? (
                <>
                  <Eye className="w-4 h-4" strokeWidth={1.75} /> Visible on website
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4" strokeWidth={1.75} /> Hidden from website
                </>
              )}
            </p>
            <p className={`text-xs mt-1 ${editing.featured ? 'text-zinc-300' : 'text-zinc-500'}`}>
              {editing.featured ? 'Visitors can see this' : 'Saved, but not shown yet'}
            </p>
          </button>

          {fields.map((field) => (
            <div key={field.name}>
              <label className="text-xs font-medium text-zinc-600 block mb-1.5">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  rows={4}
                  value={editing[field.name] || ''}
                  onChange={(e) => setEditing({ ...editing, [field.name]: e.target.value })}
                  className={inputClass}
                />
              ) : field.type === 'image' ? (
                <div className="space-y-3">
                  {editing[field.name] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={editing[field.name]}
                      alt=""
                      className="h-36 w-full object-cover rounded-md border border-zinc-200"
                    />
                  ) : (
                    <div className="h-36 rounded-md bg-zinc-50 border border-dashed border-zinc-300 flex items-center justify-center text-zinc-300">
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
                      onChange={(e) => onImage(field.name, e.target.files?.[0])}
                    />
                  </label>
                </div>
              ) : (
                <input
                  type={field.type || 'text'}
                  value={editing[field.name] ?? ''}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      [field.name]:
                        field.type === 'number' ? Number(e.target.value) : e.target.value,
                    })
                  }
                  className={inputClass}
                />
              )}
            </div>
          ))}

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={save}
              disabled={saving || uploading}
              className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-zinc-800 disabled:opacity-60"
            >
              <Check className="w-4 h-4" strokeWidth={1.75} />
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="inline-flex items-center gap-2 border border-zinc-300 text-zinc-700 text-sm font-medium px-4 py-2.5 rounded-md hover:bg-zinc-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((row) => {
          const showing = row.published !== false && row.featured === true;
          const img = previewUrl(row);
          return (
            <div
              key={row.id}
              className="bg-white rounded-lg overflow-hidden border border-zinc-200"
            >
              <div className="relative h-36 bg-zinc-50">
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-300">
                    <ImagePlus className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                )}
                <span
                  className={`absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border ${
                    showing
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-white text-zinc-500 border-zinc-200'
                  }`}
                >
                  {showing ? (
                    <>
                      <Eye className="w-3 h-3" strokeWidth={1.75} /> Visible
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3" strokeWidth={1.75} /> Hidden
                    </>
                  )}
                </span>
              </div>

              <div className="p-3.5 space-y-2.5">
                <h3 className="text-sm font-semibold text-zinc-900 line-clamp-2">{itemTitle(row)}</h3>

                <button
                  type="button"
                  onClick={() =>
                    patchRow(row, {
                      featured: !showing,
                      published: true,
                    })
                  }
                  className={`w-full rounded-md py-2.5 text-sm font-medium flex items-center justify-center gap-2 border ${
                    showing
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  {showing ? (
                    <>
                      <Eye className="w-4 h-4" strokeWidth={1.75} /> Visible — click to hide
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-4 h-4" strokeWidth={1.75} /> Hidden — click to show
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditing(row)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-md border border-zinc-200 text-zinc-700 py-2 text-sm font-medium hover:bg-zinc-50"
                  >
                    <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(row.id)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-md border border-zinc-200 text-zinc-500 py-2 text-sm font-medium hover:bg-zinc-50 hover:text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} /> Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!filtered.length && !editing && (
        <div className="bg-white border border-zinc-200 rounded-lg p-10 text-center">
          <p className="text-sm font-semibold text-zinc-900 mb-1">No items yet</p>
          <p className="text-sm text-zinc-500 mb-5">Add your first item to get started.</p>
          <button
            type="button"
            onClick={() =>
              setEditing({
                ...emptyRow,
                published: true,
                featured: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })
            }
            className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-zinc-800"
          >
            <Plus className="w-4 h-4" strokeWidth={1.75} /> Add new
          </button>
        </div>
      )}
    </div>
  );
}
