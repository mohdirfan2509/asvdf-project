'use client';

import CollectionManager from '@/components/admin/CollectionManager';
import { PROJECT_CATEGORIES } from '@/lib/projects';

export default function AdminGalleryPage() {
  return (
    <CollectionManager
      collection="gallery_images"
      title="Photos"
      helpText="Upload photos. Newest first. Turn ON to show in the gallery."
      emptyRow={{ title: '', image: '', category: '', location: '', featured: true, published: true, sort_order: 0 }}
      fields={[
        { name: 'title', label: 'Photo title' },
        { name: 'image', label: 'Photo', type: 'image' },
        { name: 'category', label: 'Category (gallery filter)', type: 'select', options: PROJECT_CATEGORIES },
        { name: 'location', label: 'Location (optional, e.g. Hyderabad)' },
      ]}
    />
  );
}
