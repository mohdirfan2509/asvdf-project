'use client';

import React, { useState } from 'react';
import { ArrowRight, Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import SectionFrame from '@/components/layout/SectionFrame';

const BG = 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1600&auto=format&fit=crop';

export default function ContactUs02({ settings = null }) {
  const phoneDigits = String(settings?.phone || '8074337407').replace(/\D/g, '').slice(-10);
  const displayPhone = `+91 ${phoneDigits.slice(0, 5)} ${phoneDigits.slice(5)}`;
  const wa = String(settings?.whatsapp || `91${phoneDigits}`).replace(/\D/g, '');
  const email = settings?.email || 'info@asvdf.com';
  const address = settings?.address || 'Hyderabad, Telangana, India';

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello ASVDF,\nName: ${formData.fullName}\nCompany: ${formData.companyName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n${formData.message}`
    );
    window.open(`https://wa.me/${wa}?text=${text}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <SectionFrame
      eyebrow="Contact"
      title="Let's build your"
      highlight="next floor."
      backgroundImage={BG}
      overlay="light"
    >
      <div className="h-full min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 overflow-hidden">
        <form
          onSubmit={onSubmit}
          className="lg:col-span-7 bg-white/95 rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm flex flex-col gap-2.5 sm:gap-3 min-h-0 overflow-y-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <Field label="Full name" name="fullName" value={formData.fullName} onChange={onChange} required />
            <Field label="Company" name="companyName" value={formData.companyName} onChange={onChange} />
            <Field label="Email" name="email" type="email" value={formData.email} onChange={onChange} required />
            <Field label="Phone" name="phone" value={formData.phone} onChange={onChange} required />
          </div>
          <div className="flex-1 min-h-0 flex flex-col">
            <label className="text-[11px] font-[600] text-slate-600 mb-1 block">Message</label>
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={onChange}
              className="w-full flex-1 min-h-[5.5rem] bg-[#F6F7FB] rounded-xl px-3 py-2.5 text-sm neu-inset border-0 focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
              placeholder="Tell us about your project…"
            />
          </div>
          <button
            type="submit"
            className="mt-1 inline-flex items-center justify-center gap-2 self-start text-white text-sm font-[600] px-5 py-3 rounded-xl neu-btn-primary"
          >
            <span>{sent ? 'Opening WhatsApp…' : 'Send message'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <aside className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3 content-start min-h-0 overflow-y-auto">
          <ContactCard icon={Phone} title="Call" value={displayPhone} href={`tel:+91${phoneDigits}`} />
          <ContactCard icon={MessageCircle} title="WhatsApp" value="Chat with us" href={`https://wa.me/${wa}`} external />
          <ContactCard icon={Mail} title="Email" value={email} href={`mailto:${email}`} />
          <ContactCard icon={MapPin} title="Office" value={address} />
        </aside>
      </div>
    </SectionFrame>
  );
}

function Field({ label, name, value, onChange, type = 'text', required }) {
  return (
    <div>
      <label className="text-[11px] font-[600] text-slate-600 mb-1 block">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-[#F6F7FB] rounded-xl px-3 py-2.5 text-sm neu-inset border-0 focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
    </div>
  );
}

function ContactCard({ icon: Icon, title, value, href, external }) {
  const inner = (
    <>
      <div className="w-10 h-10 rounded-full bg-[#F6F7FB] neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-[700] uppercase tracking-wider text-slate-400">{title}</p>
        <p className="text-sm font-[700] text-slate-900 truncate">{value}</p>
      </div>
    </>
  );
  const className =
    'bg-white/95 rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-sm flex items-center gap-3';
  if (!href) return <div className={className}>{inner}</div>;
  return (
    <a
      href={href}
      className={`${className} hover:border-purple-200 transition-colors`}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {inner}
    </a>
  );
}
