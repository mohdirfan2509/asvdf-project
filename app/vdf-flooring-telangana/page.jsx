import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('telangana');
export default ServiceRoutePage({
  copyKey: 'telangana',
  crumbs: [{ name: 'VDF Flooring', path: '/vdf-flooring' }],
});
