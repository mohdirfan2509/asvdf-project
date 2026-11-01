import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/lib/admin/auth';
import { ADMIN_COOKIE, adminCookieOptions } from '@/lib/admin/session';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, '', adminCookieOptions(0));
  cookieStore.set(ADMIN_COOKIE, '', adminCookieOptions(0));
  return NextResponse.json({ ok: true });
}
