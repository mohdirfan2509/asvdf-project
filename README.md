# ASVDF Flooring — Firebase + Cloudinary CMS

Mobile-first marketing site with admin control tower.

**Stack:** Next.js · **Firestore** (content) · **Firebase Auth** (admin) · **Cloudinary** (images)

## Quick start (local without Firebase)

```bash
npm install
npm run dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin/login — password `asvdf-admin-2026`

## Production setup: Firebase + Cloudinary

### 1. Cloudinary (images)
1. Create account at cloudinary.com  
2. Copy Cloud name, API Key, API Secret into `.env.local`

### 2. Firebase (Auth + Firestore)
1. Create a project at [Firebase Console](https://console.firebase.google.com) (Spark / free)  
2. Enable **Authentication → Email/Password**  
3. Create one admin user (Authentication → Users → Add user)  
4. Create **Firestore** database (start in test mode, then lock rules for production)  
5. Project settings → Your apps → Web app → copy config into `NEXT_PUBLIC_FIREBASE_*`  
6. Project settings → Service accounts → Generate new private key → set:
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY` (keep `\n` newlines in the env string)

### 3. Seed starter content

```bash
npm run seed:firebase
```

Or while logged into admin: `POST /api/admin/seed`

### 4. Firestore security rules (production)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

(Public site reads via Admin SDK on the server; browser admin writes go through Next.js API with session cookie.)

## How visibility works

| Toggle | Meaning |
|--------|---------|
| Show on website | Listing pages |
| Show on homepage | Selected featured items only |

Keep adding clients/projects forever — toggle visibility instead of deleting.

## Contact

Default: **+91 9063222804** (WhatsApp + Call). Edit in Admin → Site Settings.

## Deploy (Vercel)

1. Push repo  
2. Set all env vars from `.env.example`  
3. Deploy  
4. Run seed once  
5. Login at `/admin/login` with the Firebase admin email/password  
