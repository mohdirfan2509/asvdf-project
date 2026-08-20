'use client';

import CollectionManager from '@/components/admin/CollectionManager';

export default function AdminGalleryPage() {
  return (
    <CollectionManager
      collection="gallery_images"
      title="Photos"
      helpText="Upload photos. Newest first. Turn ON to show in the gallery."
      emptyRow={{ title: '', image: '', featured: true, published: true, sort_order: 0 }}
      fields={[
        { name: 'title', label: 'Photo title' },
        { name: 'image', label: 'Photo', type: 'image' },
      ]}
    />
  );
}
