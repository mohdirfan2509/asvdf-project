import { ServiceRoutePage, serviceGenerateMetadata } from '@/lib/seo/service-page';

export const revalidate = 60;
export const generateMetadata = serviceGenerateMetadata('grooveCutting');
export default ServiceRoutePage({
  copyKey: 'grooveCutting',
  crumbs: [{ name: 'Services', path: '/services' }],
});
