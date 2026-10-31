'use client';

import CollectionManager from '@/components/admin/CollectionManager';
import { FAQ_CATEGORIES } from '@/lib/faqs';

export default function AdminFaqsPage() {
  return (
    <CollectionManager
      collection="faqs"
      title="FAQs"
      helpText="Add questions & answers. Turn ON to show on the website."
      emptyRow={{
        question: '',
        answer: '',
        category: FAQ_CATEGORIES[0],
        keywords: '',
        featured: true,
        published: true,
        sort_order: 0,
      }}
      fields={[
        { name: 'question', label: 'Question' },
        { name: 'answer', label: 'Answer', type: 'textarea' },
        { name: 'category', label: 'Category', type: 'select', options: FAQ_CATEGORIES },
        { name: 'keywords', label: 'Search keywords (optional, comma separated)' },
        { name: 'sort_order', label: 'Display order (lower shows first)', type: 'number' },
      ]}
    />
  );
}
