'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getClientAuth } from '@/lib/firebase/client';

const firebaseReady = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes('your-api')
);

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let payload = { email, password };

      if (firebaseReady) {
        const auth = getClientAuth();
        if (!auth) throw new Error('Login service not ready');
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await cred.user.getIdToken();
        payload = { email, idToken };
      }

      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Wrong email or password');

      router.replace('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Could not sign in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm bg-white border border-zinc-200 rounded-lg p-7 sm:p-8 space-y-4"
    >
      <div className="mb-1">
        <div className="w-10 h-10 rounded-md bg-zinc-900 text-white flex items-center justify-center text-xs font-semibold tracking-wide mb-4">
          AS
        </div>
        <h1 className="text-xl font-semibold text-zinc-900 tracking-tight">Sign in</h1>
        <p className="text-sm text-zinc-500 mt-1">ASVDF website admin</p>
      </div>

      <div>
        <label className="text-xs font-medium text-zinc-600 block mb-1.5">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@company.com"
          required={firebaseReady}
          className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-zinc-600 block mb-1.5">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900"
        />
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 text-red-700 px-3 py-2.5 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-zinc-900 text-white rounded-md py-2.5 text-sm font-medium hover:bg-zinc-800 disabled:opacity-60"
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
