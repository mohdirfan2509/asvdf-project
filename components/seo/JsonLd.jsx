export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // Escaping "<" stops admin-entered text containing "</script>" from ending the tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
