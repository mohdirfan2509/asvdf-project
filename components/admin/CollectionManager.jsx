'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff, ImageOff, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import EditorPanel from '@/components/admin/EditorPanel';
import { useToast } from '@/components/admin/Toaster';
import { PageHeader, Pill, Switch, iconButtonClass, inputClass } from '@/components/admin/ui';
import { isLive, sectionFor } from '@/components/admin/sections';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'visible', label: 'Visible' },
  { id: 'hidden', label: 'Hidden' },
];

function newestFirst(a, b) {
  const ta = a.updated_at || a.created_at || a.published_at || '';
  const tb = b.updated_at || b.created_at || b.published_at || '';
  return String(tb).localeCompare(String(ta));
}

const itemTitle = (row) => row.title || row.name || 'Untitled';
const previewUrl = (row) => row.image || row.cover || row.logo || '';

async function postContent(body) {
  const res = await fetch('/api/admin/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-hidden>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="surface-raised overflow-hidden rounded-panel">
          <div className="aspect-[16/10] animate-pulse bg-surface-sunken" />
          <div className="space-y-2.5 p-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-surface-sunken" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-surface-sunken" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * List + editor for one admin collection. `fields` drive the form; `subtitle(row)` gives the card's
 * secondary line. Visible = shown on the website; Hidden = saved but not shown.
 */
export default function CollectionManager({ collection, description, fields, emptyRow, subtitle, contain = false }) {
  const section = sectionFor(collection);
  const notify = useToast();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [draft, setDraft] = useState(null);
  const [snapshot, setSnapshot] = useState('');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/content?collection=${collection}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not load items.');
      setRows(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [collection, notify]);

  useEffect(() => {
    load();
  }, [load]);

  const openEditor = useCallback((row) => {
    const now = new Date().toISOString();
    const next = row ? { ...row } : { ...emptyRow, featured: true, published: true, sort_order: 0, created_at: now };
    setDraft(next);
    setSnapshot(JSON.stringify(next));
    setErrors({});
  }, [emptyRow]);

  // Dashboard quick actions link here with ?new=1.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('new') === '1') {
      openEditor(null);
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [openEditor]);

  const dirty = Boolean(draft) && JSON.stringify(draft) !== snapshot;

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  function requestClose() {
    if (!dirty) {
      setDraft(null);
      return;
    }
    setConfirm({
      title: 'Discard your changes?',
      message: 'You have unsaved changes. If you close the editor now, they will be lost.',
      confirmLabel: 'Discard changes',
      danger: true,
      run: async () => setDraft(null),
    });
  }

  async function save() {
    const nextErrors = {};
    for (const field of fields) {
      if (field.required && !String(draft[field.name] ?? '').trim()) nextErrors[field.name] = `${field.label} is required.`;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      notify('Please fill in the required fields.', 'error');
      return;
    }
    setSaving(true);
    try {
      const now = new Date().toISOString();
      await postContent({ collection, row: { ...draft, updated_at: now, created_at: draft.created_at || now } });
      notify(draft.id ? `Saved “${itemTitle(draft)}”.` : `Added “${itemTitle(draft)}”.`);
      setDraft(null);
      await load();
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function toggleVisible(row, visible) {
    const next = { ...row, featured: visible, published: true, updated_at: new Date().toISOString() };
    setRows((list) => list.map((item) => (item.id === row.id ? next : item)));
    try {
      await postContent({ collection, row: next });
      notify(visible ? `“${itemTitle(row)}” is now visible on the website.` : `“${itemTitle(row)}” is now hidden.`);
    } catch (err) {
      setRows((list) => list.map((item) => (item.id === row.id ? row : item)));
      notify(err.message, 'error');
    }
  }

  function askDelete(row) {
    setConfirm({
      title: `Delete “${itemTitle(row)}”?`,
      message: 'This permanently removes it. To take it off the website but keep it, switch it to Hidden instead.',
      confirmLabel: 'Delete',
      danger: true,
      run: async () => {
        await postContent({ collection, action: 'delete', id: row.id });
        notify(`Deleted “${itemTitle(row)}”.`);
        await load();
      },
    });
  }

  async function runConfirm() {
    setBusy(true);
    try {
      await confirm.run();
      setConfirm(null);
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setBusy(false);
    }
  }

  const counts = useMemo(() => {
    const visible = rows.filter(isLive).length;
    return { all: rows.length, visible, hidden: rows.length - visible };
  }, [rows]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows
      .filter((row) => (filter === 'visible' ? isLive(row) : filter === 'hidden' ? !isLive(row) : true))
      .filter((row) => !q || [itemTitle(row), subtitle?.(row)].join(' ').toLowerCase().includes(q))
      .sort(newestFirst);
  }, [rows, filter, query, subtitle]);

  const addButton = (
    <button type="button" onClick={() => openEditor(null)} className="btn-primary h-11 w-full px-5 text-sm sm:w-auto">
      <Plus className="h-4 w-4" aria-hidden />
      {section.addLabel}
    </button>
  );

  return (
    <>
      <PageHeader title={section.label} description={description} action={addButton}>
        <div className="flex flex-wrap gap-2">
          <Pill tone="brand">{counts.all} total</Pill>
          <Pill tone="live">
            <Eye className="h-3.5 w-3.5" aria-hidden /> {counts.visible} visible
          </Pill>
          <Pill tone="hidden">
            <EyeOff className="h-3.5 w-3.5" aria-hidden /> {counts.hidden} hidden
          </Pill>
        </div>
      </PageHeader>

      <div className="surface-raised flex flex-col gap-3 rounded-panel p-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
          <label htmlFor="admin-search" className="sr-only">
            Search {section.label.toLowerCase()}
          </label>
          <input
            id="admin-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${section.label.toLowerCase()}…`}
            className={`${inputClass} pl-10`}
          />
        </div>
        <div role="group" aria-label="Filter by visibility" className="flex gap-1 rounded-control bg-surface-sunken p-1 shadow-neu-inset">
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
              className={`flex-1 whitespace-nowrap rounded-[0.6rem] px-3 py-1.5 text-sm font-semibold transition-colors sm:flex-none ${
                filter === id ? 'bg-surface-raised text-brand shadow-neu-sm' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {label} <span className="tabular-nums opacity-70">{counts[id]}</span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <SkeletonGrid />
      ) : shown.length ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((row) => {
            const live = isLive(row);
            const img = previewUrl(row);
            const title = itemTitle(row);
            return (
              <li key={row.id} className="surface-raised flex flex-col overflow-hidden rounded-panel">
                <button
                  type="button"
                  onClick={() => openEditor(row)}
                  aria-label={`Edit ${title}`}
                  className="relative block aspect-[16/10] overflow-hidden bg-surface-sunken"
                >
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      className={`h-full w-full transition-transform duration-300 hover:scale-[1.03] ${contain ? 'bg-white object-contain p-6' : 'object-cover'}`}
                    />
                  ) : (
                    <span className="flex h-full flex-col items-center justify-center gap-2 text-ink-muted">
                      <ImageOff className="h-7 w-7" strokeWidth={1.5} aria-hidden />
                      <span className="text-xs font-medium">No {contain ? 'logo' : 'photo'} yet</span>
                    </span>
                  )}
                  <Pill tone={live ? 'live' : 'hidden'} className="absolute left-3 top-3 !bg-surface-raised shadow-float">
                    {live ? <Eye className="h-3.5 w-3.5" aria-hidden /> : <EyeOff className="h-3.5 w-3.5" aria-hidden />}
                    {live ? 'Visible' : 'Hidden'}
                  </Pill>
                </button>

                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div className="min-w-0">
                    <h2 className="line-clamp-2 text-[15px] font-semibold leading-snug text-ink">{title}</h2>
                    {subtitle?.(row) ? <p className="mt-1 truncate text-xs text-ink-muted">{subtitle(row)}</p> : null}
                  </div>
                  <div className="mt-auto flex items-center gap-2">
                    <Switch checked={live} onChange={(visible) => toggleVisible(row, visible)} label={`Show ${title} on the website`} />
                    <span className="text-xs font-semibold text-ink-muted">{live ? 'Visible' : 'Hidden'}</span>
                    <div className="ml-auto flex gap-2">
                      <button type="button" onClick={() => openEditor(row)} aria-label={`Edit ${title}`} title="Edit" className={iconButtonClass}>
                        <Pencil className="h-4 w-4" aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={() => askDelete(row)}
                        aria-label={`Delete ${title}`}
                        title="Delete"
                        className={`${iconButtonClass} hover:!text-red-600`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="surface-raised flex flex-col items-center rounded-panel px-6 py-14 text-center">
          <span className="icon-well h-14 w-14">
            <section.icon className="h-6 w-6" aria-hidden />
          </span>
          <p className="mt-4 text-base font-semibold text-ink">
            {rows.length ? 'Nothing matches your search or filter' : `No ${section.label.toLowerCase()} yet`}
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            {rows.length ? 'Try a different search, or switch the filter to All.' : `Add your first ${section.singular} to get started.`}
          </p>
          {rows.length ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setFilter('all');
              }}
              className="btn-secondary mt-5 h-11 px-5 text-sm"
            >
              Clear search and filter
            </button>
          ) : (
            <div className="mt-5">{addButton}</div>
          )}
        </div>
      )}

      <EditorPanel
        open={Boolean(draft)}
        heading={draft?.id ? `Edit ${section.singular}` : section.addLabel}
        fields={fields}
        draft={draft}
        errors={errors}
        saving={saving}
        onChange={setDraft}
        onSave={save}
        onRequestClose={requestClose}
        onError={(message) => notify(message, 'error')}
      />

      <ConfirmDialog
        open={Boolean(confirm)}
        title={confirm?.title}
        message={confirm?.message}
        confirmLabel={confirm?.confirmLabel}
        danger={confirm?.danger}
        busy={busy}
        onConfirm={runConfirm}
        onCancel={() => setConfirm(null)}
      />
    </>
  );
}
