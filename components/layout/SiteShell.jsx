import Navbar from '@/components/layout/Navbar';
import MobileContactBar from '@/components/layout/MobileContactBar';
import FloatingContact from '@/components/layout/FloatingContact';

export default function SiteShell({ settings, activePath = '/', children }) {
  return (
    <div className="min-h-screen w-full bg-[#EBECF0] font-['Poppins'] antialiased text-slate-900 selection:bg-purple-600 selection:text-white">
      <div className="sticky top-0 z-40 px-3 sm:px-4 pt-3 sm:pt-4 pb-2 bg-[#EBECF0]/85 backdrop-blur-md">
        <Navbar settings={settings} activePath={activePath} />
      </div>
      <main className="max-w-[1440px] w-full mx-auto px-3 sm:px-4 pb-28 md:pb-10">{children}</main>
      <MobileContactBar settings={settings} />
      <FloatingContact settings={settings} />
    </div>
  );
}
