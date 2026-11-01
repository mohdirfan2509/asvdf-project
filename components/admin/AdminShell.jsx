'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ExternalLink, LogOut, Menu, UserRound, X } from 'lucide-react';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { ToastProvider } from '@/components/admin/Toaster';
import { ADMIN_NAV } from '@/components/admin/sections';

function isActive(pathname, href) {
  return href === '/admin' ? pathname === '/admin' : pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent({ pathname, email, onSignOut }) {
  return (
    <div className="flex h-full flex-col">
      <Link href="/admin" className="flex items-center gap-3 rounded-control px-2 py-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/asvdf-logo.png" alt="" className="h-11 w-auto rounded-[10px] bg-black object-contain" />
        <span className="min-w-0">
          <span className="block text-[15px] font-bold leading-tight text-ink">ASVDF Admin</span>
          <span className="block text-xs text-ink-muted">Website editor</span>
        </span>
      </Link>

      <nav aria-label="Admin" className="mt-6 flex flex-col gap-1">
        {ADMIN_NAV.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`group flex items-center gap-3 rounded-control px-2.5 py-2 text-sm font-semibold transition-colors ${
                active ? 'bg-brand-soft text-brand' : 'text-ink hover:bg-surface hover:text-brand'
              }`}
            >
              <span
                className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                  active ? 'bg-brand-solid text-white shadow-brand' : 'icon-well text-ink-muted group-hover:text-brand'
                }`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden />
              </span>
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1 pt-6">
        <ThemeToggle />
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center gap-2.5 rounded-control px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface hover:text-brand"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          View website
        </a>
        <div className="mt-2 flex items-center gap-3 rounded-card bg-surface p-3 shadow-neu-inset">
          <span className="icon-well h-9 w-9 text-ink-muted">
            <UserRound className="h-4 w-4" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs text-ink-muted">Signed in as</span>
            <span className="block truncate text-sm font-semibold text-ink" title={email || 'Admin'}>
              {email || 'Admin'}
            </span>
          </span>
          <button
            type="button"
            onClick={onSignOut}
            aria-label="Sign out"
            title="Sign out"
            className="icon-well h-9 w-9 text-ink-muted transition-colors hover:text-red-600"
          >
            <LogOut className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Admin frame: fixed sidebar on desktop; top bar with a slide-in menu on tablets and phones. */
export default function AdminShell({ email, children }) {
  const pathname = usePathname() || '/admin';
  const router = useRouter();
  const drawerRef = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const current = ADMIN_NAV.find(({ href }) => isActive(pathname, href));

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    if (drawerOpen && !drawer.open) drawer.showModal();
    if (!drawerOpen && drawer.open) drawer.close();
  }, [drawerOpen]);

  useEffect(() => setDrawerOpen(false), [pathname]);

  async function signOut() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-surface text-ink lg:flex">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-0 h-screen p-4">
            <div className="surface-raised h-full overflow-y-auto rounded-panel p-4">
              <SidebarContent pathname={pathname} email={email} onSignOut={signOut} />
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="sticky top-0 z-40 bg-surface/90 px-3 pt-3 backdrop-blur-md sm:px-5 lg:hidden">
            <div className="surface-raised flex h-14 items-center gap-3 rounded-panel px-3">
              <Link href="/admin" aria-label="Admin dashboard" className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/asvdf-logo.png" alt="" className="h-9 w-auto rounded-lg bg-black object-contain" />
              </Link>
              <p className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">{current?.label || 'Admin'}</p>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                aria-haspopup="dialog"
                className="icon-well h-10 w-10 text-ink transition-colors hover:text-brand"
              >
                <Menu className="h-[18px] w-[18px]" />
              </button>
            </div>
          </div>

          <main id="main" className="mx-auto w-full max-w-6xl space-y-5 px-3 pb-16 pt-4 sm:px-5 lg:px-8 lg:pt-6">
            {children}
          </main>
        </div>
      </div>

      <dialog
        ref={drawerRef}
        onClose={() => setDrawerOpen(false)}
        onClick={(e) => {
          if (e.target === drawerRef.current) setDrawerOpen(false);
        }}
        aria-label="Admin menu"
        className="m-0 h-dvh max-h-dvh w-[min(20rem,86vw)] border-0 bg-transparent p-3 backdrop:bg-slate-950/45 backdrop:backdrop-blur-[2px] lg:hidden"
      >
        <div className="surface-raised relative h-full overflow-y-auto rounded-panel p-4">
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="icon-well absolute right-4 top-4 h-9 w-9 text-ink-muted hover:text-brand"
          >
            <X className="h-4 w-4" />
          </button>
          <SidebarContent pathname={pathname} email={email} onSignOut={signOut} />
        </div>
      </dialog>
    </ToastProvider>
  );
}
