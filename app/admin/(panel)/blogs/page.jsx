'use client';

import CollectionManager from '@/components/admin/CollectionManager';
import { BLOG_CATEGORIES, formatBlogDate } from '@/lib/blogs';

const subtitle = (row) => [row.category, formatBlogDate(row.published_at)].filter(Boolean).join(' · ');
const today = () => `${new Date().toISOString().slice(0, 10)}T00:00:00.000Z`;

export default function AdminBlogsPage() {
  return (
    <CollectionManager
      collection="blogs"
      description="Articles in the Blogs section, on /blog and on each article's own page."
      emptyRow={{
        title: '',
        slug: '',
        excerpt: '',
        body: '',
        cover: '',
        category: BLOG_CATEGORIES[0],
        tags: '',
        published_at: today(),
      }}
      subtitle={subtitle}
      fields={[
        { name: 'title', label: 'Title', required: true },
        {
          name: 'slug',
          label: 'Web address',
          slugFrom: 'title',
          required: true,
          hint: 'Filled in from the title. Used in the link, e.g. /blog/what-is-vdf-flooring. Each article needs its own.',
        },
        { name: 'cover', label: 'Cover photo', type: 'image', required: true },
        { name: 'category', label: 'Category', type: 'select', options: BLOG_CATEGORIES, required: true },
        {
          name: 'published_at',
          label: 'Publish date',
          type: 'date',
          required: true,
          hint: 'Shown on the article and used to sort posts, newest first.',
        },
        { name: 'tags', label: 'Tags', type: 'tags', placeholder: 'e.g. Epoxy Flooring, Concrete Floors', hint: 'Separate tags with commas.' },
        { name: 'excerpt', label: 'Short preview', type: 'textarea', rows: 3, required: true, hint: 'One or two sentences shown on the blog cards.' },
        {
          name: 'body',
          label: 'Full article',
          type: 'textarea',
          rows: 12,
          required: true,
          hint: 'Leave a blank line between paragraphs. Start a line with "## " for a heading and "- " for a list item.',
        },
        { name: 'seo_title', label: 'Search result title (optional)', hint: 'Shown in Google results. Leave empty to use the title.' },
        { name: 'seo_description', label: 'Search result description (optional)', type: 'textarea', rows: 3 },
      ]}
    />
  );
}
