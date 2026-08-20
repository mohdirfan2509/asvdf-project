import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin/auth';
import { isFirebaseAdminConfigured } from '@/lib/firebase/config';
import { seedFirestore } from '@/lib/firebase/firestore';

export async function POST() {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ error: 'Firebase Admin not configured' }, { status: 400 });
  }
  try {
    const result = await seedFirestore();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
