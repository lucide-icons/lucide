import { PageData } from 'vitepress';

export default async function getStructuredData(iconName: string, pageData: PageData) {
  const url = `https://lucide.dev/icons/${iconName}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    name: pageData.title,
    description: pageData.description,
    url,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Lucide Icons',
      url: 'https://lucide.dev',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Icons', item: 'https://lucide.dev/icons' },
        { '@type': 'ListItem', position: 2, name: iconName, item: url },
      ],
    },
    mainEntity: {
      '@type': 'ImageObject',
      '@id': `${url}#icon`,
      name: iconName,
      // TODO: Add support for description extraction from icon metadata
      // description: 'An ...SVG icon from the Lucide icon set.',
      contentUrl: `https://lucide.dev/api/icons/${iconName}}?width=24&height=24&background=white`,
      thumbnailUrl: `https://lucide.dev/api/icons/${iconName}}?width=256&height=256&background=white`,
      encodingFormat: 'image/svg+xml',
      keywords: pageData.params?.tags,
      width: 24,
      height: 24,
      creator: {
        '@type': 'Organization',
        name: 'Lucide Icons',
      },
      datePublished: pageData?.params?.createdRelease?.date,
      dateModified: pageData?.params?.changedRelease?.date,
    },
  };
}
