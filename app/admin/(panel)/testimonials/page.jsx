'use client';

import CollectionManager from '@/components/admin/CollectionManager';

export default function AdminTestimonialsPage() {
  return (
    <CollectionManager
      collection="testimonials"
      title="Reviews"
      helpText="Add customer reviews. Turn ON the ones you want on the website."
      emptyRow={{
        name: '',
        role: '',
        company: '',
        quote: '',
        avatar: '',
        rating: 5,
        featured: true,
        published: true,
        sort_order: 0,
      }}
      fields={[
        { name: 'name', label: 'Customer name' },
        { name: 'role', label: 'Job / company' },
        {
          name: 'company',
          label: 'Client company (optional, same name as in Clients to show its logo)',
        },
        { name: 'quote', label: 'What they said', type: 'textarea' },
        { name: 'avatar', label: 'Photo (optional)', type: 'image' },
        { name: 'rating', label: 'Stars (1–5)', type: 'number' },
      ]}
    />
  );
}
