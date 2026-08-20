'use client';

import CollectionManager from '@/components/admin/CollectionManager';

export default function AdminClientsPage() {
  return (
    <CollectionManager
      collection="clients"
      title="Clients"
      helpText="Add client names or logos. Turn ON — they scroll forever on the website."
      emptyRow={{
        name: '',
        logo: '',
        featured: true,
        published: true,
        sort_order: 0,
      }}
      fields={[
        { name: 'name', label: 'Client / company name' },
        { name: 'logo', label: 'Logo photo (optional)', type: 'image' },
      ]}
    />
  );
}
