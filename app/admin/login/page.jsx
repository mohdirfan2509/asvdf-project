import AdminLoginForm from '@/components/admin/AdminLoginForm';

export const metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main id="main" className="flex min-h-screen items-center justify-center bg-surface p-4">
      <AdminLoginForm />
    </main>
  );
}
