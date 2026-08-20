import { cert, getApps, initializeApp, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { isFirebaseAdminConfigured, isFirebaseConfigured } from './config.js';

function initAdmin() {
  if (getApps().length) return getApp();

  if (isFirebaseAdminConfigured()) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
    return initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }

  // Emulator / limited: still need project id for some ops
  if (isFirebaseConfigured()) {
    return initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }

  return null;
}

export function getAdminApp() {
  if (!isFirebaseConfigured()) return null;
  try {
    return initAdmin();
  } catch (err) {
    console.error('Firebase admin init failed:', err.message);
    return null;
  }
}

export function getAdminAuth() {
  const app = getAdminApp();
  return app ? getAuth(app) : null;
}

export function getAdminDb() {
  const app = getAdminApp();
  return app ? getFirestore(app) : null;
}
