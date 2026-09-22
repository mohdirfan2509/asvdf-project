import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('bangalore');
export default ServiceRoutePage({
  copyKey: 'bangalore',
  crumbs: [{ name: 'VDF Flooring', path: '/vdf-flooring' }],
});
