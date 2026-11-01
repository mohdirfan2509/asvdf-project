/** Browser-side bookkeeping for the timed callback dialog (see components/layout/CallbackDialog.jsx). */

export const CALLBACK_DELAY_MS = 15_000;
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;

const STATE_KEY = 'asvdf-callback';
const VISIT_START_KEY = 'asvdf-visit-start';

function read() {
  try {
    return JSON.parse(localStorage.getItem(STATE_KEY) || 'null');
  } catch {
    return null;
  }
}

function write(state) {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {
    // Storage can be blocked (private mode); the dialog then simply shows again on a later visit.
  }
}

/** True once the visitor has sent their number or the contact form, or closed the dialog within the last 7 days. */
export function isCallbackSuppressed() {
  const state = read();
  if (!state) return false;
  if (state.done) return true;
  return Number(state.snoozedAt) > Date.now() - SNOOZE_MS;
}

export function markCallbackDone() {
  write({ done: true });
}

export function snoozeCallback() {
  write({ snoozedAt: Date.now() });
}

/** Milliseconds left until the dialog is due, counted from the first page of this browser session. */
export function msUntilCallbackDue() {
  let start = Date.now();
  try {
    const saved = Number(sessionStorage.getItem(VISIT_START_KEY));
    if (saved > 0) start = saved;
    else sessionStorage.setItem(VISIT_START_KEY, String(start));
  } catch {
    // Without session storage the countdown starts from this page.
  }
  return Math.max(0, start + CALLBACK_DELAY_MS - Date.now());
}
