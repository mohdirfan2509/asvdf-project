import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('maharashtra');
export default ServiceRoutePage({
  copyKey: 'maharashtra',
  crumbs: [{ name: 'VDF Flooring', path: '/vdf-flooring' }],
});
