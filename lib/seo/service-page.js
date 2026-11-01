import { PAGE_COPY } from '@/lib/seo/page-content';
import { buildMetadata } from '@/lib/seo/metadata';
import { graph, organizationNode, breadcrumbNode, serviceNode, faqNode } from '@/lib/seo/schema';
import { getSiteSettings } from '@/lib/content/queries';
import { serviceByPath } from '@/lib/content/services';
import ServicePageView from '@/components/marketing/ServicePageView';

export function serviceGenerateMetadata(copyKey) {
  return async function generateMetadata() {
    const copy = PAGE_COPY[copyKey];
    const service = serviceByPath(copy.path);
    return buildMetadata({
      title: copy.title,
      description: copy.description,
      path: copy.path,
      ...(service ? { image: service.shareImage } : {}),
    });
  };
}

export function ServiceRoutePage({ copyKey, crumbs }) {
  return async function Page() {
    const settings = await getSiteSettings();
    const copy = PAGE_COPY[copyKey];
    // The nine listed services show their photo as a banner; other marketing pages have none.
    const service = serviceByPath(copy.path);
    const breadcrumbs = [{ name: 'Home', path: '/' }, ...crumbs, { name: copy.h1, path: copy.path }];
    const jsonLd = graph([
      organizationNode(settings),
      breadcrumbNode(breadcrumbs),
      serviceNode({
        name: copy.h1,
        description: copy.description,
        path: copy.path,
        settings,
        image: service?.shareImage,
      }),
      faqNode(copy.faqs),
    ]);

    return (
      <ServicePageView
        settings={settings}
        copy={copy}
        breadcrumbs={breadcrumbs}
        jsonLd={jsonLd}
        image={service ? { src: service.image, alt: service.imageAlt } : null}
      />
    );
  };
}
