/**
 * Add starter articles (lib/content/blog-articles.js) that Firestore does not have yet.
 * An article counts as present when a document has the same id or the same slug; those are never touched.
 *
 *   npm run articles:add-missing             # dry run: list what would be added, change nothing
 *   npm run articles:add-missing -- --apply  # create the missing articles
 */
import { getAdminDb } from '../lib/firebase/admin.js';
import { sanitizeRow } from '../lib/content/schema.js';
import { STARTER_ARTICLES } from '../lib/content/blog-articles.js';

const APPLY = process.argv.includes('--apply');

async function main() {
  const db = getAdminDb();
  if (!db) throw new Error('Firestore admin is not configured (check .env.local).');

  const snap = await db.collection('blogs').get();
  const ids = new Set(snap.docs.map((doc) => doc.id));
  const slugs = new Set(snap.docs.map((doc) => doc.data().slug).filter(Boolean));

  const missing = STARTER_ARTICLES.filter((article) => !ids.has(article.id) && !slugs.has(article.slug));
  console.log(`Firestore has ${snap.size} articles; ${missing.length} starter article(s) missing.`);
  missing.forEach((article) => console.log(`  ${APPLY ? 'adding' : 'would add'}: ${article.id}  /blog/${article.slug}`));

  if (!APPLY || !missing.length) return;

  const now = new Date().toISOString();
  for (const article of missing) {
    const row = sanitizeRow('blogs', { ...article, created_at: now, updated_at: now });
    const { id, ...data } = row;
    // create() fails instead of overwriting if the document appeared in the meantime.
    await db.collection('blogs').doc(id).create({ ...data, id });
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
