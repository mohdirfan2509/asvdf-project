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
import { projectSlug, slugify } from '@/lib/seo/slug';

function revalidatePublic() {
  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/services');
  revalidatePath('/about');
  revalidatePath('/contact');
  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');
  revalidatePath('/sitemap.xml');
}

/** Collections whose items have their own web address, which must be unique within the collection. */
const SLUG_LABELS = { blogs: 'blog post', projects: 'project' };

function slugOf(collection, row) {
  return collection === 'projects' ? projectSlug(row) : slugify(row.slug || row.title);
}

function withSlug(collection, row) {
  return SLUG_LABELS[collection] ? { ...row, slug: slugOf(collection, row) } : row;
}

/** An error response when the row's web address is empty or already used by another item, else null. */
function slugProblem(collection, row, existing) {
  const label = SLUG_LABELS[collection];
  if (!label) return null;
  if (!row.slug) {
    return NextResponse.json({ error: 'Please enter a web address using letters or numbers.' }, { status: 400 });
  }
  const taken = (existing || []).some((item) => item.id !== row.id && slugOf(collection, item) === row.slug);
  if (!taken) return null;
  return NextResponse.json(
    { error: `Another ${label} already uses the web address “${row.slug}”. Please choose a different one.` },
    { status: 409 }
  );
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

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  const { collection, row, action, id } = body ?? {};
  if (action === 'delete' && (!COLLECTIONS.includes(collection) || typeof id !== 'string' || !id || id.includes('/'))) {
    return NextResponse.json({ error: 'Invalid delete request' }, { status: 400 });
  }
  // Only the editable numbers are stored; every other site detail is fixed in code.
  const settings = body.settings
    ? sanitizeSettings(Object.fromEntries(EDITABLE_STAT_KEYS.map((key) => [key, body.settings[key] ?? ''])))
    : null;
  const clean = row ? withSlug(collection, sanitizeRow(collection, row)) : null;
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
        const problem = slugProblem(collection, clean, await firestoreGetCollection(collection));
        if (problem) return problem;
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
    const problem = slugProblem(collection, clean, (await readLocalStore())[collection]);
    if (problem) return problem;
    const withId = { ...clean, id: clean.id || crypto.randomUUID() };
    const data = await upsertLocalRow(collection, withId);
    revalidatePublic();
    return NextResponse.json({ data, mode: 'local' });
  }
  return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
}
