import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/content/queries';
import { isEmailConfigured, sendEnquiryNotification } from '@/lib/email';
import { validateInquiry } from '@/lib/inquiry';
import { clientIp, rateLimit } from '@/lib/rate-limit';

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };
const SEND_FAILED = 'We could not send your message right now. Please call or WhatsApp us instead.';

/** Contact-form enquiries are not stored; the notification email is the only record, so a failed send is reported. */
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

  const limited = rateLimit(`contact:${clientIp(request)}`, RATE_LIMIT);
  if (!limited.allowed) {
    return NextResponse.json(
      { error: 'Too many messages in a short time. Please try again later, or call or WhatsApp us.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfterSeconds) } }
    );
  }

  const { value, errors, valid } = validateInquiry(body);
  if (!valid) {
    return NextResponse.json({ error: 'Please correct the highlighted fields.', errors }, { status: 422 });
  }

  if (!isEmailConfigured()) {
    console.error('Contact enquiry not sent: RESEND_API_KEY is not set.');
    return NextResponse.json({ error: SEND_FAILED }, { status: 503 });
  }

  const enquiry = {
    full_name: value.fullName,
    company_name: value.companyName,
    email: value.email,
    phone: value.phone,
    service: value.service,
    location: value.location,
    message: value.message,
    created_at: new Date().toISOString(),
  };

  try {
    const settings = await getSiteSettings();
    await sendEnquiryNotification(enquiry, process.env.CONTACT_NOTIFY_TO || settings.email);
  } catch (err) {
    console.error('Enquiry email could not be sent:', err.message);
    return NextResponse.json({ error: SEND_FAILED }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
