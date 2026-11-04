import { Clock, Shield, ShieldCheck, Users } from 'lucide-react';

const FEATURES = [
  {
    icon: Shield,
    title: 'Advanced Technology',
    text: 'World-class machinery and modern techniques.',
  },
  {
    icon: Users,
    title: 'Experienced Team',
    text: 'Skilled professionals delivering precision and quality.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    text: 'Committed to safety, quality and timely delivery.',
  },
  {
    icon: Clock,
    title: 'On-time Delivery',
    text: 'We value time and ensure projects stay on schedule.',
  },
];

export default function HomeFeatures() {
  return (
    <ul aria-label="Why choose ASVDF Flooring" className="grid grid-cols-1 sm:grid-cols-2 max-sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-sm:gap-2.5 lg:gap-5">
      {FEATURES.map(({ icon: Icon, title, text }) => (
        <li
          key={title}
          className="home-feature surface-raised shadow-float rounded-card h-full p-4 sm:p-5 max-sm:p-3 flex max-sm:flex-col items-start max-sm:items-center max-sm:text-center gap-4 max-sm:gap-2 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <span className="home-feature__icon icon-well w-12 h-12 sm:w-14 sm:h-14 max-sm:h-9 max-sm:w-9">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 max-sm:h-4 max-sm:w-4" strokeWidth={1.6} aria-hidden />
          </span>
          <div className="min-w-0 pt-0.5 max-sm:pt-0">
            <h2 className="text-[15px] max-sm:text-[13px] font-semibold leading-snug text-ink">{title}</h2>
            <p className="mt-1 max-sm:mt-0.5 text-[13px] max-sm:text-xs leading-relaxed max-sm:leading-snug text-ink-muted">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
