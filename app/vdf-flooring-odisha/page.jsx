import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('odisha');
export default ServiceRoutePage({
  copyKey: 'odisha',
  crumbs: [{ name: 'VDF Flooring', path: '/vdf-flooring' }],
});
