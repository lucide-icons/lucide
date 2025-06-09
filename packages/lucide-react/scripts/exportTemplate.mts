import base64SVG from '@lucide/build-icons/utils/base64SVG';
import defineExportTemplate from '@lucide/build-icons/utils/defineExportTemplate';

export default defineExportTemplate(async({
  componentName,
  iconName,
  children,
  getSvg,
  deprecated,
  deprecationReason,
}) => {
  const svgContents = await getSvg();
  const svgBase64 = base64SVG(svgContents);

  return `
import createLucideIcon from '../createLucideIcon';
import { IconNode } from '../types';

export const __iconNode: IconNode = ${JSON.stringify(children)}

/**
 * @component @name ${componentName}
 * @description Lucide SVG icon component, renders SVG Element with children.
 *
 * @preview ![img](data:image/svg+xml;base64,${svgBase64}) - https://lucide.dev/icons/${iconName}
 * @see https://lucide.dev/guide/packages/lucide-react - Documentation
 *
 * @param {Object} props - Lucide icons props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 * ${deprecated ? `@deprecated ${deprecationReason}` : ''}
 */
const ${componentName} = createLucideIcon('${iconName}', __iconNode);

export default ${componentName};
`;
});
