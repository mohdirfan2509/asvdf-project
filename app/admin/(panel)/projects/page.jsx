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
        slug: '',
        category: 'Industrial',
        location: '',
        area: '',
        flooring_type: '',
        image: '',
        featured: true,
        published: true,
        sort_order: 0,
      }}
      fields={[
        { name: 'title', label: 'Project name' },
        { name: 'slug', label: 'URL name (example: plant-floor-hyderabad)' },
        { name: 'category', label: 'Type (Industrial / Warehouse / Commercial)' },
        { name: 'location', label: 'City / place' },
        { name: 'area', label: 'Area (example: 45,000 sq.ft)' },
        { name: 'flooring_type', label: 'Flooring type (example: VDF)' },
        { name: 'image', label: 'Photo', type: 'image' },
      ]}
    />
  );
}
