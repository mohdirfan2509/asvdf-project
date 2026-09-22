import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('karnataka');
export default ServiceRoutePage({
  copyKey: 'karnataka',
  crumbs: [{ name: 'VDF Flooring', path: '/vdf-flooring' }],
});
