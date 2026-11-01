'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CheckCircle2, CircleAlert, X } from 'lucide-react';

const ToastContext = createContext(() => {});

/** `notify(message, 'success' | 'error')` from any admin component. */
export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id) => setToasts((list) => list.filter((toast) => toast.id !== id)), []);

  const notify = useCallback(
    (message, tone = 'success') => {
      const id = ++nextId.current;
      setToasts((list) => [...list.slice(-2), { id, message, tone }]);
      setTimeout(() => dismiss(id), tone === 'error' ? 6000 : 3500);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-3 bottom-3 z-[90] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:items-end"
      >
        {toasts.map(({ id, message, tone }) => {
          const Icon = tone === 'error' ? CircleAlert : CheckCircle2;
          return (
            <div
              key={id}
              role={tone === 'error' ? 'alert' : 'status'}
              className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-card border border-edge bg-surface-raised px-4 py-3 text-sm text-ink shadow-neu-lg"
            >
              <Icon
                className={`mt-0.5 h-4 w-4 shrink-0 ${tone === 'error' ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}
                aria-hidden
              />
              <p className="min-w-0 flex-1 leading-snug">{message}</p>
              <button type="button" onClick={() => dismiss(id)} aria-label="Dismiss" className="text-ink-muted hover:text-ink">
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
