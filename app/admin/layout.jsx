export const metadata = {
  title: { default: 'Admin', template: '%s | ASVDF Admin' },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return <div className="min-h-screen bg-surface text-ink">{children}</div>;
}
