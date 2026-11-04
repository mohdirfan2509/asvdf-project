'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Eye, EyeOff, LoaderCircle, LogIn } from 'lucide-react';
import { inputClass } from '@/components/admin/ui';
import { getClientAuth } from '@/lib/firebase/client';

const FIREBASE_ERRORS = {
  'auth/invalid-credential': 'Wrong email or password.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/too-many-requests': 'Too many sign-in attempts. Please wait a few minutes and try again.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
};

/** With Firebase configured, signs in with Firebase first and sends its ID token; otherwise sends the password. */
async function credentialsFor(email, password) {
  const auth = getClientAuth();
  if (!auth) return { email, password };
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return { idToken: await user.getIdToken() };
}

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(await credentialsFor(email, password)),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not sign in. Please try again.');
      router.replace('/admin');
      router.refresh();
    } catch (err) {
      const message = FIREBASE_ERRORS[err.code] || (err.code?.startsWith('auth/') ? 'Could not sign in. Please try again.' : err.message);
      setError(message === 'Failed to fetch' ? 'Network error. Check your connection and try again.' : message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="surface-raised w-full max-w-sm rounded-panel p-7 shadow-neu-lg sm:p-8">
      <div className="flex flex-col items-center text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/asvdf-logo-sm.webp" alt="AS VDF Flooring" width={240} height={160} className="h-16 w-auto rounded-[12px] bg-black object-contain" />
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink">Welcome back</h1>
        <p className="mt-1 text-sm text-ink-muted">Sign in to manage the ASVDF website</p>
      </div>

      <div className="mt-7 space-y-4">
        <div>
          <label htmlFor="admin-email" className="mb-1.5 block text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="admin-password" className="mb-1.5 block text-sm font-semibold text-ink">
            Password
          </label>
          <div className="relative">
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className={`${inputClass} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              className="absolute right-1.5 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-brand"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error ? (
          <div role="alert" className="rounded-control border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </div>
        ) : null}

        <button type="submit" disabled={loading} className="btn-primary h-12 w-full text-sm disabled:opacity-70">
          {loading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> : <LogIn className="h-4 w-4" aria-hidden />}
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </div>

      <a href="/" className="mt-6 block text-center text-sm font-medium text-ink-muted transition-colors hover:text-brand">
        ← Back to website
      </a>
    </form>
  );
}
