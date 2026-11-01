'use client';

import CollectionManager from '@/components/admin/CollectionManager';
import { PROJECT_CATEGORIES } from '@/lib/projects';

const subtitle = (row) => [row.category, row.location, row.area].filter(Boolean).join(' · ');

export default function AdminProjectsPage() {
  return (
    <CollectionManager
      collection="projects"
      description="Projects shown in the Projects section and on /projects. Clicking a project opens a pop-up with its photo, details and description. Switch an item to Hidden to take it off the website without deleting it."
      emptyRow={{ title: '', slug: '', category: 'Industrial', location: '', area: '', flooring_type: '', image: '', description: '' }}
      subtitle={subtitle}
      fields={[
        { name: 'title', label: 'Project name', required: true, placeholder: 'e.g. Manufacturing Plant Flooring' },
        {
          name: 'slug',
          label: 'Web address',
          slugFrom: 'title',
          hint: 'Filled in from the name. Used in shareable links that open this project, e.g. /projects?project=plant-floor-hyderabad.',
        },
        { name: 'image', label: 'Photo', type: 'image', required: true },
        { name: 'category', label: 'Type', type: 'select', options: PROJECT_CATEGORIES, required: true, hint: 'Used by the project filters.' },
        { name: 'location', label: 'City / place', required: true, placeholder: 'e.g. Hyderabad' },
        { name: 'area', label: 'Area', placeholder: 'e.g. 45,000 sq.ft' },
        { name: 'flooring_type', label: 'Flooring type', placeholder: 'e.g. VDF' },
        {
          name: 'description',
          label: 'Description (optional)',
          type: 'textarea',
          rows: 6,
          hint: 'A short write-up shown in the project pop-up: scope, challenges, results. Line breaks are kept.',
        },
      ]}
    />
  );
}
