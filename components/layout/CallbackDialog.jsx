'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, LoaderCircle, PhoneCall, ShieldCheck, X } from 'lucide-react';
import { isCallbackSuppressed, markCallbackDone, msUntilCallbackDue, snoozeCallback } from '@/lib/callback';
import { isValidPhone } from '@/lib/inquiry';
import { CALLBACK_COPY } from '@/lib/seo/page-content';

const INPUT_ID = 'callback-phone';
const PHONE_ERROR = 'Enter a valid mobile number (10 digits, optionally with +91).';

const inputClass =
  'w-full h-12 rounded-control border bg-surface-raised px-4 text-sm text-ink shadow-neu-inset placeholder:text-ink-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/30';

function isExcludedPath(pathname) {
  return pathname === '/contact' || pathname.startsWith('/admin');
}

/** Another dialog is open or the visitor is typing somewhere, so opening now would interrupt them. */
function visitorIsBusy() {
  if (document.querySelector('dialog[open]')) return true;
  const active = document.activeElement;
  return Boolean(active && active.matches('input, textarea, select, [contenteditable="true"]'));
}

/** Asks first-time visitors for a mobile number 15 seconds into their visit; the number is emailed to the team. */
export default function CallbackDialog() {
  const pathname = usePathname() || '/';
  const dialogRef = useRef(null);
  const [due, setDue] = useState(false);
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const submitting = status === 'submitting';

  useEffect(() => {
    if (isCallbackSuppressed()) return undefined;
    const timer = setTimeout(() => setDue(true), msUntilCallbackDue());
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!due || open || isExcludedPath(pathname)) return undefined;
    const tryOpen = () => {
      if (isCallbackSuppressed()) {
        setDue(false);
        return true;
      }
      if (visitorIsBusy()) return false;
      setOpen(true);
      return true;
    };
    if (tryOpen()) return undefined;
    const poll = setInterval(() => {
      if (tryOpen()) clearInterval(poll);
    }, 1000);
    return () => clearInterval(poll);
  }, [due, open, pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
  }, [open]);

  // Escape, the close button and backdrop clicks all end in the native close event.
  function onClose() {
    if (status !== 'success') snoozeCallback();
    setOpen(false);
    setDue(false);
  }

  function close() {
    dialogRef.current?.close();
  }

  useEffect(() => {
    if (status !== 'success') return undefined;
    const timer = setTimeout(close, 3000);
    return () => clearTimeout(timer);
  }, [status]);

  async function onSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    if (!isValidPhone(phone)) {
      setError(PHONE_ERROR);
      document.getElementById(INPUT_ID)?.focus();
      return;
    }

    setError('');
    setStatus('submitting');
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, website, page: window.location.pathname }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error || 'Your number could not be sent. Please try again.');
        setStatus('idle');
        return;
      }
      markCallbackDone();
      setStatus('success');
    } catch {
      setError('Network error. Please check your connection and try again.');
      setStatus('idle');
    }
  }

  if (!due && !open) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      aria-labelledby="callback-title"
      aria-describedby="callback-text"
      className="mx-auto mb-0 mt-auto w-full max-w-none overflow-hidden rounded-t-panel border border-edge bg-surface-raised p-0 text-ink shadow-neu-lg backdrop:bg-slate-950/40 backdrop:backdrop-blur-[2px] transition-[opacity,translate] duration-300 ease-out starting:translate-y-6 starting:opacity-0 motion-reduce:transition-none sm:m-auto sm:w-[26rem] sm:max-w-[calc(100vw-2rem)] sm:rounded-panel"
    >
      <div className="relative p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-6">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="icon-well absolute right-4 top-4 h-9 w-9 text-ink-muted transition-colors hover:text-brand"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="icon-well h-11 w-11 text-brand">
          <PhoneCall className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </span>
        <h2 id="callback-title" className="mt-4 pr-10 text-xl font-bold tracking-tight text-ink">
          {CALLBACK_COPY.title}
        </h2>
        <p id="callback-text" className="mt-1.5 text-sm leading-relaxed text-ink-muted">
          {CALLBACK_COPY.text}
        </p>

        {status === 'success' ? (
          <p
            role="status"
            className="mt-5 rounded-control border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
          >
            {CALLBACK_COPY.success}
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-5 space-y-3">
            <div>
              <label htmlFor={INPUT_ID} className="mb-2 block text-sm font-medium text-ink">
                {CALLBACK_COPY.label}
              </label>
              <input
                id={INPUT_ID}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (error) setError('');
                }}
                placeholder={CALLBACK_COPY.placeholder}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? 'callback-error' : undefined}
                className={`${inputClass} ${error ? 'border-red-400' : 'border-edge'}`}
              />
              {error ? (
                <p id="callback-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                  {error}
                </p>
              ) : null}
            </div>

            <div className="hidden" aria-hidden>
              <label htmlFor="callback-website">Website</label>
              <input
                id="callback-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="group btn-primary h-12 w-full px-6 text-sm disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                <>
                  {CALLBACK_COPY.button}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            <p className="flex items-center gap-2 text-xs text-ink-muted">
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.75} aria-hidden />
              {CALLBACK_COPY.privacy}
            </p>
          </form>
        )}
      </div>
    </dialog>
  );
}
