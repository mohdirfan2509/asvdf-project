import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { isFirebaseConfigured } from './config';

function clientConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
}

export function getFirebaseApp() {
  if (!isFirebaseConfigured()) return null;
  if (getApps().length) return getApp();
  return initializeApp(clientConfig());
}

export function getClientAuth() {
  const app = getFirebaseApp();
  return app ? getAuth(app) : null;
}

export function getClientDb() {
  const app = getFirebaseApp();
  return app ? getFirestore(app) : null;
}
