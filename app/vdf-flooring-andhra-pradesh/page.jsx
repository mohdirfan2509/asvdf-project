import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('andhraPradesh');
export default ServiceRoutePage({
  copyKey: 'andhraPradesh',
  crumbs: [{ name: 'VDF Flooring', path: '/vdf-flooring' }],
});
