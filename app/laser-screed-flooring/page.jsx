import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('laserScreed');
export default ServiceRoutePage({
  copyKey: 'laserScreed',
  crumbs: [{ name: 'Services', path: '/services' }],
});
