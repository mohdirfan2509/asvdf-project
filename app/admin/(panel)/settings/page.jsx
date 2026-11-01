'use client';

import { useEffect, useState } from 'react';
import { Award, Building2, Check, LoaderCircle, ShieldCheck, Star, Users } from 'lucide-react';
import { useToast } from '@/components/admin/Toaster';
import { PageHeader, inputClass } from '@/components/admin/ui';
import { STAT_DEFAULTS, statValue } from '@/lib/stats';

const FIELDS = [
  { key: 'stat_projects', label: 'Projects completed', icon: Star },
  { key: 'stat_clients', label: 'Happy clients', icon: Users },
  { key: 'stat_industries', label: 'Industries served', icon: Building2 },
];

const AUTOMATIC = [
  { key: 'stat_years', label: 'Years of experience', icon: Award, note: 'Counts up every 1 January' },
  { key: 'stat_satisfaction', label: 'Client satisfaction', icon: ShieldCheck, note: 'Fixed' },
];

function StatPreview({ icon: Icon, value, label, note }) {
  return (
    <div className="flex items-center gap-3 rounded-card bg-surface p-3.5 shadow-neu-inset">
      <span className="icon-orb h-11 w-11">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-xl font-bold tabular-nums text-ink">{value}</span>
        <span className="block text-xs text-ink-muted">
          {label}
          {note ? ` · ${note}` : ''}
        </span>
      </span>
    </div>
  );
}

export default function NumbersPage() {
  const notify = useToast();
  const [values, setValues] = useState(null);
  const [saved, setSaved] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/content?collection=site_settings')
      .then((r) => r.json())
      .then((s) => {
        const data = Object.fromEntries(FIELDS.map(({ key }) => [key, s.data?.[key] || '']));
        setValues(data);
        setSaved(JSON.stringify(data));
      })
      .catch(() => notify('Could not load the numbers.', 'error'));
  }, [notify]);

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: values }),
      });
      if (!res.ok) throw new Error();
      setSaved(JSON.stringify(values));
      notify('Numbers saved. The website updates within a minute.');
    } catch {
      notify('Could not save. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  }

  const dirty = values && JSON.stringify(values) !== saved;

  return (
    <>
      <PageHeader
        title="Numbers"
        description="The figures in the statistics across the website. Leave a field empty to use the default shown in it."
      />

      {values ? (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <form onSubmit={save} className="surface-raised space-y-5 rounded-panel p-5 sm:p-6">
            <h2 className="text-lg font-bold tracking-tight text-ink">Edit numbers</h2>
            {FIELDS.map(({ key, label }) => (
              <div key={key}>
                <label htmlFor={key} className="mb-1.5 block text-sm font-semibold text-ink">
                  {label}
                </label>
                <input
                  id={key}
                  value={values[key]}
                  onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                  placeholder={STAT_DEFAULTS[key]}
                  maxLength={20}
                  className={inputClass}
                />
                <p className="mt-1.5 text-xs text-ink-muted">Write it as it should appear, e.g. {STAT_DEFAULTS[key]}</p>
              </div>
            ))}
            <button type="submit" disabled={saving || !dirty} className="btn-primary h-11 w-full px-5 text-sm disabled:opacity-60 sm:w-auto">
              {saving ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> : <Check className="h-4 w-4" aria-hidden />}
              {saving ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}
            </button>
          </form>

          <section aria-labelledby="preview-heading" className="surface-raised rounded-panel p-5 sm:p-6">
            <h2 id="preview-heading" className="text-lg font-bold tracking-tight text-ink">
              Preview
            </h2>
            <p className="mt-1 text-sm text-ink-muted">How the figures read on the website.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {FIELDS.map(({ key, label, icon }) => (
                <StatPreview key={key} icon={icon} label={label} value={statValue(values, key)} />
              ))}
              {AUTOMATIC.map(({ key, label, icon, note }) => (
                <StatPreview key={key} icon={icon} label={label} note={note} value={statValue(values, key)} />
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="surface-raised h-72 animate-pulse rounded-panel" aria-label="Loading" />
      )}
    </>
  );
}
