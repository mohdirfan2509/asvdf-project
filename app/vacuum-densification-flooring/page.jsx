import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('vacuumDensification');
export default ServiceRoutePage({
  copyKey: 'vacuumDensification',
  crumbs: [{ name: 'Services', path: '/services' }],
});
