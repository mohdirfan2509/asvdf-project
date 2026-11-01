import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('pqcFlooring');
export default ServiceRoutePage({
  copyKey: 'pqcFlooring',
  crumbs: [{ name: 'Services', path: '/services' }],
});
