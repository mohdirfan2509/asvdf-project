/**
 * Signed admin session for password login (used when Firebase is not configured).
 * Edge-safe (jose only), so middleware and server routes verify the same token.
 */
import { SignJWT, jwtVerify } from 'jose';

export const ADMIN_COOKIE = 'asvdf_admin_session';
export const ADMIN_SESSION_MAX_AGE = 7 * 24 * 60 * 60; // seconds

const MIN_PASSWORD_LENGTH = 12;
const MIN_SECRET_LENGTH = 32;
const ISSUER = 'asvdf-admin';

function secretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET || '';
  return secret.length >= MIN_SECRET_LENGTH ? new TextEncoder().encode(secret) : null;
}

/** Password login is available only with a 12+ character ADMIN_PASSWORD and a 32+ character ADMIN_SESSION_SECRET. */
export function isPasswordLoginConfigured() {
  return Boolean(secretKey()) && String(process.env.ADMIN_PASSWORD || '').length >= MIN_PASSWORD_LENGTH;
}

export async function createAdminSessionToken() {
  const key = secretKey();
  if (!key) throw new Error('ADMIN_SESSION_SECRET is not configured.');
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(ISSUER)
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_MAX_AGE}s`)
    .sign(key);
}

export async function verifyAdminSessionToken(token) {
  const key = secretKey();
  if (!token || !key) return false;
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'], issuer: ISSUER });
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

/** Cookie options shared by login (set) and logout (clear). */
export function adminCookieOptions(maxAge = ADMIN_SESSION_MAX_AGE) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge,
  };
}
