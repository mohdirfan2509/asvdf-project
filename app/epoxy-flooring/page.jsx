import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('epoxyFlooring');
export default ServiceRoutePage({
  copyKey: 'epoxyFlooring',
  crumbs: [{ name: 'Services', path: '/services' }],
});
