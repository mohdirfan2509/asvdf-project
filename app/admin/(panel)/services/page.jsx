'use client';

import CollectionManager from '@/components/admin/CollectionManager';

export default function AdminServicesPage() {
  return (
    <CollectionManager
      collection="services"
      title="Services"
      helpText="Add each service. Turn ON to show. Extra items rotate automatically on the site."
      emptyRow={{
        title: '',
        description: '',
        image: '',
        featured: true,
        published: true,
        sort_order: 0,
      }}
      fields={[
        { name: 'title', label: 'Service name' },
        { name: 'description', label: 'Short description', type: 'textarea' },
        { name: 'image', label: 'Photo', type: 'image' },
      ]}
    />
  );
}
