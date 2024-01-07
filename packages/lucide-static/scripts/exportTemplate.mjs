/* eslint-disable import/no-extraneous-dependencies */
import base64SVG from '@lucide/build-icons/utils/base64SVG.mjs';

export default ({ componentName, iconName, children, getSvg, deprecated }) => {
  let svgContents = getSvg();
  const svgBase64 = base64SVG(svgContents);

  svgContents = svgContents.replace(
    '<svg',
    `
<svg
  class="lucide lucide-${iconName}"`,
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
 * ${deprecated ? '@deprecated' : ''}
 */
const ${componentName}: string = \`\
${svgContents}\
\`

export default ${componentName};
`;
};
