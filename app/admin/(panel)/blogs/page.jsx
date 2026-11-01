'use client';

import CollectionManager from '@/components/admin/CollectionManager';
import { BLOG_CATEGORIES } from '@/lib/blogs';

const dateFormat = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
const subtitle = (row) =>
  [row.category, row.published_at ? dateFormat.format(new Date(row.published_at)) : null].filter(Boolean).join(' · ');

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
        published_at: new Date().toISOString(),
      }}
      subtitle={subtitle}
      fields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'slug', label: 'Web address', slugFrom: 'title', required: true, hint: 'Filled in from the title. Used in the link, e.g. /blog/what-is-vdf-flooring.' },
        { name: 'cover', label: 'Cover photo', type: 'image', required: true },
        { name: 'category', label: 'Category', type: 'select', options: BLOG_CATEGORIES, required: true },
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
