import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('barBending');
export default ServiceRoutePage({
  copyKey: 'barBending',
  crumbs: [{ name: 'Services', path: '/services' }],
});
