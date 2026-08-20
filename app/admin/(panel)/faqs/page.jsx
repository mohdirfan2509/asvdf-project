'use client';

import CollectionManager from '@/components/admin/CollectionManager';

export default function AdminFaqsPage() {
  return (
    <CollectionManager
      collection="faqs"
      title="FAQs"
      helpText="Add questions & answers. Turn ON to show on the website."
      emptyRow={{
        question: '',
        answer: '',
        category: 'General',
        featured: true,
        published: true,
        sort_order: 0,
      }}
      fields={[
        { name: 'question', label: 'Question' },
        { name: 'answer', label: 'Answer', type: 'textarea' },
      ]}
    />
  );
}
