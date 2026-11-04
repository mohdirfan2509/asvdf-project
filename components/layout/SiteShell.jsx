import Navbar from '@/components/layout/Navbar';
import MobileContactBar from '@/components/layout/MobileContactBar';
import FloatingContact from '@/components/layout/FloatingContact';

/** `searchData` ({ blogs, projects }) adds a page's CMS items to the header search. */
export default function SiteShell({ settings, activePath = '/', searchData, children }) {
  return (
    <div className="min-h-screen w-full bg-surface font-sans antialiased text-ink selection:bg-brand-solid selection:text-white">
      <div className="pointer-events-none sticky top-0 z-40 px-3 sm:px-4 py-2 lg:py-3 [&>*]:pointer-events-auto">
        <Navbar settings={settings} activePath={activePath} searchData={searchData} />
      </div>
      <main id="main" className="max-w-[1440px] w-full mx-auto px-3 sm:px-4 pt-2 pb-20 md:pb-10">{children}</main>
      <MobileContactBar settings={settings} />
      <FloatingContact settings={settings} />
    </div>
  );
}
