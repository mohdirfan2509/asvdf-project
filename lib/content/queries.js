import { isFirebaseConfigured, isFirebaseAdminConfigured } from '@/lib/firebase/config';
import { firestoreGetCollection, firestoreGetSingleton } from '@/lib/firebase/firestore';
import { readLocalStore } from './local-store';
import { ARTICLE_BODIES } from './article-bodies';
import { withSiteInfo } from '@/lib/seo/company';
import {
  seedSettings,
  seedProjects,
  seedClients,
  seedBlogs,
  seedGallery,
} from './seed';

function enrichBlog(blog) {
  if (!blog) return null;
  const fallback = ARTICLE_BODIES[blog.slug];
  if (fallback && String(blog.body || '').length < 400) {
    return { ...blog, body: fallback };
  }
  return blog;
}

/** Matches the admin's Visible/Hidden switch (it sets `featured`); hidden items appear nowhere on the site. */
function isVisible(row) {
  return row.published !== false && row.featured === true;
}

function filterVisible(rows) {
  return (rows || [])
    .filter(isVisible)
    .sort((a, b) => {
      const ta = a.updated_at || a.created_at || a.published_at || '';
      const tb = b.updated_at || b.created_at || b.published_at || '';
      if (ta || tb) return String(tb).localeCompare(String(ta));
      return (a.sort_order ?? 0) - (b.sort_order ?? 0);
    });
}

async function loadCollection(name, seed) {
  if (isFirebaseConfigured() && isFirebaseAdminConfigured()) {
    try {
      const remote = await firestoreGetCollection(name);
      if (remote && remote.length) return remote;
      if (remote) return remote; // empty array is valid
    } catch (err) {
      console.error(`Firestore ${name}:`, err.message);
    }
  }
  const store = await readLocalStore();
  return store[name] || seed;
}

export async function getSiteSettings() {
  if (isFirebaseConfigured() && isFirebaseAdminConfigured()) {
    try {
      const data = await firestoreGetSingleton('site_settings');
      if (data) return withSiteInfo(data);
    } catch (err) {
      console.error('Firestore site_settings:', err.message);
    }
  }
  const store = await readLocalStore();
  return withSiteInfo(store.site_settings || seedSettings);
}

export async function getProjects() {
  const rows = await loadCollection('projects', seedProjects);
  return filterVisible(rows);
}

export async function getClients() {
  const rows = await loadCollection('clients', seedClients);
  return filterVisible(rows);
}

export async function getBlogs() {
  const rows = await loadCollection('blogs', seedBlogs);
  return filterVisible(rows)
    .map(enrichBlog)
    .sort((a, b) => String(b.published_at || '').localeCompare(String(a.published_at || '')));
}

export async function getBlogBySlug(slug) {
  const rows = await loadCollection('blogs', seedBlogs);
  return enrichBlog(rows.find((blog) => blog.slug === slug && isVisible(blog)) || null);
}

export async function getGallery() {
  const rows = await loadCollection('gallery_images', seedGallery);
  return filterVisible(rows);
}
