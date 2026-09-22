'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getWhatsAppUrl, normalizePhone } from '@/lib/contact';

export default function QuoteForm({ settings, heading = 'Request a quotation' }) {
  const wa = normalizePhone(settings?.whatsapp || settings?.phone);
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
    const text = `Hello ASVDF,\nName: ${formData.fullName}\nCompany: ${formData.companyName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n${formData.message}`;
    window.open(getWhatsAppUrl(wa, text), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 neu-lg border border-white/80 flex flex-col gap-3"
    >
      <h2 className="text-xl sm:text-2xl font-[800] tracking-tight text-slate-900">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Full name" name="fullName" value={formData.fullName} onChange={onChange} required />
        <Field label="Company" name="companyName" value={formData.companyName} onChange={onChange} />
        <Field label="Email" name="email" type="email" value={formData.email} onChange={onChange} required />
        <Field label="Phone" name="phone" value={formData.phone} onChange={onChange} required />
      </div>
      <div>
        <label htmlFor="message" className="text-[11px] font-[600] text-slate-600 mb-1 block">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={onChange}
          className="w-full min-h-[7rem] bg-[#F6F7FB] rounded-xl px-3 py-2.5 text-sm neu-inset border-0 focus:outline-none focus:ring-2 focus:ring-purple-300 resize-y"
          placeholder="City, approximate area in sq.ft, warehouse / plant / commercial, and any drawings or load notes."
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 self-start text-white text-sm font-[600] px-5 py-3 rounded-xl neu-btn-primary"
      >
        <span>{sent ? 'Opening WhatsApp…' : 'Send on WhatsApp'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}

function Field({ label, name, value, onChange, type = 'text', required }) {
  return (
    <div>
      <label htmlFor={name} className="text-[11px] font-[600] text-slate-600 mb-1 block">
        {label}
      </label>
      <input
        id={name}
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
