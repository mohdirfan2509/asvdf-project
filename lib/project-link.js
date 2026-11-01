/** Project pop-up links (/projects?project=<slug>), browser-side only. */

export const OPEN_PROJECT_EVENT = 'asvdf:open-project';

/**
 * When `href` points at a project on the page already open, opens its pop-up without navigating
 * (a same-page soft navigation would not re-run the page). Returns true when handled.
 */
export function openProjectInPlace(href) {
  const url = new URL(href, window.location.origin);
  const slug = url.searchParams.get('project');
  if (!slug || url.pathname !== window.location.pathname) return false;

  const params = new URLSearchParams(window.location.search);
  params.set('project', slug);
  window.history.replaceState(null, '', `${window.location.pathname}?${params}${window.location.hash}`);
  window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: slug }));
  return true;
}
