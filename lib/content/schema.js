/**
 * Content schema: the only data the admin panel manages (Firestore or data/cms.json).
 * Everything else on the site is fixed in code. Saves and the migration script keep only these fields.
 * Relative imports only: also used by scripts run with plain Node.
 */
import { EDITABLE_STAT_KEYS } from '../stats.js';

/** Stored on every list item: admin visibility, ordering and timestamps. */
const ITEM_FIELDS = {
  id: 'string',
  featured: 'boolean', // the admin's Visible/Hidden switch
  published: 'boolean',
  sort_order: 'number',
  created_at: 'string',
  updated_at: 'string',
};

export const CONTENT_SCHEMA = {
  projects: {
    title: 'string',
    slug: 'string',
    category: 'string',
    location: 'string',
    area: 'string',
    flooring_type: 'string',
    image: 'string',
    description: 'string',
  },
  clients: {
    name: 'string',
    logo: 'string',
  },
  gallery_images: {
    title: 'string',
    image: 'string',
    category: 'string',
    location: 'string',
  },
  blogs: {
    title: 'string',
    slug: 'string',
    category: 'string',
    tags: 'tags',
    excerpt: 'string',
    body: 'string',
    cover: 'string',
    seo_title: 'string',
    seo_description: 'string',
    published_at: 'string',
  },
};

/** Single document `site_settings/main`: only the admin-editable numbers. */
export const SETTINGS_COLLECTION = 'site_settings';
export const SETTINGS_DOC_ID = 'main';
export const SETTINGS_FIELDS = [...EDITABLE_STAT_KEYS, 'updated_at'];

export const COLLECTIONS = Object.keys(CONTENT_SCHEMA);

const MAX_STRING = 100_000;

function coerce(type, value) {
  if (value === undefined || value === null) return undefined;
  switch (type) {
    case 'boolean':
      return Boolean(value);
    case 'number': {
      const number = Number(value);
      return Number.isFinite(number) ? number : undefined;
    }
    case 'tags': {
      const list = Array.isArray(value) ? value : String(value).split(',');
      return list.map((tag) => String(tag).trim()).filter(Boolean);
    }
    default:
      return String(value).slice(0, MAX_STRING);
  }
}

/** Keeps only schema fields, with consistent types; unknown and empty fields are dropped. */
export function sanitizeRow(collection, row = {}) {
  const fields = { ...ITEM_FIELDS, ...CONTENT_SCHEMA[collection] };
  const clean = {};
  for (const [key, type] of Object.entries(fields)) {
    const value = coerce(type, row[key]);
    if (value !== undefined) clean[key] = value;
  }
  return clean;
}

export function sanitizeSettings(settings = {}) {
  return Object.fromEntries(
    SETTINGS_FIELDS.filter((key) => settings[key] !== undefined).map((key) => [key, String(settings[key]).trim().slice(0, 40)])
  );
}
