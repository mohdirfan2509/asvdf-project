'use client';

/**
 * Unified full-viewport section chrome.
 * Every SPA view uses the same height, padding, and flex hierarchy
 * so content fills the screen without dead zones or layout drift.
 */
export default function SectionFrame({
  eyebrow,
  title,
  highlight,
  subtitle,
  headerAside = null,
  backgroundImage = null,
  overlay = 'light', // light | dark | none
  panel = true,
  children,
  footer = null,
  className = '',
}) {
  const overlayClass =
    overlay === 'dark'
      ? 'bg-slate-950/70'
      : overlay === 'light'
        ? 'bg-surface-raised/95'
        : 'bg-transparent';

  const titleColor = overlay === 'dark' ? 'text-white' : 'text-ink';
  const subtitleColor = overlay === 'dark' ? 'text-white/80' : 'text-ink-muted';
  const eyebrowColor = overlay === 'dark' ? 'text-brand-light' : 'text-brand';
  const highlightColor = overlay === 'dark' ? 'text-brand-light' : 'text-brand';

  return (
    <div
      className={`spa-panel relative h-full w-full overflow-hidden rounded-panel ${
        panel ? 'surface-raised' : ''
      } ${className}`}
    >
      {backgroundImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
            aria-hidden
          />
          <div className={`absolute inset-0 ${overlayClass}`} aria-hidden />
        </>
      ) : null}

      <div className="relative z-10 h-full min-h-0 flex flex-col spa-pad">
        {(eyebrow || title) && (
          <header className="shrink-0 mb-3 sm:mb-4 lg:mb-5 flex flex-col lg:flex-row lg:items-end justify-between gap-3 lg:gap-6">
            <div className="min-w-0 max-w-3xl">
              {eyebrow ? (
                <p
                  className={`text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase mb-1.5 sm:mb-2 ${eyebrowColor}`}
                >
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2
                  className={`text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold tracking-[-0.03em] leading-[1.1] ${titleColor}`}
                >
                  {title}
                  {highlight ? (
                    <>
                      <br />
                      <span className={highlightColor}>{highlight}</span>
                    </>
                  ) : null}
                </h2>
              ) : null}
              {subtitle ? (
                <p
                  className={`mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed max-w-xl ${subtitleColor}`}
                >
                  {subtitle}
                </p>
              ) : null}
            </div>
            {headerAside ? <div className="shrink-0 w-full lg:w-auto">{headerAside}</div> : null}
          </header>
        )}

        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">{children}</div>

        {footer ? <div className="shrink-0 mt-3 sm:mt-4">{footer}</div> : null}
      </div>
    </div>
  );
}
