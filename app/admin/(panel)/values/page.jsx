'use client';

import CollectionManager from '@/components/admin/CollectionManager';

export default function AdminValuesPage() {
  return (
    <CollectionManager
      collection="core_values"
      title="Values"
      helpText="Add company values. Turn ON to show on the website."
      emptyRow={{
        title: '',
        description: '',
        icon: 'shield',
        published: true,
        featured: true,
        sort_order: 0,
      }}
      fields={[
        { name: 'title', label: 'Value name' },
        { name: 'description', label: 'Short meaning', type: 'textarea' },
      ]}
    />
  );
}
