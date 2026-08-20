import {
  Award,
  Building2,
  Clock,
  Cog,
  Handshake,
  HardHat,
  Lightbulb,
  Settings,
  Shield,
  ShieldCheck,
  Target,
  Users,
  Zap,
  Ruler,
} from 'lucide-react';

const ICON_MAP = {
  award: Award,
  building: Building2,
  building2: Building2,
  clock: Clock,
  cog: Cog,
  handshake: Handshake,
  hardhat: HardHat,
  lightbulb: Lightbulb,
  settings: Settings,
  shield: Shield,
  'shield-check': ShieldCheck,
  shieldcheck: ShieldCheck,
  target: Target,
  users: Users,
  zap: Zap,
  ruler: Ruler,
};

/** Resolve CMS string icons or component refs; never return undefined. */
export function resolveIcon(icon, fallback = Shield) {
  if (typeof icon === 'function') return icon;
  if (typeof icon === 'string') {
    const key = icon.trim().toLowerCase().replace(/\s+/g, '-');
    return ICON_MAP[key] || fallback;
  }
  return fallback;
}
