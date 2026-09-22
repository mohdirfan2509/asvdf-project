import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('concrete');
export default ServiceRoutePage({
  copyKey: 'concrete',
  crumbs: [{ name: 'Services', path: '/services' }],
});
