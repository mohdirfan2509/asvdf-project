import { cookies } from 'next/headers';
import { getAdminAuth } from '@/lib/firebase/admin';
import {
  isFirebaseConfigured,
  isFirebaseAdminConfigured,
  SESSION_COOKIE,
  SESSION_EXPIRES_MS,
} from '@/lib/firebase/config';

const LOCAL_COOKIE = 'asvdf_admin_session';
const LOCAL_PASSWORD = process.env.ADMIN_PASSWORD || 'asvdf-admin-2026';

export async function getAdminSession() {
  // Firebase session cookie
  if (isFirebaseConfigured() && isFirebaseAdminConfigured()) {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE)?.value;
    if (!session) return { authenticated: false, mode: 'firebase' };
    try {
      const auth = getAdminAuth();
      const decoded = await auth.verifySessionCookie(session, true);
      return {
        authenticated: true,
        user: { uid: decoded.uid, email: decoded.email },
        mode: 'firebase',
      };
    } catch {
      return { authenticated: false, mode: 'firebase' };
    }
  }

  // Local password fallback (dev without Firebase)
  const cookieStore = await cookies();
  const token = cookieStore.get(LOCAL_COOKIE)?.value;
  return {
    authenticated: token === 'ok',
    mode: 'local',
  };
}

export async function createFirebaseSessionCookie(idToken) {
  const auth = getAdminAuth();
  if (!auth) throw new Error('Firebase Admin not configured');
  return auth.createSessionCookie(idToken, { expiresIn: SESSION_EXPIRES_MS });
}

export async function localAdminLogin(password) {
  return password === LOCAL_PASSWORD;
}

export { LOCAL_COOKIE as COOKIE, LOCAL_PASSWORD, SESSION_COOKIE };
