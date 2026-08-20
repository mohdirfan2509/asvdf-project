export function isFirebaseConfigured() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '';
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '';
  return Boolean(
    projectId &&
      apiKey &&
      !projectId.includes('your-project') &&
      !apiKey.includes('your-api')
  );
}

export function isFirebaseAdminConfigured() {
  return Boolean(
    isFirebaseConfigured() &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY &&
      !process.env.FIREBASE_CLIENT_EMAIL.includes('your-')
  );
}

export const SESSION_COOKIE = 'asvdf_firebase_session';
export const SESSION_EXPIRES_MS = 60 * 60 * 24 * 5 * 1000; // 5 days

export const COLLECTIONS = [
  'projects',
  'services',
  'clients',
  'testimonials',
  'blogs',
  'gallery_images',
  'machinery',
  'faqs',
  'milestones',
  'core_values',
  'page_sections',
];
