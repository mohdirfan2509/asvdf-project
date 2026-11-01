/** Shared admin building blocks, styled with the website's neumorphic design tokens. */

export const inputClass =
  'w-full rounded-control border border-edge bg-surface-raised px-3.5 py-2.5 text-sm text-ink shadow-neu-inset placeholder:text-ink-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:opacity-60';

export const iconButtonClass =
  'icon-well h-10 w-10 text-ink-muted transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 disabled:opacity-50';

export function PageHeader({ title, description, action, children }) {
  return (
    <header className="surface-raised rounded-panel p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">{title}</h1>
          {description ? <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
    </header>
  );
}

/** Accessible on/off switch (role="switch"); `label` is read by screen readers and optionally shown. */
export function Switch({ checked, onChange, label, showLabel = false, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={showLabel ? undefined : label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-2.5 rounded-full text-sm font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 disabled:opacity-60"
    >
      <span
        aria-hidden
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
          checked ? 'bg-brand-solid' : 'bg-surface-sunken shadow-neu-inset'
        }`}
      >
        <span
          className={`absolute left-0.5 h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0/0.3)] transition-transform duration-200 motion-reduce:transition-none ${
            checked ? 'translate-x-5' : ''
          }`}
        />
      </span>
      {showLabel ? <span>{label}</span> : null}
    </button>
  );
}

const PILL_TONES = {
  live: 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-300',
  hidden: 'bg-surface-sunken text-ink-muted',
  warn: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  brand: 'bg-brand-soft text-brand',
};

export function Pill({ tone = 'brand', children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${PILL_TONES[tone]} ${className}`}>
      {children}
    </span>
  );
}

export function StatusDot({ ok }) {
  return <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full ${ok ? 'bg-emerald-500' : 'bg-amber-500'}`} />;
}
