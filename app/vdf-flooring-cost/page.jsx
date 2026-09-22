import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('cost');
export default ServiceRoutePage({
  copyKey: 'cost',
  crumbs: [{ name: 'VDF Flooring', path: '/vdf-flooring' }],
});
