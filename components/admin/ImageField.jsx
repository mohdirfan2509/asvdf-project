'use client';

import { useId, useRef, useState } from 'react';
import { ImagePlus, LoaderCircle, RefreshCw, Trash2 } from 'lucide-react';

const ACCEPT = 'image/jpeg,image/png,image/webp,image/gif,image/avif';

async function uploadFile(file) {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Upload failed. Please try again.');
  return data.url;
}

/** Photo picker with drag-and-drop, preview, replace and remove. `contain` suits logos. */
export default function ImageField({ value, onChange, onError, onBusyChange, contain = false, invalid = false }) {
  const inputId = useId();
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function handle(file) {
    if (!file) return;
    setUploading(true);
    onBusyChange?.(true);
    try {
      onChange(await uploadFile(file));
    } catch (err) {
      onError?.(err.message);
    } finally {
      setUploading(false);
      onBusyChange?.(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div>
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handle(e.dataTransfer.files?.[0]);
        }}
        className={`relative flex aspect-[16/9] cursor-pointer items-center justify-center overflow-hidden rounded-card border-2 border-dashed transition-colors ${
          dragging ? 'border-brand bg-brand-soft' : invalid ? 'border-red-400 bg-surface-sunken' : 'border-line bg-surface-sunken hover:border-brand-line'
        }`}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className={`h-full w-full ${contain ? 'bg-white object-contain p-4' : 'object-cover'}`} />
        ) : (
          <span className="flex flex-col items-center gap-2 px-4 text-center text-sm text-ink-muted">
            <span className="icon-well h-12 w-12">
              <ImagePlus className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="font-semibold text-brand">Choose a photo</span> or drag it here
            </span>
            <span className="text-xs">JPG, PNG, WebP, GIF or AVIF · up to 8 MB</span>
          </span>
        )}
        {uploading ? (
          <span className="absolute inset-0 flex items-center justify-center gap-2 bg-surface/80 text-sm font-semibold text-ink">
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> Uploading…
          </span>
        ) : null}
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          disabled={uploading}
          onChange={(e) => handle(e.target.files?.[0])}
        />
      </label>

      {value ? (
        <div className="mt-2.5 flex gap-2">
          <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="btn-secondary h-9 px-3.5 text-xs">
            <RefreshCw className="h-3.5 w-3.5" aria-hidden /> Replace
          </button>
          <button
            type="button"
            onClick={() => onChange('')}
            disabled={uploading}
            className="btn-secondary h-9 px-3.5 text-xs hover:!text-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden /> Remove
          </button>
        </div>
      ) : null}
    </div>
  );
}
