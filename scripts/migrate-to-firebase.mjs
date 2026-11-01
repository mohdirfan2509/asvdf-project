/**
 * Copy local admin content (data/cms.json) into Firestore, in the current content schema.
 *
 *   npm run migrate:firebase                      # dry run: compare local data with Firestore, change nothing
 *   npm run migrate:firebase -- --apply           # write local items + numbers (same ids are replaced)
 *   npm run migrate:firebase -- --apply --prune   # ...and delete Firestore items that are not in the local data
 *   npm run migrate:firebase -- --delete-obsolete # delete collections the site no longer uses
 *
 * Any run that changes Firestore first saves a full backup to data/firestore-backup-<time>.json.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getAdminDb } from '../lib/firebase/admin.js';
import {
  COLLECTIONS,
  SETTINGS_COLLECTION,
  SETTINGS_DOC_ID,
  sanitizeRow,
  sanitizeSettings,
} from '../lib/content/schema.js';

const args = new Set(process.argv.slice(2));
const APPLY = args.has('--apply');
const PRUNE = args.has('--prune');
const DELETE_OBSOLETE = args.has('--delete-obsolete');
const KNOWN = new Set([...COLLECTIONS, SETTINGS_COLLECTION]);

const label = (row) => row.title || row.name || row.id;

async function readFirestore(db) {
  const collections = await db.listCollections();
  const data = {};
  for (const ref of collections) {
    const snap = await ref.get();
    data[ref.id] = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  return data;
}

async function main() {
  if (PRUNE && !APPLY) throw new Error('--prune only works together with --apply.');
  const db = getAdminDb();
  if (!db) throw new Error('Firebase Admin is not configured. Check the FIREBASE_* values in .env.local.');

  const local = JSON.parse(await readFile(path.join(process.cwd(), 'data', 'cms.json'), 'utf8'));
  const remote = await readFirestore(db);

  console.log(`Firestore project: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
  console.log(APPLY || DELETE_OBSOLETE ? 'Mode: CHANGES WILL BE WRITTEN\n' : 'Mode: dry run (nothing is changed)\n');

  const plan = { writes: [], deletes: [], dropCollections: [] };

  for (const collection of COLLECTIONS) {
    const localRows = (local[collection] || []).map((row) => sanitizeRow(collection, row)).filter((row) => row.id);
    const remoteRows = remote[collection] || [];
    const localIds = new Set(localRows.map((row) => row.id));
    const remoteIds = new Set(remoteRows.map((row) => row.id));
    const onlyRemote = remoteRows.filter((row) => !localIds.has(row.id));
    const onlyLocal = localRows.filter((row) => !remoteIds.has(row.id));

    console.log(`${collection}: local ${localRows.length}, Firestore ${remoteRows.length}`);
    onlyLocal.forEach((row) => console.log(`   + new in Firestore:      ${label(row)}`));
    localRows.filter((row) => remoteIds.has(row.id)).forEach((row) => console.log(`   ~ replaced:              ${label(row)}`));
    onlyRemote.forEach((row) =>
      console.log(`   ! only in Firestore:     ${label(row)}${PRUNE ? '  -> will be DELETED' : '  (kept; use --prune to delete)'}`)
    );

    localRows.forEach((row) => plan.writes.push({ collection, row }));
    if (PRUNE) onlyRemote.forEach((row) => plan.deletes.push({ collection, id: row.id }));
  }

  const settings = sanitizeSettings(local[SETTINGS_COLLECTION] || {});
  const remoteSettings = (remote[SETTINGS_COLLECTION] || []).find((doc) => doc.id === SETTINGS_DOC_ID);
  console.log(`\n${SETTINGS_COLLECTION}/${SETTINGS_DOC_ID}: ${JSON.stringify(settings)}`);
  if (remoteSettings) {
    const extra = Object.keys(remoteSettings).filter((key) => key !== 'id' && !(key in settings));
    if (extra.length) console.log(`   old fields in Firestore that will be removed on --apply: ${extra.join(', ')}`);
  }

  const obsolete = Object.keys(remote).filter((name) => !KNOWN.has(name));
  if (obsolete.length) {
    console.log('\nCollections the site no longer uses:');
    obsolete.forEach((name) =>
      console.log(`   ${name} (${remote[name].length} docs)${DELETE_OBSOLETE ? '  -> will be DELETED' : '  (kept; use --delete-obsolete)'}`)
    );
    if (DELETE_OBSOLETE) plan.dropCollections = obsolete;
  }

  if (!APPLY && !DELETE_OBSOLETE) {
    console.log('\nDry run only. Nothing was changed.');
    return;
  }

  const backupFile = path.join(process.cwd(), 'data', `firestore-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  await writeFile(backupFile, JSON.stringify(remote, null, 2));
  console.log(`\nBackup of current Firestore data: ${path.relative(process.cwd(), backupFile)}`);

  if (APPLY) {
    for (const { collection, row } of plan.writes) {
      const { id, ...data } = row;
      await db.collection(collection).doc(id).set({ ...data, id });
    }
    await db.collection(SETTINGS_COLLECTION).doc(SETTINGS_DOC_ID).set({ ...settings, id: SETTINGS_DOC_ID });
    for (const { collection, id } of plan.deletes) await db.collection(collection).doc(id).delete();
    console.log(`Wrote ${plan.writes.length} items and the numbers; deleted ${plan.deletes.length} items.`);
  }
  for (const name of plan.dropCollections) {
    await db.recursiveDelete(db.collection(name));
    console.log(`Deleted collection ${name}.`);
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(`Migration failed: ${err.message}`);
  process.exit(1);
});
