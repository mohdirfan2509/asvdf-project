import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('process');
export default ServiceRoutePage({
  copyKey: 'process',
  crumbs: [{ name: 'VDF Flooring', path: '/vdf-flooring' }],
});
