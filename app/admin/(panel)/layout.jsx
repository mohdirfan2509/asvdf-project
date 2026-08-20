import { redirect } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';
import { getAdminSession } from '@/lib/admin/auth';

export default async function AdminPanelLayout({ children }) {
  const session = await getAdminSession();
  if (!session.authenticated) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="sticky top-0 z-30 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-zinc-900 tracking-tight">Control Tower</p>
            <p className="text-xs text-zinc-500 mt-0.5">Edit content that appears on the website</p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center rounded-md border border-zinc-300 bg-white text-zinc-800 text-sm font-medium px-3.5 py-2 hover:bg-zinc-50"
          >
            View live site
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-3 sm:p-5 flex flex-col lg:flex-row gap-4">
        <AdminNav />
        <main className="flex-1 min-w-0 pb-10">{children}</main>
      </div>
    </div>
  );
}
