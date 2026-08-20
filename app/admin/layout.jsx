export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return <div className="min-h-screen bg-zinc-100">{children}</div>;
}
