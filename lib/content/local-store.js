import { promises as fs } from 'fs';
import path from 'path';
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

const DATA_PATH = path.join(process.cwd(), 'data', 'cms.json');

function defaultStore() {
  return {
    site_settings: seedSettings,
    projects: seedProjects,
    services: seedServices,
    clients: seedClients,
    testimonials: seedTestimonials,
    blogs: seedBlogs,
    gallery_images: seedGallery,
    machinery: seedMachinery,
    faqs: seedFaqs,
    milestones: seedMilestones,
    core_values: seedValues,
    about_content: seedAbout,
    page_sections: seedSections,
  };
}

export async function readLocalStore() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf8');
    return { ...defaultStore(), ...JSON.parse(raw) };
  } catch {
    const store = defaultStore();
    await writeLocalStore(store);
    return store;
  }
}

export async function writeLocalStore(store) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(store, null, 2), 'utf8');
}

export async function updateLocalCollection(key, rows) {
  const store = await readLocalStore();
  store[key] = rows;
  await writeLocalStore(store);
  return store[key];
}

export async function updateLocalSettings(patch) {
  const store = await readLocalStore();
  store.site_settings = { ...store.site_settings, ...patch, updated_at: new Date().toISOString() };
  await writeLocalStore(store);
  return store.site_settings;
}

export async function upsertLocalRow(collection, row) {
  const store = await readLocalStore();
  const list = Array.isArray(store[collection]) ? [...store[collection]] : [];
  const idx = list.findIndex((item) => item.id === row.id);
  if (idx >= 0) list[idx] = { ...list[idx], ...row };
  else list.push(row);
  store[collection] = list;
  await writeLocalStore(store);
  return row;
}

export async function deleteLocalRow(collection, id) {
  const store = await readLocalStore();
  store[collection] = (store[collection] || []).filter((item) => item.id !== id);
  await writeLocalStore(store);
  return true;
}
