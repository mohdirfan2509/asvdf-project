import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('floorHardener');
export default ServiceRoutePage({
  copyKey: 'floorHardener',
  crumbs: [{ name: 'Services', path: '/services' }],
});
