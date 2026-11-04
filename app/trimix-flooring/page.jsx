import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('trimix');
export default ServiceRoutePage({
  copyKey: 'trimix',
  crumbs: [{ name: 'VDF Flooring', path: '/vdf-flooring' }],
});
