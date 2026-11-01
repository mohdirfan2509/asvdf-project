import Link from 'next/link';
import { ArrowRight, Cloud, Database, Eye, EyeOff, Hash, Plus } from 'lucide-react';
import { CONTENT_SECTIONS, isLive } from '@/components/admin/sections';
import { Pill, StatusDot } from '@/components/admin/ui';
import { getAdminSession } from '@/lib/admin/auth';
import { isCloudinaryConfigured } from '@/lib/cloudinary';
import { getSiteSettings } from '@/lib/content/queries';
import { readLocalStore } from '@/lib/content/local-store';
import { isFirebaseAdminConfigured } from '@/lib/firebase/config';
import { firestoreGetCollection } from '@/lib/firebase/firestore';
import { statValue } from '@/lib/stats';

export const metadata = { title: 'Dashboard' };
export const dynamic = 'force-dynamic';

/** Every item in a collection, including hidden ones. */
async function allRows(collection) {
  if (isFirebaseAdminConfigured()) {
    try {
      return (await firestoreGetCollection(collection)) || [];
    } catch {
      return [];
    }
  }
  const store = await readLocalStore();
  return store[collection] || [];
}

function timeAgo(iso) {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (!Number.isFinite(seconds)) return '';
  const steps = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [30, 'day'],
    [12, 'month'],
  ];
  let value = seconds;
  for (const [size, unit] of steps) {
    if (value < size) return unit === 'second' ? 'just now' : `${Math.floor(value)} ${unit}${Math.floor(value) === 1 ? '' : 's'} ago`;
    value /= size;
  }
  return `${Math.floor(value)} year${Math.floor(value) === 1 ? '' : 's'} ago`;
}

const NUMBERS = [
  { key: 'stat_projects', label: 'Projects completed' },
  { key: 'stat_clients', label: 'Happy clients' },
  { key: 'stat_industries', label: 'Industries served' },
  { key: 'stat_years', label: 'Years of experience', fixed: true },
  { key: 'stat_satisfaction', label: 'Client satisfaction', fixed: true },
];

export default async function AdminDashboard() {
  const [session, settings, ...lists] = await Promise.all([
    getAdminSession(),
    getSiteSettings(),
    ...CONTENT_SECTIONS.map((section) => allRows(section.collection)),
  ]);

  const sections = CONTENT_SECTIONS.map((section, i) => {
    const rows = lists[i];
    const visible = rows.filter(isLive).length;
    return { ...section, rows, total: rows.length, visible, hidden: rows.length - visible };
  });

  const recent = sections
    .flatMap((section) => section.rows.map((row) => ({ section, row, at: row.updated_at || row.created_at || '' })))
    .filter((entry) => entry.at)
    .sort((a, b) => String(b.at).localeCompare(String(a.at)))
    .slice(0, 6);

  const firebase = isFirebaseAdminConfigured();
  const cloudinary = isCloudinaryConfigured();

  return (
    <>
      <header className="surface-raised rounded-panel p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Dashboard</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Welcome back</h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted">
          {session.user?.email ? `Signed in as ${session.user.email}. ` : ''}
          Keep the website’s projects, clients, gallery, blogs and numbers up to date from here.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Pill tone={firebase ? 'live' : 'warn'}>
            <StatusDot ok={firebase} />
            <Database className="h-3.5 w-3.5" aria-hidden />
            {firebase ? 'Database: Firebase connected' : 'Database: local file (Firebase not set up)'}
          </Pill>
          <Pill tone={cloudinary ? 'live' : 'warn'}>
            <StatusDot ok={cloudinary} />
            <Cloud className="h-3.5 w-3.5" aria-hidden />
            {cloudinary ? 'Images: Cloudinary' : 'Images: this computer only (Cloudinary not set up)'}
          </Pill>
        </div>
      </header>

      <section aria-labelledby="sections-heading">
        <h2 id="sections-heading" className="sr-only">
          Website content
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sections.map(({ collection, label, href, icon: Icon, total, visible, hidden }) => (
            <li key={collection}>
              <Link
                href={href}
                className="surface-raised group flex h-full flex-col rounded-panel p-5 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-neu-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="icon-orb h-11 w-11">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <ArrowRight className="h-4 w-4 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
                </div>
                <p className="mt-4 text-3xl font-bold tabular-nums text-ink">{total}</p>
                <p className="text-sm font-semibold text-ink">{label}</p>
                <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-muted">
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden /> {visible} visible
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <EyeOff className="h-3.5 w-3.5" aria-hidden /> {hidden} hidden
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <section aria-labelledby="quick-heading" className="surface-raised rounded-panel p-5 sm:p-6">
          <h2 id="quick-heading" className="text-lg font-bold tracking-tight text-ink">
            Quick actions
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CONTENT_SECTIONS.map(({ collection, href, addLabel, icon: Icon }) => (
              <Link
                key={collection}
                href={`${href}?new=1`}
                className="btn-secondary h-auto justify-start gap-3 px-3.5 py-3 text-sm"
              >
                <span className="icon-well h-9 w-9">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                {addLabel}
                <Plus className="ml-auto h-4 w-4 text-ink-muted" aria-hidden />
              </Link>
            ))}
            <Link href="/admin/settings" className="btn-secondary h-auto justify-start gap-3 px-3.5 py-3 text-sm sm:col-span-2">
              <span className="icon-well h-9 w-9">
                <Hash className="h-4 w-4" aria-hidden />
              </span>
              Update website numbers
              <ArrowRight className="ml-auto h-4 w-4 text-ink-muted" aria-hidden />
            </Link>
          </div>

          <h3 className="mt-7 text-sm font-semibold text-ink">Numbers on the website</h3>
          <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {NUMBERS.map(({ key, label, fixed }) => (
              <div key={key} className="rounded-card bg-surface p-3 shadow-neu-inset">
                <dt className="text-[11px] font-medium leading-tight text-ink-muted">{label}</dt>
                <dd className="mt-1 text-lg font-bold tabular-nums text-brand">{statValue(settings, key)}</dd>
                {fixed ? <dd className="text-[10px] text-ink-muted">Automatic</dd> : null}
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="recent-heading" className="surface-raised rounded-panel p-5 sm:p-6">
          <h2 id="recent-heading" className="text-lg font-bold tracking-tight text-ink">
            Recently updated
          </h2>
          {recent.length ? (
            <ul className="mt-3 divide-y divide-line">
              {recent.map(({ section, row, at }) => {
                const live = isLive(row);
                const Icon = section.icon;
                return (
                  <li key={`${section.collection}-${row.id}`}>
                    <Link href={section.href} className="group flex items-center gap-3 py-3">
                      <span className="icon-well h-10 w-10">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-ink group-hover:text-brand">
                          {row.title || row.name || 'Untitled'}
                        </span>
                        <span className="block text-xs text-ink-muted">
                          {section.label} · {timeAgo(at)}
                        </span>
                      </span>
                      <Pill tone={live ? 'live' : 'hidden'}>{live ? 'Visible' : 'Hidden'}</Pill>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-ink-muted">Nothing has been edited yet.</p>
          )}
        </section>
      </div>
    </>
  );
}
