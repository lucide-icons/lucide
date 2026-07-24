import base64SVG from '@lucide/build-icons/utils/base64SVG';
import defineExportTemplate from '@lucide/build-icons/utils/defineExportTemplate';

export default defineExportTemplate(async ({ componentName, iconName, getSvg, deprecated, deprecationReason }) => {
  let svgContents = await getSvg();
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
 * ${deprecated ? `@deprecated ${deprecationReason}` : ''}
 */
const ${componentName}: string = \`\
${svgContents}\
\`

export default ${componentName};
`;
});
