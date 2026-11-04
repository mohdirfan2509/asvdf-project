'use client';

import { useEffect, useState } from 'react';

/** Same screens as the `fit:` variant in app/globals.css. */
const FIT_QUERY = '(min-width: 1024px) and (orientation: landscape)';
/** Phones: below Tailwind's `sm` breakpoint, matching the `max-sm:` utilities. */
const PHONE_QUERY = '(max-width: 639.98px)';

function useMediaQuery(query, enabled) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (!enabled) return undefined;
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener('change', update);
    return () => list.removeEventListener('change', update);
  }, [query, enabled]);
  return enabled && matches;
}

/**
 * Whether a homepage section should use its one-screen layout (`fit`), and whether the screen is at least
 * `tallMinHeight` px tall, enough for two rows of cards (`tall`). Always false until mounted, so server and
 * client markup match.
 */
export function useFitLayout(enabled = false, tallMinHeight = 900) {
  const fit = useMediaQuery(FIT_QUERY, enabled);
  const tall = useMediaQuery(`(min-height: ${tallMinHeight}px)`, enabled);
  return { fit, tall: fit && tall };
}

/** Whether a homepage section should use its short phone layout (fewer items plus "view all"). */
export function usePhoneLayout(enabled = false) {
  return useMediaQuery(PHONE_QUERY, enabled);
}
