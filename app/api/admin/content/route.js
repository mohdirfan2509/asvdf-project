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
import {
  readLocalStore,
  writeLocalStore,
  upsertLocalRow,
  deleteLocalRow,
  updateLocalSettings,
} from '@/lib/content/local-store';

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

export async function GET(request) {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const collection = searchParams.get('collection');

  if (useFirebase()) {
    try {
      if (collection === 'site_settings') {
        const data = await firestoreGetSingleton('site_settings');
        return NextResponse.json({ data, mode: 'firebase' });
      }
      if (collection === 'about_content') {
        const data = await firestoreGetSingleton('about_content');
        return NextResponse.json({ data, mode: 'firebase' });
      }
      if (!collection) {
        return NextResponse.json({ error: 'collection required' }, { status: 400 });
      }
      const data = await firestoreGetCollection(collection);
      return NextResponse.json({ data, mode: 'firebase' });
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  const store = await readLocalStore();
  if (!collection) return NextResponse.json({ data: store, mode: 'local' });
  return NextResponse.json({ data: store[collection] ?? null, mode: 'local' });
}

export async function POST(request) {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { collection, row, settings, about, sections, action, id } = body;

  if (useFirebase()) {
    try {
      if (action === 'delete' && collection && id) {
        await firestoreDelete(collection, id);
        revalidatePublic();
        return NextResponse.json({ ok: true, mode: 'firebase' });
      }
      if (settings) {
        const data = await firestoreSetSingleton('site_settings', {
          ...settings,
          updated_at: new Date().toISOString(),
        });
        revalidatePublic();
        return NextResponse.json({ data, mode: 'firebase' });
      }
      if (about) {
        const data = await firestoreSetSingleton('about_content', {
          ...about,
          updated_at: new Date().toISOString(),
        });
        revalidatePublic();
        return NextResponse.json({ data, mode: 'firebase' });
      }
      if (sections) {
        for (const section of sections) {
          await firestoreUpsert('page_sections', section);
        }
        revalidatePublic();
        return NextResponse.json({ ok: true, mode: 'firebase' });
      }
      if (collection && row) {
        const data = await firestoreUpsert(collection, row);
        revalidatePublic();
        return NextResponse.json({ data, mode: 'firebase' });
      }
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  // Local JSON fallback
  if (action === 'delete' && collection && id) {
    await deleteLocalRow(collection, id);
    revalidatePublic();
    return NextResponse.json({ ok: true, mode: 'local' });
  }
  if (settings) {
    const data = await updateLocalSettings(settings);
    revalidatePublic();
    return NextResponse.json({ data, mode: 'local' });
  }
  if (about) {
    const store = await readLocalStore();
    store.about_content = { ...store.about_content, ...about };
    await writeLocalStore(store);
    revalidatePublic();
    return NextResponse.json({ data: store.about_content, mode: 'local' });
  }
  if (sections) {
    const store = await readLocalStore();
    store.page_sections = sections;
    await writeLocalStore(store);
    revalidatePublic();
    return NextResponse.json({ ok: true, mode: 'local' });
  }
  if (collection && row) {
    const withId = { ...row, id: row.id || crypto.randomUUID() };
    const data = await upsertLocalRow(collection, withId);
    revalidatePublic();
    return NextResponse.json({ data, mode: 'local' });
  }
  return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
}
