'use client';

import CollectionManager from '@/components/admin/CollectionManager';

export default function AdminMilestonesPage() {
  return (
    <CollectionManager
      collection="milestones"
      title="Timeline"
      helpText="Add company milestones (year + story). Turn ON to show."
      emptyRow={{
        year: '',
        title: '',
        description: '',
        icon: 'building',
        published: true,
        featured: true,
        sort_order: 0,
      }}
      fields={[
        { name: 'year', label: 'Year' },
        { name: 'title', label: 'Title' },
        { name: 'description', label: 'Short story', type: 'textarea' },
      ]}
    />
  );
}
