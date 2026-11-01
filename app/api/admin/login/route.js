import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, checkAdminPassword, createFirebaseSessionCookie } from '@/lib/admin/auth';
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminSessionToken,
  isPasswordLoginConfigured,
} from '@/lib/admin/session';
import { isFirebaseConfigured, isFirebaseAdminConfigured, SESSION_EXPIRES_MS } from '@/lib/firebase/config';
import { clientIp, rateLimit } from '@/lib/rate-limit';

const RATE_LIMIT = { limit: 5, windowMs: 15 * 60 * 1000 };

export async function POST(request) {
  const limited = rateLimit(`admin-login:${clientIp(request)}`, RATE_LIMIT);
  if (!limited.allowed) {
    return NextResponse.json(
      { error: 'Too many sign-in attempts. Please wait a few minutes and try again.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSeconds) } }
    );
  }

  const body = await request.json().catch(() => ({}));
  const cookieStore = await cookies();

  // Firebase: the client signs in with email/password and sends its ID token.
  if (isFirebaseConfigured() && isFirebaseAdminConfigured()) {
    if (!body.idToken) {
      return NextResponse.json({ error: 'Missing sign-in token.' }, { status: 400 });
    }
    try {
      const sessionCookie = await createFirebaseSessionCookie(body.idToken);
      cookieStore.set(SESSION_COOKIE, sessionCookie, adminCookieOptions(SESSION_EXPIRES_MS / 1000));
      return NextResponse.json({ ok: true, mode: 'firebase' });
    } catch (err) {
      return NextResponse.json(
        { error: err.status === 403 ? err.message : 'Wrong email or password.' },
        { status: err.status || 401 }
      );
    }
  }

  if (!isPasswordLoginConfigured()) {
    console.error('Admin login disabled: set ADMIN_PASSWORD (12+ characters) and ADMIN_SESSION_SECRET (32+ characters).');
    return NextResponse.json({ error: 'Admin sign-in is not set up on this server.' }, { status: 503 });
  }

  if (!checkAdminPassword(body.password)) {
    return NextResponse.json({ error: 'Wrong password.' }, { status: 401 });
  }

  cookieStore.set(ADMIN_COOKIE, await createAdminSessionToken(), adminCookieOptions());
  return NextResponse.json({ ok: true, mode: 'local' });
}
