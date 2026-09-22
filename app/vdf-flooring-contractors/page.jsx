import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('contractors');
export default ServiceRoutePage({
  copyKey: 'contractors',
  crumbs: [{ name: 'VDF Flooring', path: '/vdf-flooring' }],
});
