'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  Info,
  Briefcase,
  Wrench,
  Users,
  Flag,
  Heart,
  MessageSquareQuote,
  FileText,
  Images,
  Cog,
  HelpCircle,
  Layers,
  LogOut,
  ExternalLink,
} from 'lucide-react';

const LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/settings', label: 'Site Info', icon: Settings },
  { href: '/admin/about', label: 'About', icon: Info },
  { href: '/admin/projects', label: 'Projects', icon: Briefcase },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/machinery', label: 'Machinery', icon: Cog },
  { href: '/admin/clients', label: 'Clients', icon: Users },
  { href: '/admin/gallery', label: 'Gallery', icon: Images },
  { href: '/admin/testimonials', label: 'Reviews', icon: MessageSquareQuote },
  { href: '/admin/blogs', label: 'Blogs', icon: FileText },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/milestones', label: 'Timeline', icon: Flag },
  { href: '/admin/values', label: 'Values', icon: Heart },
  { href: '/admin/sections', label: 'Sections', icon: Layers },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <aside className="w-full lg:w-56 shrink-0">
      <div className="bg-white border border-zinc-200 rounded-lg">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-zinc-100">
          <div className="w-9 h-9 rounded-md bg-zinc-900 text-white flex items-center justify-center text-xs font-semibold tracking-wide">
            AS
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 leading-tight">ASVDF Admin</p>
            <p className="text-[11px] text-zinc-500">Website editor</p>
          </div>
        </div>

        <nav className="p-2 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-1 gap-0.5">
          {LINKS.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col lg:flex-row items-center lg:items-center gap-1 lg:gap-2.5 rounded-md px-2 lg:px-3 py-2.5 transition ${
                  active
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                <span className="text-[10px] lg:text-[13px] font-medium text-center lg:text-left leading-tight">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-2 pt-0 border-t border-zinc-100 mt-1 space-y-0.5">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 w-full rounded-md px-3 py-2.5 text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
          >
            <ExternalLink className="w-4 h-4" strokeWidth={1.75} />
            View website
          </a>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2.5 w-full rounded-md px-3 py-2.5 text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.75} />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
