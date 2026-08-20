'use client';

import { useEffect, useState } from 'react';
import { Check, Phone, Search, Image as ImageIcon, Hash, Building2 } from 'lucide-react';

const inputClass =
  'w-full bg-white border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900';

export default function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [about, setAbout] = useState(null);
  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/content?collection=site_settings').then((r) => r.json()),
      fetch('/api/admin/content?collection=about_content').then((r) => r.json()),
    ]).then(([s, a]) => {
      setSettings(s.data);
      setAbout(a.data);
    });
  }, []);

  async function save() {
    setSaving(true);
    setMsg('');
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings }),
    });
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ about }),
    });
    setSaving(false);
    setMsg('Saved. Changes will appear on the website shortly.');
  }

  if (!settings || !about) {
    return <p className="text-sm text-zinc-500 p-4">Loading…</p>;
  }

  const field = (obj, setObj, key, label, textarea = false) => (
    <div key={key}>
      <label className="text-xs font-medium text-zinc-600 block mb-1.5">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          value={obj[key] || ''}
          onChange={(e) => setObj({ ...obj, [key]: e.target.value })}
          className={inputClass}
        />
      ) : (
        <input
          value={obj[key] || ''}
          onChange={(e) => setObj({ ...obj, [key]: e.target.value })}
          className={inputClass}
        />
      )}
    </div>
  );

  const Card = ({ icon: Icon, title, children, note }) => (
    <div className="bg-white border border-zinc-200 rounded-lg p-5 space-y-3">
      <div className="flex items-center gap-2.5 mb-1">
        <span className="w-8 h-8 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-600 flex items-center justify-center">
          <Icon className="w-4 h-4" strokeWidth={1.75} />
        </span>
        <h2 className="text-sm font-semibold text-zinc-900">{title}</h2>
      </div>
      {note && <p className="text-xs text-zinc-500 -mt-1">{note}</p>}
      {children}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="bg-white border border-zinc-200 rounded-lg p-5">
        <h1 className="text-xl font-semibold text-zinc-900 tracking-tight">Site Info</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Contact details, homepage text, and numbers shown on the site.
        </p>
      </div>

      <Card icon={Phone} title="Contact">
        {field(settings, setSettings, 'company_name', 'Company name')}
        {field(settings, setSettings, 'phone', 'Phone number')}
        {field(settings, setSettings, 'whatsapp', 'WhatsApp number')}
        {field(settings, setSettings, 'email', 'Email')}
        {field(settings, setSettings, 'address', 'Address')}
      </Card>

      <Card icon={Hash} title="Numbers on website" note="Shown on Home, About, and Projects.">
        {field(settings, setSettings, 'stat_projects', 'Projects (e.g. 120+)')}
        {field(settings, setSettings, 'stat_industries', 'Industries (e.g. 8+)')}
        {field(settings, setSettings, 'stat_years', 'Years (e.g. 12+)')}
        {field(settings, setSettings, 'stat_sqft', 'Sq.ft (e.g. 1M+)')}
      </Card>

      <Card icon={ImageIcon} title="Homepage banner">
        {field(settings, setSettings, 'hero_badge', 'Small label')}
        {field(settings, setSettings, 'hero_heading_1', 'Heading line 1')}
        {field(settings, setSettings, 'hero_heading_2', 'Heading line 2')}
        {field(settings, setSettings, 'hero_highlight', 'Highlighted word')}
        {field(settings, setSettings, 'hero_subtext', 'Short paragraph', true)}
        {field(settings, setSettings, 'hero_image', 'Banner image URL')}
        {field(settings, setSettings, 'cta_primary', 'Primary button text')}
        {field(settings, setSettings, 'cta_secondary', 'Secondary button text')}
      </Card>

      <Card icon={Search} title="Search listing (SEO)">
        {field(settings, setSettings, 'seo_title', 'Page title')}
        {field(settings, setSettings, 'seo_description', 'Short description', true)}
        {field(settings, setSettings, 'seo_keywords', 'Keywords')}
      </Card>

      <Card icon={Building2} title="About text" note="Also editable under About.">
        {field(about, setAbout, 'headline', 'Headline')}
        {field(about, setAbout, 'body', 'Story', true)}
        {field(about, setAbout, 'image', 'Photo URL')}
      </Card>

      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-zinc-800 disabled:opacity-60"
      >
        <Check className="w-4 h-4" strokeWidth={1.75} />
        {saving ? 'Saving…' : 'Save all'}
      </button>
      {msg && <p className="text-sm text-zinc-600">{msg}</p>}
    </div>
  );
}
