'use client';

import CollectionManager from '@/components/admin/CollectionManager';

export default function AdminMachineryPage() {
  return (
    <CollectionManager
      collection="machinery"
      title="Machines"
      helpText="Add machines. Turn ON to show. They rotate 4 at a time on the website."
      emptyRow={{
        name: '',
        specs: '',
        image: '',
        featured: true,
        published: true,
        sort_order: 0,
      }}
      fields={[
        { name: 'name', label: 'Machine name' },
        { name: 'specs', label: 'Short details', type: 'textarea' },
        { name: 'image', label: 'Photo', type: 'image' },
      ]}
    />
  );
}
