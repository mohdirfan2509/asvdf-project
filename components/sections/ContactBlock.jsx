'use client';

import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { formatDisplayPhone, getTelUrl, getWhatsAppUrl } from '@/lib/contact';

export default function ContactBlock({ settings, showForm = true }) {
  const phone = settings?.phone || '9063222804';
  const whatsapp = settings?.whatsapp || phone;

  return (
    <div className="flex flex-col gap-4">
      <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80">
        <p className="text-[10px] font-[700] tracking-widest text-[#7C3AED] uppercase mb-1">Get in touch</p>
        <h2 className="text-2xl sm:text-3xl font-[800] tracking-tight text-slate-900 mb-2">Contact ASVDF</h2>
        <p className="text-sm text-slate-600 mb-5">Tap WhatsApp or Call — we respond quickly on mobile.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <a
            href={getWhatsAppUrl(whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-[#25D366] text-white p-4 font-[600]"
          >
            <MessageCircle className="w-6 h-6" />
            <div>
              <div className="text-sm">WhatsApp Chat</div>
              <div className="text-xs opacity-90">{formatDisplayPhone(phone)}</div>
            </div>
          </a>
          <a href={getTelUrl(phone)} className="flex items-center gap-3 rounded-2xl neu-btn-primary text-white p-4 font-[600]">
            <Phone className="w-6 h-6" />
            <div>
              <div className="text-sm">Call Now</div>
              <div className="text-xs opacity-90">{formatDisplayPhone(phone)}</div>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
          {settings?.email && (
            <a href={`mailto:${settings.email}`} className="flex items-center gap-2 bg-[#F6F7FB] rounded-xl p-3 neu-inset">
              <Mail className="w-4 h-4 text-[#7C3AED]" /> {settings.email}
            </a>
          )}
          {settings?.address && (
            <div className="flex items-center gap-2 bg-[#F6F7FB] rounded-xl p-3 neu-inset">
              <MapPin className="w-4 h-4 text-[#7C3AED]" /> {settings.address}
            </div>
          )}
        </div>
      </section>

      {showForm && (
        <section className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80">
          <h3 className="text-lg font-[800] text-slate-900 mb-3">Request a quote</h3>
          <p className="text-xs text-slate-500 mb-4">
            Prefer chat? Use WhatsApp above for the fastest response. Or leave details and we will call you back.
          </p>
          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(getWhatsAppUrl(whatsapp, 'Hi ASVDF, I submitted a quote request from the website.'), '_blank');
            }}
          >
            <input required name="name" placeholder="Full name" className="bg-[#F6F7FB] neu-inset rounded-xl px-3.5 py-3 text-sm" />
            <input required name="phone" placeholder="Phone number" className="bg-[#F6F7FB] neu-inset rounded-xl px-3.5 py-3 text-sm" />
            <input name="email" type="email" placeholder="Email" className="bg-[#F6F7FB] neu-inset rounded-xl px-3.5 py-3 text-sm sm:col-span-2" />
            <textarea name="message" rows={4} placeholder="Project details" className="bg-[#F6F7FB] neu-inset rounded-xl px-3.5 py-3 text-sm sm:col-span-2 resize-none" />
            <button type="submit" className="sm:col-span-2 neu-btn-primary text-white rounded-xl py-3.5 text-sm font-[600]">
              Send via WhatsApp
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
