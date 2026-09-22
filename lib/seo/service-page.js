import { PAGE_COPY } from '@/lib/seo/page-content';
import { buildMetadata } from '@/lib/seo/metadata';
import { graph, organizationNode, breadcrumbNode, serviceNode, faqNode } from '@/lib/seo/schema';
import { getSiteSettings } from '@/lib/content/queries';
import ServicePageView from '@/components/marketing/ServicePageView';

export function serviceGenerateMetadata(copyKey) {
  return async function generateMetadata() {
    const copy = PAGE_COPY[copyKey];
    return buildMetadata({
      title: copy.title,
      description: copy.description,
      path: copy.path,
    });
  };
}

export function ServiceRoutePage({ copyKey, crumbs }) {
  return async function Page() {
    const settings = await getSiteSettings();
    const copy = PAGE_COPY[copyKey];
    const breadcrumbs = [{ name: 'Home', path: '/' }, ...crumbs, { name: copy.h1, path: copy.path }];
    const jsonLd = graph([
      organizationNode(settings),
      breadcrumbNode(breadcrumbs),
      serviceNode({
        name: copy.h1,
        description: copy.description,
        path: copy.path,
        settings,
      }),
      faqNode(copy.faqs),
    ]);

    return (
      <ServicePageView
        settings={settings}
        copy={copy}
        breadcrumbs={breadcrumbs}
        jsonLd={jsonLd}
      />
    );
  };
}
