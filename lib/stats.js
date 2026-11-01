/** Year ASVDF Flooring was founded; "Years of experience" counts up from it every 1 January. */
export const FOUNDED_YEAR = 2014;

/** Figures fixed in code rather than the admin panel. */
const FIXED_STATS = {
  stat_years: () => `${new Date().getFullYear() - FOUNDED_YEAR}+`,
  stat_satisfaction: () => '99%',
};

/** The only figures editable in the admin panel (Admin → Numbers), with their fallbacks. */
export const STAT_DEFAULTS = {
  stat_projects: '100+',
  stat_clients: '50+',
  stat_industries: '8+',
};

export const EDITABLE_STAT_KEYS = Object.keys(STAT_DEFAULTS);

export function statValue(settings, key) {
  if (FIXED_STATS[key]) return FIXED_STATS[key]();
  return settings?.[key] || STAT_DEFAULTS[key];
}
