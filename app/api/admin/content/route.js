import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/admin/auth';
import { isFirebaseConfigured, isFirebaseAdminConfigured } from '@/lib/firebase/config';
import {
  firestoreGetCollection,
  firestoreGetSingleton,
  firestoreUpsert,
  firestoreDelete,
  firestoreSetSingleton,
} from '@/lib/firebase/firestore';
import { readLocalStore, upsertLocalRow, deleteLocalRow, updateLocalSettings } from '@/lib/content/local-store';
import { COLLECTIONS, SETTINGS_COLLECTION as SETTINGS, sanitizeRow, sanitizeSettings } from '@/lib/content/schema';
import { EDITABLE_STAT_KEYS } from '@/lib/stats';

function revalidatePublic() {
  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/services');
  revalidatePath('/about');
  revalidatePath('/contact');
  revalidatePath('/blog');
  revalidatePath('/sitemap.xml');
}

function useFirebase() {
  return isFirebaseConfigured() && isFirebaseAdminConfigured();
}

const unknownCollection = () => NextResponse.json({ error: 'Unknown collection' }, { status: 400 });

export async function GET(request) {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const collection = new URL(request.url).searchParams.get('collection');
  if (collection !== SETTINGS && !COLLECTIONS.includes(collection)) return unknownCollection();

  if (useFirebase()) {
    try {
      const data =
        collection === SETTINGS ? await firestoreGetSingleton(SETTINGS) : await firestoreGetCollection(collection);
      return NextResponse.json({ data, mode: 'firebase' });
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  const store = await readLocalStore();
  return NextResponse.json({ data: store[collection] ?? null, mode: 'local' });
}

export async function POST(request) {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { collection, row, action, id } = body;
  // Only the editable numbers are stored; every other site detail is fixed in code.
  const settings = body.settings
    ? sanitizeSettings(Object.fromEntries(EDITABLE_STAT_KEYS.map((key) => [key, body.settings[key] ?? ''])))
    : null;
  const clean = row ? sanitizeRow(collection, row) : null;
  if (!settings && !COLLECTIONS.includes(collection)) return unknownCollection();

  if (useFirebase()) {
    try {
      if (action === 'delete' && id) {
        await firestoreDelete(collection, id);
        revalidatePublic();
        return NextResponse.json({ ok: true, mode: 'firebase' });
      }
      if (settings) {
        const data = await firestoreSetSingleton(SETTINGS, {
          ...settings,
          updated_at: new Date().toISOString(),
        });
        revalidatePublic();
        return NextResponse.json({ data, mode: 'firebase' });
      }
      if (clean) {
        const data = await firestoreUpsert(collection, clean);
        revalidatePublic();
        return NextResponse.json({ data, mode: 'firebase' });
      }
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  // Local JSON fallback
  if (action === 'delete' && id) {
    await deleteLocalRow(collection, id);
    revalidatePublic();
    return NextResponse.json({ ok: true, mode: 'local' });
  }
  if (settings) {
    const data = await updateLocalSettings(settings);
    revalidatePublic();
    return NextResponse.json({ data, mode: 'local' });
  }
  if (clean) {
    const withId = { ...clean, id: clean.id || crypto.randomUUID() };
    const data = await upsertLocalRow(collection, withId);
    revalidatePublic();
    return NextResponse.json({ data, mode: 'local' });
  }
  return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
}
