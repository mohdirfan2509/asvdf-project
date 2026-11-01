'use client';

import { useEffect, useRef } from 'react';

/** Modal yes/no question; `danger` styles the confirm button red. Escape and the backdrop cancel. */
export default function ConfirmDialog({ open, title, message, confirmLabel = 'Confirm', danger = false, busy = false, onConfirm, onCancel }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        if (!busy) onCancel();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current && !busy) onCancel();
      }}
      aria-labelledby="confirm-title"
      className="m-auto w-[min(26rem,calc(100vw-2rem))] rounded-panel border border-edge bg-surface-raised p-0 text-ink shadow-neu-lg backdrop:bg-slate-950/50 backdrop:backdrop-blur-[2px]"
    >
      <div className="p-6">
        <h2 id="confirm-title" className="text-lg font-bold tracking-tight">
          {title}
        </h2>
        {message ? <p className="mt-2 text-sm leading-relaxed text-ink-muted">{message}</p> : null}
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} disabled={busy} className="btn-secondary h-11 px-5 text-sm">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            autoFocus
            className={
              danger
                ? 'inline-flex h-11 items-center justify-center rounded-control bg-red-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60'
                : 'btn-primary h-11 px-5 text-sm disabled:opacity-60'
            }
          >
            {busy ? 'Please wait…' : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
