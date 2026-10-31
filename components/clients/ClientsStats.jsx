import { Award, Building2, Handshake, Users } from 'lucide-react';
import OrbStatCards from '@/components/ui/OrbStatCards';
import { statValue } from '@/lib/stats';

const STATS = [
  { key: 'stat_clients', label: 'Happy Clients', icon: Handshake },
  { key: 'stat_industries', label: 'Industries Served', icon: Building2 },
  { key: 'stat_projects', label: 'Projects Completed', icon: Award },
  { key: 'stat_satisfaction', label: 'Client Satisfaction', icon: Users },
];

export default function ClientsStats({ settings }) {
  return <OrbStatCards items={STATS.map((stat) => ({ ...stat, value: statValue(settings, stat.key) }))} />;
}
