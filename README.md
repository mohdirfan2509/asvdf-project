# ASVDF Flooring — website + small admin panel

**Stack:** Next.js · Firestore (admin content) · Firebase Auth (admin sign-in) · Cloudinary (uploaded images) · Resend (form emails)

Most of the site (services, testimonials, FAQs, company details, page text, images) is fixed in code.
The admin panel manages only:

| Admin area | Firestore | Fields |
|---|---|---|
| Numbers | `site_settings/main` | `stat_projects`, `stat_clients`, `stat_industries` |
| Projects | `projects` | `title`, `slug`, `category`, `location`, `area`, `flooring_type`, `image` |
| Clients | `clients` | `name`, `logo` |
| Gallery | `gallery_images` | `title`, `image`, `category`, `location` |
| Blogs | `blogs` | `title`, `slug`, `category`, `tags`, `excerpt`, `body`, `cover`, `seo_title`, `seo_description`, `published_at` |

Every list item also has `id`, `featured` (the admin's Visible/Hidden switch), `published`, `sort_order`,
`created_at`, `updated_at`. The schema lives in `lib/content/schema.js`; saves keep only these fields.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in the values. Without the Firebase values, admin content is
stored in `data/cms.json` and the admin signs in with `ADMIN_PASSWORD` (12+ characters) — sessions are
signed with `ADMIN_SESSION_SECRET`.

## Firebase setup

1. [Firebase Console](https://console.firebase.google.com) → your project.
2. **Firestore Database** → create it if needed. **Rules** tab → paste `firestore.rules` → Publish.
   (The site uses Firestore only from its server via the Admin SDK, so browsers are denied all access.)
3. **Authentication → Sign-in method** → enable Email/Password. **Users** → add the admin user
   (its email must be in `ADMIN_EMAILS`).
4. **Project settings → General → Your apps** → web app config → `NEXT_PUBLIC_FIREBASE_*` in `.env.local`.
5. **Project settings → Service accounts** → Generate new private key → `FIREBASE_CLIENT_EMAIL` and
   `FIREBASE_PRIVATE_KEY` (keep the `\n` sequences, in double quotes). Never commit this key.
6. Restart `npm run dev`.

### Move local content into Firestore

```bash
npm run migrate:firebase                         # dry run: shows what would change
npm run migrate:firebase -- --apply              # copy data/cms.json into Firestore
npm run migrate:firebase -- --apply --prune      # ...and delete Firestore items not in the local data
npm run migrate:firebase -- --delete-obsolete    # delete collections the site no longer uses
```

Every run that changes Firestore first writes a backup to `data/firestore-backup-*.json`.
`npm run seed:firebase` loads the built-in starter content instead.

## Deploy (Vercel)

Set every variable from `.env.example` in the Vercel project (with a fresh `ADMIN_SESSION_SECRET`), set up
Cloudinary for image uploads, then deploy. Sign in at `/admin/login` with the Firebase admin user.
