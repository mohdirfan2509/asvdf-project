'use client';

import CollectionManager from '@/components/admin/CollectionManager';

export default function AdminBlogsPage() {
  return (
    <CollectionManager
      collection="blogs"
      title="Blogs"
      helpText="Write articles. Turn ON to show. Pick a photo for each post."
      emptyRow={{
        title: '',
        slug: '',
        excerpt: '',
        body: '',
        cover: '',
        category: 'Guides',
        featured: true,
        published: true,
        published_at: new Date().toISOString(),
        sort_order: 0,
      }}
      fields={[
        { name: 'title', label: 'Blog title' },
        { name: 'slug', label: 'Web link name (example: what-is-vdf)' },
        { name: 'excerpt', label: 'Short preview', type: 'textarea' },
        { name: 'body', label: 'Full article', type: 'textarea' },
        { name: 'cover', label: 'Cover photo', type: 'image' },
      ]}
    />
  );
}
