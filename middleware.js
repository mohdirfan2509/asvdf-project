import { NextResponse } from 'next/server';
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

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin') || pathname === '/admin/login') {
    return NextResponse.next();
  }

  if (envFirebaseReady()) {
    const session = request.cookies.get(SESSION_COOKIE)?.value;
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const token = request.cookies.get('asvdf_admin_session')?.value;
  if (token !== 'ok') {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
