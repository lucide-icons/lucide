import { type PageData } from 'vitepress';
import getStructuredData from './getStructuredData';
import { createGeneralOGImage, createIconOGImage } from './createOGImage';

export async function transformPageData(pageData: PageData) {
  pageData.frontmatter.head ??= [];
  if (pageData.relativePath.startsWith('icons/') && pageData.params?.name) {
    const isLab = pageData.relativePath.startsWith('icons/lab/');
    const iconName = pageData.params.name;
    pageData.title = `${iconName} icon details`;

    const taggedAs = pageData.params?.tags?.length
      ? `Tagged as: ${pageData.params.tags.join(', ')}.`
      : '';
    const categorizedIn = pageData.params?.category?.length
      ? `Categorized in: ${pageData.params.category.join(', ')}.`
      : '';

    pageData.description =
      `Details and related icons for ${iconName} icon. ${taggedAs} ${categorizedIn}`.trim();

    const structuredData = await getStructuredData(iconName, pageData);

    // `createIconOGImage` reads the SVG from `icons/`, where lab icons don't live.
    if (!isLab) {
      const ogPath = await createIconOGImage(iconName, pageData.params?.tags || []);

      if (ogPath) {
        const content = `https://lucide.dev${ogPath}`;
        pageData.frontmatter.head.push(
          [
            'meta',
            {
              property: 'og:image',
              content,
            },
          ],
          [
            'meta',
            {
              property: 'twitter:image',
              content,
            },
          ],
        );
      }
    }

    pageData.frontmatter.head.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify(structuredData),
    ]);
  }

  if (pageData.relativePath.startsWith('guide/')) {
    const ogPath = await createGeneralOGImage(pageData);

    if (ogPath) {
      const content = `https://lucide.dev${ogPath}`;
      pageData.frontmatter.head.push(
        [
          'meta',
          {
            property: 'og:image',
            content,
          },
        ],
        [
          'meta',
          {
            property: 'twitter:image',
            content,
          },
        ],
      );
    }
  }
}
