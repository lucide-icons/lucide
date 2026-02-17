/* eslint-disable import/no-extraneous-dependencies */
import base64SVG from '@lucide/build-icons/utils/base64SVG';

export default async ({
  componentName,
  iconName,
  getSvg,
  deprecated,
  deprecationReason,
  iconData,
}) => {
  const svgContents = await getSvg();
  const svgBase64 = base64SVG(svgContents);

  return `
import type { LucideIcon } from '../types';

/**
 * @name ${iconName}
 * @description Lucide SVG icon node.
 *
 * @preview ![img](data:image/svg+xml;base64,${svgBase64}) - https://lucide.dev/icons/${iconName}
 * @see https://lucide.dev/guide/packages/lucide - Documentation
 *
 * @returns {Array}
 * ${deprecated ? `@deprecated ${deprecationReason}` : ''}
 */
const ${componentName}: LucideIcon = ${JSON.stringify(iconData)}

export default ${componentName};
`;
};
