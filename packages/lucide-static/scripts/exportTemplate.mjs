/* eslint-disable import/no-extraneous-dependencies */
import base64SVG from '@lucide/build-icons/utils/base64SVG.mjs';

export default async ({ componentName, iconName, getSvg, deprecated, deprecationReason, iconNameAliases = [] }) => {
  let svgContents = await getSvg();
  const svgBase64 = base64SVG(svgContents);

  const iconClassNames = [iconName, ...iconNameAliases].map((aliasName) => `lucide-${aliasName}`).join(' ')

  svgContents = svgContents.replace(
    '<svg',
    `
<svg
  class="lucide ${iconClassNames}"`,
  );

  return `
/**
 * @name ${iconName}
 * @description Lucide SVG string.
 *
 * @preview ![img](data:image/svg+xml;base64,${svgBase64}) - https://lucide.dev/icons/${iconName}
 * @see https://lucide.dev/guide/packages/lucide-static - Documentation
 *
 * @returns {String}
 * ${deprecated ? `@deprecated ${deprecationReason}` : ''}
 */
const ${componentName}: string = \`\
${svgContents}\
\`

export default ${componentName};
`;
};
