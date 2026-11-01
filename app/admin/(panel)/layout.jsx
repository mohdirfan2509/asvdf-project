import { redirect } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import { getAdminSession } from '@/lib/admin/auth';

export default async function AdminPanelLayout({ children }) {
  const session = await getAdminSession();
  if (!session.authenticated) {
    redirect('/admin/login');
  }

  return <AdminShell email={session.user?.email}>{children}</AdminShell>;
}
