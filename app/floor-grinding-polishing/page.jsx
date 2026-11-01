import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('grindingPolishing');
export default ServiceRoutePage({
  copyKey: 'grindingPolishing',
  crumbs: [{ name: 'Services', path: '/services' }],
});
