/**
 * Seamless CSS marquee: two identical halves slide by -50%, pausing on hover or keyboard focus.
 * Items repeat inside each half until there are at least `minItems`, so short lists still fill the row.
 * With reduced motion it becomes a static, centred, wrapping row of the original items only.
 */
export default function Marquee({
  items = [],
  renderItem,
  getKey = (item, index) => item?.id ?? index,
  direction = 'ltr',
  duration = 40,
  minItems = 8,
  label,
  className = '',
}) {
  if (!items.length) return null;

  const copies = Math.max(1, Math.ceil(minItems / items.length));
  const half = Array.from({ length: copies }, () => items).flat();
  const animation = direction === 'rtl' ? 'animate-marquee-rtl' : 'animate-marquee-ltr';

  return (
    <div
      role="region"
      aria-label={label}
      className={`marquee-pausable relative overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)] motion-reduce:[mask-image:none] ${className}`}
    >
      <div
        className={`flex w-max ${animation} motion-reduce:w-full`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            inert={copy === 1 || undefined}
            className={`flex shrink-0 gap-4 pr-4 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0 ${
              copy === 1 ? 'motion-reduce:hidden' : ''
            }`}
          >
            {half.map((item, index) => (
              <li
                key={`${copy}-${index}-${getKey(item, index)}`}
                aria-hidden={index >= items.length || undefined}
                className={`shrink-0 ${index >= items.length ? 'motion-reduce:hidden' : ''}`}
              >
                {renderItem(item, index % items.length)}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
