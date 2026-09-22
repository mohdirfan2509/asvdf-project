import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('warehouse');
export default ServiceRoutePage({
  copyKey: 'warehouse',
  crumbs: [{ name: 'Services', path: '/services' }],
});
