import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifyAdminSessionToken } from '@/lib/admin/session';
import { SESSION_COOKIE } from '@/lib/firebase/config';

function envFirebaseReady() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '';
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '';
  const email = process.env.FIREBASE_CLIENT_EMAIL || '';
  return Boolean(
    projectId &&
      apiKey &&
      email &&
      !projectId.includes('your-project') &&
      !apiKey.includes('your-api') &&
      !email.includes('your-')
  );
}

function toLogin(request) {
  const url = request.nextUrl.clone();
  url.pathname = '/admin/login';
  return NextResponse.redirect(url);
}

/**
 * First gate for /admin pages. Firebase session cookies can only be verified with firebase-admin (Node),
 * so here they are checked for presence; the panel layout and every admin API verify them fully.
 */
export async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname === '/admin/login') return NextResponse.next();

  if (envFirebaseReady()) {
    return request.cookies.get(SESSION_COOKIE)?.value ? NextResponse.next() : toLogin(request);
  }

  const valid = await verifyAdminSessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
  return valid ? NextResponse.next() : toLogin(request);
}

export const config = {
  matcher: ['/admin/:path*'],
};
