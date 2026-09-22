import Link from 'next/link';
import { PRIMARY_NAV, SERVICE_NAV } from '@/lib/seo/routes';
import { BRAND_NAME } from '@/lib/seo/site';
import { COMPANY, SERVICE_AREAS, mapsUrl } from '@/lib/seo/company';
import { formatDisplayPhone, getTelUrl } from '@/lib/contact';

export default function CrawlableFooter({ settings }) {
  const phone = settings?.phone;
  const email = settings?.email;
  const address = settings?.address || COMPANY.address;
  const legal = settings?.legal_name || COMPANY.legalName;
  const gstin = settings?.gstin || COMPANY.gstin;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 neu-lg border border-white/80">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div>
          <p className="font-[800] text-slate-900 mb-1">{settings?.company_name || BRAND_NAME}</p>
          <p className="text-xs text-slate-500 mb-2">{legal}</p>
          <p className="text-sm text-slate-500 leading-relaxed">
            VDF and industrial flooring from Shamshabad, Hyderabad. Service areas: Telangana, Andhra Pradesh,
            Karnataka, Maharashtra, Odisha, and Chennai.
          </p>
        </div>
        <div>
          <p className="text-[10px] font-[700] tracking-widest uppercase text-[#7C3AED] mb-2">Explore</p>
          <ul className="space-y-1.5 text-sm font-[600] text-slate-700">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[#7C3AED]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-[700] tracking-widest uppercase text-[#7C3AED] mb-2">Services</p>
          <ul className="space-y-1.5 text-sm font-[600] text-slate-700">
            {SERVICE_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[#7C3AED]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-[700] tracking-widest uppercase text-[#7C3AED] mb-2">Contact</p>
          <ul className="space-y-1.5 text-sm text-slate-700">
            {phone ? (
              <li>
                <a href={getTelUrl(phone)} className="font-[600] hover:text-[#7C3AED]">
                  {formatDisplayPhone(phone)}
                </a>
              </li>
            ) : null}
            {email ? (
              <li>
                <a href={`mailto:${email}`} className="font-[600] hover:text-[#7C3AED]">
                  {email}
                </a>
              </li>
            ) : null}
            <li>
              <a
                href={mapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-[#7C3AED]"
              >
                {address}
              </a>
            </li>
            <li className="text-slate-500">GSTIN {gstin}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 pt-4 mb-3">
        <p className="text-[10px] font-[700] tracking-widest uppercase text-[#7C3AED] mb-2">Service areas</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-[600] text-slate-700">
          {SERVICE_AREAS.map((area) => (
            <li key={area.path}>
              <Link href={area.path} className="hover:text-[#7C3AED]">
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-[11px] text-slate-400">
        © {year} {legal}. All rights reserved.
      </p>
    </footer>
  );
}
