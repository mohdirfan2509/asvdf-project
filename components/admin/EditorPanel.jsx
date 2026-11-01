'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, LoaderCircle, X } from 'lucide-react';
import ImageField from '@/components/admin/ImageField';
import { Switch, inputClass } from '@/components/admin/ui';
import { slugify } from '@/lib/seo/slug';

function fieldValue(field, value) {
  if (field.type === 'tags') return Array.isArray(value) ? value.join(', ') : value || '';
  return value ?? '';
}

/**
 * Slide-over editor (full screen on phones). `fields` describe the form; a field with `slugFrom`
 * follows that field's text until it is edited by hand.
 */
export default function EditorPanel({ open, heading, fields, draft, errors, saving, onChange, onSave, onRequestClose, onError }) {
  const dialogRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function update(field, value) {
    const next = { ...draft, [field.name]: value };
    for (const other of fields) {
      if (other.slugFrom === field.name && (!draft[other.name] || draft[other.name] === slugify(draft[field.name]))) {
        next[other.name] = slugify(value);
      }
    }
    onChange(next);
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        onRequestClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) onRequestClose();
      }}
      aria-labelledby="editor-title"
      className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-full border-0 bg-transparent p-0 text-ink backdrop:bg-slate-950/45 backdrop:backdrop-blur-[2px] sm:w-[34rem] sm:p-3"
    >
      {draft ? (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
          className="flex h-full flex-col overflow-hidden bg-surface-raised shadow-neu-lg sm:rounded-panel sm:border sm:border-edge"
        >
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <h2 id="editor-title" className="min-w-0 flex-1 truncate text-lg font-bold tracking-tight">
              {heading}
            </h2>
            <button type="button" onClick={onRequestClose} aria-label="Close editor" className="icon-well h-9 w-9 text-ink-muted hover:text-brand">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
            {fields.map((field) => {
              const id = `field-${field.name}`;
              const error = errors[field.name];
              const describedBy = [field.hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(' ') || undefined;
              const common = {
                id,
                name: field.name,
                'aria-invalid': error ? true : undefined,
                'aria-describedby': describedBy,
                className: `${inputClass} ${error ? '!border-red-400' : ''}`,
              };
              return (
                <div key={field.name}>
                  <label htmlFor={field.type === 'image' ? undefined : id} className="mb-1.5 block text-sm font-semibold text-ink">
                    {field.label}
                    {field.required ? <span className="text-red-600 dark:text-red-400" aria-hidden> *</span> : null}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      {...common}
                      rows={field.rows || 4}
                      value={fieldValue(field, draft[field.name])}
                      onChange={(e) => update(field, e.target.value)}
                      className={`${common.className} resize-y leading-relaxed`}
                    />
                  ) : field.type === 'select' ? (
                    <select {...common} value={draft[field.name] || ''} onChange={(e) => update(field, e.target.value)}>
                      <option value="">Choose…</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'image' ? (
                    <ImageField
                      value={draft[field.name] || ''}
                      onChange={(url) => update(field, url)}
                      onError={onError}
                      onBusyChange={setUploading}
                      contain={field.contain}
                      invalid={Boolean(error)}
                    />
                  ) : (
                    <input
                      {...common}
                      type="text"
                      placeholder={field.placeholder}
                      value={fieldValue(field, draft[field.name])}
                      onChange={(e) => update(field, e.target.value)}
                    />
                  )}
                  {field.hint ? (
                    <p id={`${id}-hint`} className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                      {field.hint}
                    </p>
                  ) : null}
                  {error ? (
                    <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                      {error}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-line px-5 py-4">
            <Switch
              checked={draft.featured === true}
              onChange={(visible) => onChange({ ...draft, featured: visible, published: true })}
              label={draft.featured ? 'Visible on website' : 'Hidden from website'}
              showLabel
            />
            <div className="ml-auto flex gap-2">
              <button type="button" onClick={onRequestClose} className="btn-secondary h-11 px-4 text-sm">
                Cancel
              </button>
              <button type="submit" disabled={saving || uploading} className="btn-primary h-11 px-5 text-sm disabled:opacity-60">
                {saving ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> : <Check className="h-4 w-4" aria-hidden />}
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      ) : null}
    </dialog>
  );
}
