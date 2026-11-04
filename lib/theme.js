/** Light/dark theme for the website and the admin panel (one shared setting). */

export const THEME_STORAGE_KEY = 'asvdf-theme';
/** Browser UI colour (mobile address bar) per theme; matches --color-surface in app/globals.css. */
export const THEME_COLORS = { light: '#F1F2F7', dark: '#151821' };

function applyTheme(dark) {
  document.documentElement.classList.toggle('dark', dark);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? THEME_COLORS.dark : THEME_COLORS.light);
}

export function isDarkTheme() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
}

/** Applies the visitor's choice for the rest of this visit (this tab); a new visit follows the device again. */
export function setDarkTheme(dark) {
  applyTheme(dark);
  try {
    sessionStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light');
  } catch {
    // Storage blocked: the choice lasts until the page is reloaded.
  }
}

/**
 * Inlined in <head> so the theme is set before the first paint (no light flash). Follows the device's
 * colour-scheme setting, including live changes, unless the visitor picked a theme during this visit.
 * Clears choices that older versions of the site saved permanently in localStorage.
 */
export const THEME_SCRIPT = `(function(){try{
var root=document.documentElement,key=${JSON.stringify(THEME_STORAGE_KEY)},media=matchMedia('(prefers-color-scheme: dark)');
function apply(dark){root.classList.toggle('dark',dark);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',dark?${JSON.stringify(THEME_COLORS.dark)}:${JSON.stringify(THEME_COLORS.light)});}
function saved(){try{return sessionStorage.getItem(key);}catch(e){return null;}}
try{localStorage.removeItem(key);}catch(e){}
var s=saved();apply(s?s==='dark':media.matches);
media.addEventListener('change',function(e){if(!saved())apply(e.matches);});
document.addEventListener('DOMContentLoaded',function(){apply(root.classList.contains('dark'));});
}catch(e){}})();`;
