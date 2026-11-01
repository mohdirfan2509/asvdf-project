'use client';

import CollectionManager from '@/components/admin/CollectionManager';
import { PROJECT_CATEGORIES } from '@/lib/projects';

const subtitle = (row) => [row.category, row.location].filter(Boolean).join(' · ');

export default function AdminGalleryPage() {
  return (
    <CollectionManager
      collection="gallery_images"
      description="Photos in the homepage Gallery section. Newest appear first; visitors can filter them by category and location."
      emptyRow={{ title: '', image: '', category: '', location: '' }}
      subtitle={subtitle}
      fields={[
        { name: 'image', label: 'Photo', type: 'image', required: true },
        { name: 'title', label: 'Photo title', required: true, placeholder: 'e.g. Warehouse floor, Shamshabad' },
        { name: 'category', label: 'Category', type: 'select', options: PROJECT_CATEGORIES, required: true, hint: 'Used by the gallery filter.' },
        { name: 'location', label: 'Location', placeholder: 'e.g. Hyderabad' },
      ]}
    />
  );
}
