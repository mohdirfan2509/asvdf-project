'use client';

import { CONTACT_FORM_ID, CONTACT_NAME_FIELD_ID } from '@/components/contact/ContactForm';

/** Scrolls to the contact form on this page and focuses its first field; elsewhere it opens the homepage form. */
export default function RequestQuoteLink({ className, children }) {
  return (
    <a
      href={`/#${CONTACT_FORM_ID}`}
      className={className}
      onClick={(e) => {
        const form = document.getElementById(CONTACT_FORM_ID);
        if (!form) return;
        e.preventDefault();
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.getElementById(CONTACT_NAME_FIELD_ID)?.focus({ preventScroll: true });
        window.history.replaceState(null, '', `#${CONTACT_FORM_ID}`);
      }}
    >
      {children}
    </a>
  );
}
