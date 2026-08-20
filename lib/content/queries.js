import { isFirebaseConfigured, isFirebaseAdminConfigured } from '@/lib/firebase/config';
import {
  firestoreGetCollection,
  firestoreGetDoc,
  firestoreGetSingleton,
} from '@/lib/firebase/firestore';
import { readLocalStore } from './local-store';
import {
  seedSettings,
  seedProjects,
  seedServices,
  seedClients,
  seedTestimonials,
  seedBlogs,
  seedGallery,
  seedMachinery,
  seedFaqs,
  seedMilestones,
  seedValues,
  seedAbout,
  seedSections,
} from './seed';

const REVALIDATE = 60;

function filterVisible(rows, { homepageOnly = false } = {}) {
  return (rows || [])
    .filter((p) => p.published !== false)
    .filter((p) => (homepageOnly ? p.featured === true : true))
    .slice()
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
      if (data) return data;
    } catch (err) {
      console.error('Firestore site_settings:', err.message);
    }
  }
  const store = await readLocalStore();
  return store.site_settings || seedSettings;
}

export async function getAbout() {
  if (isFirebaseConfigured() && isFirebaseAdminConfigured()) {
    try {
      const data = await firestoreGetSingleton('about_content');
      if (data) return data;
    } catch (err) {
      console.error('Firestore about:', err.message);
    }
  }
  const store = await readLocalStore();
  return store.about_content || seedAbout;
}

export async function getProjects({ homepageOnly = false } = {}) {
  const rows = await loadCollection('projects', seedProjects);
  return filterVisible(rows, { homepageOnly });
}

export async function getServices({ homepageOnly = false } = {}) {
  const rows = await loadCollection('services', seedServices);
  return filterVisible(rows, { homepageOnly });
}

export async function getClients({ homepageOnly = false } = {}) {
  const rows = await loadCollection('clients', seedClients);
  return filterVisible(rows, { homepageOnly });
}

export async function getTestimonials({ homepageOnly = false } = {}) {
  const rows = await loadCollection('testimonials', seedTestimonials);
  return filterVisible(rows, { homepageOnly });
}

export async function getBlogs({ homepageOnly = false } = {}) {
  const rows = await loadCollection('blogs', seedBlogs);
  let filtered = filterVisible(rows, { homepageOnly });
  return filtered.sort((a, b) =>
    String(b.published_at || '').localeCompare(String(a.published_at || ''))
  );
}

export async function getBlogBySlug(slug) {
  if (isFirebaseConfigured() && isFirebaseAdminConfigured()) {
    try {
      const rows = await firestoreGetCollection('blogs');
      const found = (rows || []).find((b) => b.slug === slug && b.published !== false);
      if (found) return found;
    } catch (err) {
      console.error('Firestore blog slug:', err.message);
    }
  }
  const store = await readLocalStore();
  return (store.blogs || seedBlogs).find((b) => b.slug === slug && b.published !== false) || null;
}

export async function getGallery({ homepageOnly = false } = {}) {
  const rows = await loadCollection('gallery_images', seedGallery);
  return filterVisible(rows, { homepageOnly });
}

export async function getMachinery({ homepageOnly = false } = {}) {
  const rows = await loadCollection('machinery', seedMachinery);
  return filterVisible(rows, { homepageOnly });
}

export async function getFaqs({ homepageOnly = false } = {}) {
  const rows = await loadCollection('faqs', seedFaqs);
  return filterVisible(rows, { homepageOnly });
}

export async function getMilestones() {
  const rows = await loadCollection('milestones', seedMilestones);
  return filterVisible(rows);
}

export async function getCoreValues() {
  const rows = await loadCollection('core_values', seedValues);
  return filterVisible(rows);
}

export async function getPageSections() {
  const rows = await loadCollection('page_sections', seedSections);
  return (rows || [])
    .filter((s) => s.enabled !== false)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function getAllContent({ homepageOnly = false } = {}) {
  const [
    settings,
    projects,
    services,
    clients,
    testimonials,
    blogs,
    gallery,
    machinery,
    faqs,
    milestones,
    values,
    about,
    sections,
  ] = await Promise.all([
    getSiteSettings(),
    getProjects({ homepageOnly }),
    getServices({ homepageOnly }),
    getClients({ homepageOnly }),
    getTestimonials({ homepageOnly }),
    getBlogs({ homepageOnly }),
    getGallery({ homepageOnly }),
    getMachinery({ homepageOnly }),
    getFaqs({ homepageOnly }),
    getMilestones(),
    getCoreValues(),
    getAbout(),
    getPageSections(),
  ]);

  return {
    settings,
    projects,
    services,
    clients,
    testimonials,
    blogs,
    gallery,
    machinery,
    faqs,
    milestones,
    values,
    about,
    sections,
  };
}

export { REVALIDATE, firestoreGetDoc };
