import { getAdminDb } from './admin.js';
import { COLLECTIONS } from './config.js';
import {
  seedSettings,
  seedProjects,
  seedServices,
  seedClients,
  seedTestimonials,
  seedBlogs,
  seedGallery,
  seedMachinery,
  seedFaqs,
  seedMilestones,
  seedValues,
  seedAbout,
  seedSections,
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

export async function firestoreGetDoc(collection, id) {
  const db = getAdminDb();
  if (!db) return null;
  const snap = await db.collection(collection).doc(String(id)).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() };
}

export async function firestoreUpsert(collection, row) {
  const db = getAdminDb();
  if (!db) throw new Error('Firestore not available');
  const id = String(row.id || db.collection(collection).doc().id);
  const { id: _omit, ...data } = row;
  await db.collection(collection).doc(id).set({ ...data, id }, { merge: true });
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
  await firestoreSetSingleton('about_content', seedAbout);

  const map = {
    projects: seedProjects,
    services: seedServices,
    clients: seedClients,
    testimonials: seedTestimonials,
    blogs: seedBlogs,
    gallery_images: seedGallery,
    machinery: seedMachinery,
    faqs: seedFaqs,
    milestones: seedMilestones,
    core_values: seedValues,
    page_sections: seedSections,
  };

  for (const [collection, rows] of Object.entries(map)) {
    for (const row of rows) {
      await firestoreUpsert(collection, row);
    }
  }

  return { ok: true, collections: Object.keys(map).length + 2 };
}

export { COLLECTIONS };
