import { getAdminDb } from './admin.js';
import { sanitizeRow } from '../content/schema.js';
import {
  seedSettings,
  seedProjects,
  seedClients,
  seedBlogs,
  seedGallery,
} from '../content/seed.js';

function sortRows(rows, collection) {
  if (collection === 'blogs') {
    return rows.sort((a, b) => String(b.published_at || '').localeCompare(String(a.published_at || '')));
  }
  return rows.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

export async function firestoreGetCollection(collection) {
  const db = getAdminDb();
  if (!db) return null;
  const snap = await db.collection(collection).get();
  const rows = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return sortRows(rows, collection);
}

export async function firestoreUpsert(collection, row) {
  const db = getAdminDb();
  if (!db) throw new Error('Firestore not available');
  const id = String(row.id || db.collection(collection).doc().id);
  const { id: _omit, ...data } = row;
  // Full replace: rows are sanitised to the schema, so fields from older versions are dropped.
  await db.collection(collection).doc(id).set({ ...data, id });
  return { id, ...data };
}

export async function firestoreDelete(collection, id) {
  const db = getAdminDb();
  if (!db) throw new Error('Firestore not available');
  await db.collection(collection).doc(String(id)).delete();
  return true;
}

export async function firestoreSetSingleton(collection, data, docId = 'main') {
  const db = getAdminDb();
  if (!db) throw new Error('Firestore not available');
  await db.collection(collection).doc(docId).set({ ...data, id: docId }, { merge: true });
  const snap = await db.collection(collection).doc(docId).get();
  return { id: snap.id, ...snap.data() };
}

export async function firestoreGetSingleton(collection, docId = 'main') {
  const db = getAdminDb();
  if (!db) return null;
  const snap = await db.collection(collection).doc(docId).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() };
}

/** Push seed data into Firestore (idempotent merge). */
export async function seedFirestore() {
  const db = getAdminDb();
  if (!db) throw new Error('Firestore admin not configured');

  await firestoreSetSingleton('site_settings', seedSettings);

  const map = {
    projects: seedProjects,
    clients: seedClients,
    blogs: seedBlogs,
    gallery_images: seedGallery,
  };

  for (const [collection, rows] of Object.entries(map)) {
    for (const row of rows) {
      await firestoreUpsert(collection, sanitizeRow(collection, row));
    }
  }

  return { ok: true, collections: Object.keys(map).length + 1 };
}
