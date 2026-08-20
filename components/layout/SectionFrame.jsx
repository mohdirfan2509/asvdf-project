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
      ? 'bg-gradient-to-br from-slate-950/75 via-slate-950/55 to-slate-900/40'
      : overlay === 'light'
        ? 'bg-gradient-to-br from-white/96 via-white/92 to-white/88'
        : 'bg-transparent';

  const titleColor = overlay === 'dark' ? 'text-white' : 'text-slate-900';
  const subtitleColor = overlay === 'dark' ? 'text-white/80' : 'text-slate-600';
  const eyebrowColor = overlay === 'dark' ? 'text-purple-200' : 'text-[#7C3AED]';

  return (
    <div
      className={`spa-panel relative h-full w-full overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] lg:rounded-[2rem] ${
        panel ? 'bg-white border border-white/70 shadow-[0_8px_30px_rgba(15,23,42,0.06)]' : ''
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
                  className={`text-[10px] sm:text-xs font-[700] tracking-[0.2em] uppercase mb-1.5 sm:mb-2 ${eyebrowColor}`}
                >
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2
                  className={`text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2.75rem] font-[800] tracking-[-0.04em] leading-[1.08] ${titleColor}`}
                >
                  {title}
                  {highlight ? (
                    <>
                      <br />
                      <span
                        className={
                          overlay === 'dark'
                            ? 'text-purple-200'
                            : 'bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent'
                        }
                      >
                        {highlight}
                      </span>
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
