import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('hyderabad');
export default ServiceRoutePage({
  copyKey: 'hyderabad',
  crumbs: [{ name: 'VDF Flooring', path: '/vdf-flooring' }],
});
