import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('india');
export default ServiceRoutePage({
  copyKey: 'india',
  crumbs: [{ name: 'VDF Flooring', path: '/vdf-flooring' }],
});
