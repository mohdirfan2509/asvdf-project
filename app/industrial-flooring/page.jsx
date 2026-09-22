import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('industrial');
export default ServiceRoutePage({
  copyKey: 'industrial',
  crumbs: [{ name: 'Services', path: '/services' }],
});
