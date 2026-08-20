import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  COOKIE,
  SESSION_COOKIE,
  createFirebaseSessionCookie,
  localAdminLogin,
} from '@/lib/admin/auth';
import {
  isFirebaseConfigured,
  isFirebaseAdminConfigured,
  SESSION_EXPIRES_MS,
} from '@/lib/firebase/config';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, password, idToken } = body;

    // Firebase: client sends idToken after signInWithEmailAndPassword
    if (isFirebaseConfigured() && isFirebaseAdminConfigured()) {
      if (!idToken) {
        return NextResponse.json(
          { error: 'Missing Firebase idToken. Sign in with email/password on the client first.' },
          { status: 400 }
        );
      }
      try {
        const sessionCookie = await createFirebaseSessionCookie(idToken);
        const cookieStore = await cookies();
        cookieStore.set(SESSION_COOKIE, sessionCookie, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: SESSION_EXPIRES_MS / 1000,
        });
        return NextResponse.json({ ok: true, mode: 'firebase', email });
      } catch (err) {
        return NextResponse.json(
          { error: err.message || 'Invalid token' },
          { status: 401 }
        );
      }
    }

    // Local fallback
    const ok = await localAdminLogin(password);
    if (!ok) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set(COOKIE, 'ok', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ ok: true, mode: 'local' });
  } catch (err) {
    console.error('Admin login failed:', err);
    return NextResponse.json(
      { error: err.message || 'Login failed. Check server configuration.' },
      { status: 500 }
    );
  }
}
