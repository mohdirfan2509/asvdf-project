import Link from 'next/link';
import SeedButton from '@/components/admin/SeedButton';
import { readLocalStore } from '@/lib/content/local-store';
import { isFirebaseAdminConfigured } from '@/lib/firebase/config';
import { isCloudinaryConfigured } from '@/lib/cloudinary';
import { firestoreGetCollection } from '@/lib/firebase/firestore';
import {
  Briefcase,
  Wrench,
  Users,
  FileText,
  HelpCircle,
  Images,
  Cog,
  Flag,
  Heart,
  Settings,
  Layers,
  Info,
  MessageSquareQuote,
  ChevronRight,
} from 'lucide-react';

export const metadata = { title: 'Admin Home' };

async function count(collection) {
  if (isFirebaseAdminConfigured()) {
    try {
      const rows = await firestoreGetCollection(collection);
      return rows?.length || 0;
    } catch {
      return 0;
    }
  }
  const store = await readLocalStore();
  return store[collection]?.length || 0;
}

const CARDS = [
  { label: 'Projects', collection: 'projects', href: '/admin/projects', icon: Briefcase },
  { label: 'Services', collection: 'services', href: '/admin/services', icon: Wrench },
  { label: 'Machinery', collection: 'machinery', href: '/admin/machinery', icon: Cog },
  { label: 'Clients', collection: 'clients', href: '/admin/clients', icon: Users },
  { label: 'Gallery', collection: 'gallery_images', href: '/admin/gallery', icon: Images },
  { label: 'Reviews', collection: 'testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'Blogs', collection: 'blogs', href: '/admin/blogs', icon: FileText },
  { label: 'FAQs', collection: 'faqs', href: '/admin/faqs', icon: HelpCircle },
  { label: 'Timeline', collection: 'milestones', href: '/admin/milestones', icon: Flag },
  { label: 'Values', collection: 'core_values', href: '/admin/values', icon: Heart },
];

const QUICK = [
  { href: '/admin/settings', label: 'Site Info', hint: 'Phone, stats, homepage text', icon: Settings },
  { href: '/admin/about', label: 'About', hint: 'Company story and photo', icon: Info },
  { href: '/admin/sections', label: 'Sections', hint: 'Show or hide page sections', icon: Layers },
];

export default async function AdminDashboard() {
  const counts = await Promise.all(CARDS.map((c) => count(c.collection)));

  return (
    <div className="space-y-5">
      <div className="bg-white border border-zinc-200 rounded-lg p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 tracking-tight">Dashboard</h1>
            <p className="text-sm text-zinc-500 mt-1 max-w-lg">
              Choose a section below to add or edit content. Items marked Visible appear on the website.
            </p>
            <div className="flex flex-wrap gap-2 mt-3 text-xs text-zinc-500">
              <span className="px-2.5 py-1 rounded-md border border-zinc-200 bg-zinc-50">
                {isFirebaseAdminConfigured() ? 'Cloud storage' : 'Local storage'}
              </span>
              <span className="px-2.5 py-1 rounded-md border border-zinc-200 bg-zinc-50">
                Photos: {isCloudinaryConfigured() ? 'Cloudinary' : 'Local'}
              </span>
            </div>
          </div>
          <SeedButton />
        </div>
      </div>

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 px-0.5">
          Setup
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {QUICK.map((q) => {
            const Icon = q.icon;
            return (
              <Link
                key={q.href}
                href={q.href}
                className="bg-white border border-zinc-200 rounded-lg p-4 flex items-center gap-3 hover:border-zinc-400 transition"
              >
                <span className="w-9 h-9 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-700 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-zinc-900">{q.label}</span>
                  <span className="block text-xs text-zinc-500 mt-0.5">{q.hint}</span>
                </span>
                <ChevronRight className="w-4 h-4 text-zinc-300 shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 px-0.5">
          Content
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="bg-white border border-zinc-200 rounded-lg p-4 hover:border-zinc-400 transition group"
              >
                <Icon className="w-4 h-4 text-zinc-400 group-hover:text-zinc-700" strokeWidth={1.75} />
                <p className="text-2xl font-semibold text-zinc-900 mt-3 tabular-nums leading-none">
                  {counts[i]}
                </p>
                <p className="text-sm text-zinc-600 mt-1.5 font-medium">{card.label}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-lg p-5">
        <p className="text-sm font-semibold text-zinc-900 mb-3">How it works</p>
        <ol className="space-y-2.5 text-sm text-zinc-600">
          <li className="flex gap-3">
            <span className="w-5 h-5 rounded-md bg-zinc-900 text-white text-[11px] font-medium flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <span>Open a section and click <strong className="font-semibold text-zinc-800">Add new</strong>.</span>
          </li>
          <li className="flex gap-3">
            <span className="w-5 h-5 rounded-md bg-zinc-900 text-white text-[11px] font-medium flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <span>Set it to <strong className="font-semibold text-zinc-800">Visible</strong> so it shows on the site.</span>
          </li>
          <li className="flex gap-3">
            <span className="w-5 h-5 rounded-md bg-zinc-900 text-white text-[11px] font-medium flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <span>Use <strong className="font-semibold text-zinc-800">View live site</strong> to confirm.</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
