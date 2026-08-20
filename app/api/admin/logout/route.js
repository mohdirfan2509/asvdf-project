import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE, SESSION_COOKIE } from '@/lib/admin/auth';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  cookieStore.set(COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  return NextResponse.json({ ok: true });
}
