/** Fallback figures for the CMS statistics fields (Admin → Site Info → Numbers on website). */
export const STAT_DEFAULTS = {
  stat_projects: '100+',
  stat_clients: '50+',
  stat_years: '10+',
  stat_industries: '8+',
  stat_sqft: '1M+',
};

export function statValue(settings, key) {
  return settings?.[key] || STAT_DEFAULTS[key];
}
