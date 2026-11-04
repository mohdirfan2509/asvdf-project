/**
 * Replace the Firestore `clients` collection with the client list in lib/content/seed.js (seedClients).
 * The current documents are saved to data/ as a JSON backup before anything is deleted.
 *
 *   npm run clients:replace             # dry run: show current and new clients, change nothing
 *   npm run clients:replace -- --apply  # back up, delete the old clients, write the new list
 */
import { promises as fs } from 'fs';
import path from 'path';
import { getAdminDb } from '../lib/firebase/admin.js';
import { sanitizeRow } from '../lib/content/schema.js';
import { seedClients } from '../lib/content/seed.js';

const APPLY = process.argv.includes('--apply');

async function main() {
  const db = getAdminDb();
  if (!db) throw new Error('Firestore admin is not configured (check .env.local).');

  const collection = db.collection('clients');
  const snap = await collection.get();
  console.log(`Firestore has ${snap.size} client(s): ${snap.docs.map((doc) => doc.data().name).join(', ') || '(none)'}`);
  console.log(`New list (${seedClients.length}):`);
  seedClients.forEach((client) => console.log(`  ${client.id}  ${client.name}  ${client.logo || '(no logo)'}`));

  if (!APPLY) return;

  const backup = path.join('data', `firestore-backup-clients-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  await fs.mkdir('data', { recursive: true });
  await fs.writeFile(backup, JSON.stringify(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })), null, 2));
  console.log(`Backed up the current clients to ${backup}`);

  const batch = db.batch();
  snap.docs.forEach((doc) => batch.delete(doc.ref));
  seedClients.forEach((client) => {
    const { id, ...data } = sanitizeRow('clients', client);
    batch.set(collection.doc(id), { ...data, id });
  });
  await batch.commit();
  console.log('Done.');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
