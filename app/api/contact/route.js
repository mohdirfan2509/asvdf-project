import { NextResponse } from 'next/server';
import { isFirebaseConfigured, isFirebaseAdminConfigured } from '@/lib/firebase/config';
import { firestoreUpsert } from '@/lib/firebase/firestore';
import { upsertLocalRow } from '@/lib/content/local-store';
import { validateInquiry } from '@/lib/inquiry';

const COLLECTION = 'inquiries';

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

  const { value, errors, valid } = validateInquiry(body);
  if (!valid) {
    return NextResponse.json({ error: 'Please correct the highlighted fields.', errors }, { status: 422 });
  }

  const now = new Date().toISOString();
  const row = {
    full_name: value.fullName,
    company_name: value.companyName,
    email: value.email,
    phone: value.phone,
    service: value.service,
    location: value.location,
    message: value.message,
    status: 'new',
    created_at: now,
    updated_at: now,
  };

  try {
    if (isFirebaseConfigured() && isFirebaseAdminConfigured()) {
      await firestoreUpsert(COLLECTION, row);
    } else {
      await upsertLocalRow(COLLECTION, { id: crypto.randomUUID(), ...row });
    }
  } catch (err) {
    console.error('Contact enquiry could not be saved:', err.message);
    return NextResponse.json(
      { error: 'We could not send your message right now. Please call or WhatsApp us instead.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
