'use client';

import { useRef, useState } from 'react';
import { ArrowRight, ChevronDown, LoaderCircle, ShieldCheck } from 'lucide-react';
import { validateInquiry } from '@/lib/inquiry';

export const CONTACT_FORM_ID = 'contact-form';
export const CONTACT_NAME_FIELD_ID = 'contact-fullName';

const EMPTY = { fullName: '', companyName: '', email: '', phone: '', service: '', location: '', message: '', website: '' };

const inputClass =
  'w-full h-12 rounded-control border bg-surface-raised px-4 text-sm text-ink shadow-neu-inset placeholder:text-ink-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/30';

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-red-600" aria-hidden> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ContactForm({ heading, services = [], privacyTitle, privacyText }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const submitting = status.state === 'submitting';
  const formRef = useRef(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const focusFirstError = (fieldErrors) => {
    const first = Object.keys(fieldErrors).find((key) => fieldErrors[key]);
    if (first) formRef.current?.querySelector(`[name="${first}"]`)?.focus();
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    const { errors: fieldErrors, valid } = validateInquiry(values);
    if (!valid) {
      setErrors(fieldErrors);
      setStatus({ state: 'idle', message: '' });
      focusFirstError(fieldErrors);
      return;
    }

    setErrors({});
    setStatus({ state: 'submitting', message: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
          focusFirstError(data.errors);
        }
        setStatus({ state: 'error', message: data.error || 'Your message could not be sent. Please try again.' });
        return;
      }
      setValues(EMPTY);
      setStatus({
        state: 'success',
        message: 'Thank you. Your enquiry has been received and our team will contact you shortly.',
      });
    } catch {
      setStatus({ state: 'error', message: 'Network error. Please check your connection and try again.' });
    }
  }

  const describedBy = (name) => (errors[name] ? `contact-${name}-error` : undefined);
  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': describedBy(name),
    className: `${inputClass} ${errors[name] ? 'border-red-400' : 'border-white/80'}`,
  });

  return (
    <div id={CONTACT_FORM_ID} className="scroll-mt-28">
      <h2 className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-ink">{heading}</h2>

      <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-6 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        <Field id="contact-fullName" label="Full Name" required error={errors.fullName}>
          <input {...fieldProps('fullName')} type="text" autoComplete="name" placeholder="Enter your full name" required />
        </Field>
        <Field id="contact-companyName" label="Company Name" error={errors.companyName}>
          <input {...fieldProps('companyName')} type="text" autoComplete="organization" placeholder="Enter company name" />
        </Field>
        <Field id="contact-email" label="Email Address" required error={errors.email}>
          <input {...fieldProps('email')} type="email" autoComplete="email" placeholder="Enter your email" required />
        </Field>
        <Field id="contact-phone" label="Phone Number" required error={errors.phone}>
          <input {...fieldProps('phone')} type="tel" autoComplete="tel" placeholder="Enter your phone number" required />
        </Field>
        <Field id="contact-service" label="Service Required" required error={errors.service}>
          <div className="relative">
            <select {...fieldProps('service')} required className={`${fieldProps('service').className} appearance-none pr-10 ${values.service ? '' : 'text-ink-muted/70'}`}>
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service) => (
                <option key={service} value={service} className="text-ink">
                  {service}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
          </div>
        </Field>
        <Field id="contact-location" label="Project Location" error={errors.location}>
          <input {...fieldProps('location')} type="text" placeholder="Enter project location" />
        </Field>
        <div className="sm:col-span-2">
          <Field id="contact-message" label="Message" required error={errors.message}>
            <textarea {...fieldProps('message')} rows={4} placeholder="Tell us about your project..." required className={`${fieldProps('message').className} h-auto min-h-[7rem] resize-y py-3`} />
          </Field>
        </div>

        <div className="hidden" aria-hidden>
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
        </div>

        <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <button type="submit" disabled={submitting} aria-busy={submitting} className="group btn-primary h-12 w-full sm:w-auto sm:min-w-[13rem] px-6 text-sm disabled:opacity-70">
            {submitting ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
                Sending…
              </>
            ) : (
              <>
                Send Message
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </>
            )}
          </button>
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 shrink-0 text-brand" strokeWidth={1.5} aria-hidden />
            <p className="text-sm leading-snug text-ink-muted">
              <span className="block text-ink">{privacyTitle}</span>
              {privacyText}
            </p>
          </div>
        </div>

      </form>

      <div aria-live="polite" className="mt-5 empty:mt-0">
        {status.state === 'success' ? (
          <p className="rounded-control border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">{status.message}</p>
        ) : null}
        {status.state === 'error' ? (
          <p role="alert" className="rounded-control border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{status.message}</p>
        ) : null}
      </div>
    </div>
  );
}
