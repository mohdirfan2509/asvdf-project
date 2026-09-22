import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('chennai');
export default ServiceRoutePage({
  copyKey: 'chennai',
  crumbs: [{ name: 'VDF Flooring', path: '/vdf-flooring' }],
});
