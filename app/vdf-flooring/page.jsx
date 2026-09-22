import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('vdfFlooring');
export default ServiceRoutePage({
  copyKey: 'vdfFlooring',
  crumbs: [{ name: 'Services', path: '/services' }],
});
