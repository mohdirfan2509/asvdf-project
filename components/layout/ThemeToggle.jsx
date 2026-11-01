'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { isDarkTheme, setDarkTheme } from '@/lib/theme';

/** Dark-mode switch (site menu, admin sidebar). */
export default function ThemeToggle() {
  // The server cannot know the theme, so start "off" and read the live theme after hydration.
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(isDarkTheme()), []);

  function toggle() {
    setDarkTheme(!dark);
    setDark(!dark);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      onClick={toggle}
      className="flex w-full items-center justify-between gap-3 rounded-control px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface hover:text-brand"
    >
      <span className="flex items-center gap-2.5">
        {dark ? <Moon className="h-4 w-4" aria-hidden /> : <Sun className="h-4 w-4" aria-hidden />}
        Dark mode
      </span>
      <span
        aria-hidden
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
          dark ? 'bg-brand-solid' : 'bg-surface-sunken shadow-neu-inset'
        }`}
      >
        <span
          className={`absolute left-0.5 h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0/0.3)] transition-transform duration-200 motion-reduce:transition-none ${
            dark ? 'translate-x-5' : ''
          }`}
        />
      </span>
    </button>
  );
}
