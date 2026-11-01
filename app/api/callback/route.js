import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/content/queries';
import { isEmailConfigured, sendCallbackNotification } from '@/lib/email';
import { isValidPhone } from '@/lib/inquiry';
import { clientIp, rateLimit } from '@/lib/rate-limit';

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };
const SEND_FAILED = 'We could not send your number right now. Please call or WhatsApp us instead.';

/** Accepts only a same-site path such as "/vdf-flooring"; anything else is dropped from the email. */
function pagePath(value) {
  const path = String(value ?? '').trim();
  return /^\/(?!\/)[\w\-./]{0,200}$/.test(path) ? path : '';
}

/** Callback requests are not stored; the notification email is the only record, so a failed send is reported. */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real visitors never fill the hidden "website" field.
  if (body?.website) {
    return NextResponse.json({ ok: true });
  }

  const limited = rateLimit(`callback:${clientIp(request)}`, RATE_LIMIT);
  if (!limited.allowed) {
    return NextResponse.json(
      { error: 'Too many requests in a short time. Please try again later, or call or WhatsApp us.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSeconds) } }
    );
  }

  const phone = String(body?.phone ?? '').trim().slice(0, 30);
  if (!isValidPhone(phone)) {
    return NextResponse.json(
      { error: 'Enter a valid mobile number (10 digits, optionally with +91).' },
      { status: 422 }
    );
  }

  if (!isEmailConfigured()) {
    console.error('Callback request not sent: RESEND_API_KEY is not set.');
    return NextResponse.json({ error: SEND_FAILED }, { status: 503 });
  }

  const path = pagePath(body?.page);
  const callback = {
    phone,
    page_url: path ? `${request.nextUrl.origin}${path}` : '',
    created_at: new Date().toISOString(),
  };

  try {
    const settings = await getSiteSettings();
    await sendCallbackNotification(callback, process.env.CONTACT_NOTIFY_TO || settings.email);
  } catch (err) {
    console.error('Callback email could not be sent:', err.message);
    return NextResponse.json({ error: SEND_FAILED }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
