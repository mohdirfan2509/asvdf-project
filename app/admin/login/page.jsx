import AdminLoginForm from '@/components/admin/AdminLoginForm';

export const metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">
      <AdminLoginForm />
    </div>
  );
}
