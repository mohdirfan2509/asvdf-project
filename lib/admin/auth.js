import { createHash, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { getAdminAuth } from '@/lib/firebase/admin';
import {
  isFirebaseConfigured,
  isFirebaseAdminConfigured,
  SESSION_COOKIE,
  SESSION_EXPIRES_MS,
} from '@/lib/firebase/config';
import { ADMIN_COOKIE, verifyAdminSessionToken } from './session';

/**
 * Comma-separated ADMIN_EMAILS lists the Firebase accounts that may use the admin panel. Anyone can create a
 * Firebase account with the public web config, so an empty list admits nobody rather than everybody.
 */
export function isAllowedAdminEmail(email) {
  const allowed = String(process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return Boolean(email) && allowed.includes(String(email).toLowerCase());
}

export async function getAdminSession() {
  const cookieStore = await cookies();

  if (isFirebaseConfigured() && isFirebaseAdminConfigured()) {
    const session = cookieStore.get(SESSION_COOKIE)?.value;
    if (!session) return { authenticated: false, mode: 'firebase' };
    try {
      const decoded = await getAdminAuth().verifySessionCookie(session, true);
      if (!isAllowedAdminEmail(decoded.email)) return { authenticated: false, mode: 'firebase' };
      return {
        authenticated: true,
        user: { uid: decoded.uid, email: decoded.email },
        mode: 'firebase',
      };
    } catch {
      return { authenticated: false, mode: 'firebase' };
    }
  }

  return {
    authenticated: await verifyAdminSessionToken(cookieStore.get(ADMIN_COOKIE)?.value),
    mode: 'local',
  };
}

/** Verifies the Firebase ID token (and the ADMIN_EMAILS allow-list) before minting a session cookie. */
export async function createFirebaseSessionCookie(idToken) {
  const auth = getAdminAuth();
  if (!auth) throw new Error('Firebase Admin not configured');
  const decoded = await auth.verifyIdToken(idToken, true);
  if (!isAllowedAdminEmail(decoded.email)) {
    const err = new Error('This account is not allowed to use the admin panel.');
    err.status = 403;
    throw err;
  }
  return auth.createSessionCookie(idToken, { expiresIn: SESSION_EXPIRES_MS });
}

/** Constant-time comparison against ADMIN_PASSWORD (hashing first equalises the lengths). */
export function checkAdminPassword(password) {
  const expected = String(process.env.ADMIN_PASSWORD || '');
  if (!expected || typeof password !== 'string') return false;
  const digest = (value) => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(password), digest(expected));
}

export { SESSION_COOKIE };
