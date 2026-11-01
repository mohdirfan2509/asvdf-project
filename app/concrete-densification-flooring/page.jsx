import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('concreteDensification');
export default ServiceRoutePage({
  copyKey: 'concreteDensification',
  crumbs: [{ name: 'Services', path: '/services' }],
});
