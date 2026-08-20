/**
 * Seed Firestore with starter ASVDF content.
 * Usage: npm run seed:firebase
 */
async function main() {
  const { seedFirestore } = await import('../lib/firebase/firestore.js');
  const result = await seedFirestore();
  console.log('Firestore seeded:', result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
