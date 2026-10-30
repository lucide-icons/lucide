import { PageData } from 'vitepress';

/**
 * Mirrors the notices in the repo's LICENSE file, which is bumped by hand — keep the
 * year here in step with it.
 */
const LUCIDE_COPYRIGHT = 'Copyright (c) 2026 Lucide Icons and Contributors';
const FEATHER_COPYRIGHT = 'Copyright (c) 2013-present Cole Bemis';
const LICENSE_URL = 'https://lucide.dev/license';

export default async function getStructuredData(iconName: string, pageData: PageData) {
  const params = pageData.params ?? {};
  const isLab = params.externalLibrary === 'lab';
  const url = `https://lucide.dev/icons/${isLab ? 'lab/' : ''}${iconName}`;

  const awaitingRelease = Boolean(params.awaitingRelease);

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
      // `/api/icons/<name>` only renders core icons, a lab name would 404 there.
      ...(isLab
        ? {}
        : {
            contentUrl: `https://lucide.dev/api/icons/${iconName}?width=24&height=24&background=white`,
            thumbnailUrl: `https://lucide.dev/api/icons/${iconName}?width=256&height=256&background=white`,
          }),
      encodingFormat: 'image/svg+xml',
      keywords: params.tags,
      width: 24,
      height: 24,
      creator: {
        '@type': 'Organization',
        name: 'Lucide Icons',
      },
      license: LICENSE_URL,
      acquireLicensePage: LICENSE_URL,
      // The Feather-derived icons are MIT © Cole Bemis; everything else is ISC. Lab
      // icons carry no release metadata, so they fall to the ISC-only notice.
      copyrightNotice: params.fromFork
        ? `${LUCIDE_COPYRIGHT}; ${FEATHER_COPYRIGHT}`
        : LUCIDE_COPYRIGHT,
      creditText: 'Lucide Icons',
      // Both dates fall back to the date of the fork for unreleased icons, so neither
      ...(awaitingRelease
        ? {}
        : {
            ...(params.createdRelease?.date ? { datePublished: params.createdRelease.date } : {}),
            ...(params.changedRelease?.date ? { dateModified: params.changedRelease.date } : {}),
          }),

      // Custom attributes, picked up by the Algolia crawler to rank and sort the icon
      // index. Not schema.org vocabulary, consumers that don't know them ignore them.
      popularity: params.popularity ?? 0,
      awaitingRelease,
    },
  };
}
