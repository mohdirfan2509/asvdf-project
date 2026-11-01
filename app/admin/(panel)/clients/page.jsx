'use client';

import CollectionManager from '@/components/admin/CollectionManager';

const subtitle = (row) => (row.logo ? 'Logo shown on the website' : 'No logo yet — the name is shown instead');

export default function AdminClientsPage() {
  return (
    <CollectionManager
      collection="clients"
      description="Client logos in the scrolling list on the homepage and on /clients. Upload a logo with a transparent or white background for the best result."
      emptyRow={{ name: '', logo: '' }}
      subtitle={subtitle}
      contain
      fields={[
        { name: 'name', label: 'Company name', required: true, hint: 'Used as the logo’s description, and shown on the card until a logo is added.' },
        { name: 'logo', label: 'Logo', type: 'image', contain: true },
      ]}
    />
  );
}
