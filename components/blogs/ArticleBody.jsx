import { parseArticleBody } from '@/lib/blogs';

/** Renders a CMS article body ("## " headings, "- " lists, paragraphs) with the site's typography. */
export default function ArticleBody({ body, className = '' }) {
  const blocks = parseArticleBody(body);

  return (
    <div className={`space-y-4 text-[15px] sm:text-base leading-relaxed text-ink/85 ${className}`}>
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          return (
            <h2 key={index} className="pt-4 text-xl sm:text-2xl font-bold tracking-tight text-ink">
              {block.text}
            </h2>
          );
        }
        if (block.type === 'list') {
          return (
            <ul key={index} className="space-y-2 pl-1">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className="whitespace-pre-line">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
