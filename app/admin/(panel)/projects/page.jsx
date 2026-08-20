'use client';

import CollectionManager from '@/components/admin/CollectionManager';

export default function AdminProjectsPage() {
  return (
    <CollectionManager
      collection="projects"
      title="Projects"
      helpText="Add project photos. Tap green Show so they appear on the website."
      emptyRow={{
        title: '',
        category: 'Industrial',
        location: '',
        area: '',
        image: '',
        featured: true,
        published: true,
        sort_order: 0,
      }}
      fields={[
        { name: 'title', label: 'Project name' },
        { name: 'location', label: 'City / place' },
        { name: 'image', label: 'Photo', type: 'image' },
      ]}
    />
  );
}
