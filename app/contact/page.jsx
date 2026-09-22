import { Mail, MapPin, Phone } from 'lucide-react';
import SiteShell from '@/components/layout/SiteShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CrawlableFooter from '@/components/layout/CrawlableFooter';
import QuoteForm from '@/components/marketing/QuoteForm';
import RelatedLinks from '@/components/marketing/RelatedLinks';
import { getSiteSettings } from '@/lib/content/queries';
import { buildMetadata } from '@/lib/seo/metadata';
import { CONTACT_COPY } from '@/lib/seo/page-content';
import { COMPANY, SERVICE_AREAS, mapsUrl } from '@/lib/seo/company';
import { graph, organizationNode, breadcrumbNode } from '@/lib/seo/schema';
import { formatDisplayPhone, getTelUrl, getWhatsAppUrl } from '@/lib/contact';

export const revalidate = 60;

export async function generateMetadata() {
  return buildMetadata({
    title: CONTACT_COPY.title,
    description: CONTACT_COPY.description,
    path: '/contact',
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];
  const jsonLd = graph([organizationNode(settings), breadcrumbNode(breadcrumbs)]);
  const phone = settings.phone;
  const email = settings.email;
  const address = settings.address || COMPANY.address;
  const legal = settings.legal_name || COMPANY.legalName;
  const gstin = settings.gstin || COMPANY.gstin;
  const pan = settings.pan || COMPANY.pan;

  return (
    <SiteShell settings={settings} activePath="/contact">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={breadcrumbs} />
      <article className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 neu-lg border border-white/80 mb-4">
        <h1 className="text-3xl sm:text-4xl font-[800] tracking-tight text-slate-900 mb-3">{CONTACT_COPY.h1}</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{CONTACT_COPY.intro}</p>
      </article>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        <div className="lg:col-span-7">
          <QuoteForm settings={settings} />
        </div>
        <aside className="lg:col-span-5 space-y-3">
          {phone ? (
            <a href={getTelUrl(phone)} className="flex items-center gap-3 bg-white rounded-2xl p-4 neu-lg border border-white/80">
              <Phone className="w-5 h-5 text-[#7C3AED]" />
              <div>
                <p className="text-[10px] font-[700] uppercase tracking-wider text-slate-400">Call</p>
                <p className="text-sm font-[700] text-slate-900">{formatDisplayPhone(phone)}</p>
              </div>
            </a>
          ) : null}
          {phone ? (
            <a
              href={getWhatsAppUrl(settings.whatsapp || phone)}
              className="flex items-center gap-3 bg-white rounded-2xl p-4 neu-lg border border-white/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone className="w-5 h-5 text-[#25D366]" />
              <div>
                <p className="text-[10px] font-[700] uppercase tracking-wider text-slate-400">WhatsApp</p>
                <p className="text-sm font-[700] text-slate-900">Chat with us</p>
              </div>
            </a>
          ) : null}
          {email ? (
            <a href={`mailto:${email}`} className="flex items-center gap-3 bg-white rounded-2xl p-4 neu-lg border border-white/80">
              <Mail className="w-5 h-5 text-[#7C3AED]" />
              <div>
                <p className="text-[10px] font-[700] uppercase tracking-wider text-slate-400">Email</p>
                <p className="text-sm font-[700] text-slate-900">{email}</p>
              </div>
            </a>
          ) : null}
          {address ? (
            <a
              href={mapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 bg-white rounded-2xl p-4 neu-lg border border-white/80"
            >
              <MapPin className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-[700] uppercase tracking-wider text-slate-400">Registered office</p>
                <p className="text-sm font-[700] text-slate-900 leading-relaxed">{address}</p>
              </div>
            </a>
          ) : null}
          <div className="bg-white rounded-2xl p-4 neu-lg border border-white/80">
            <p className="text-[10px] font-[700] uppercase tracking-wider text-slate-400 mb-1">Legal name</p>
            <p className="text-sm font-[700] text-slate-900">{legal}</p>
            <p className="text-xs text-slate-500 mt-2">GSTIN {gstin}</p>
            <p className="text-xs text-slate-500">PAN {pan}</p>
          </div>
        </aside>
      </div>
      <div className="mb-4">
        <RelatedLinks
          heading="Service areas"
          links={SERVICE_AREAS.map((area) => ({ href: area.path, label: `VDF flooring in ${area.name}` }))}
        />
      </div>
      <CrawlableFooter settings={settings} />
    </SiteShell>
  );
}
