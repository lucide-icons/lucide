/* eslint-disable import/no-extraneous-dependencies */
import base64SVG from '@lucide/build-icons/utils/base64SVG.mjs';

export default ({ componentName, iconName, children, getSvg, deprecated, deprecationReason }) => {
  const svgContents = getSvg();
  const svgBase64 = base64SVG(svgContents);

  return `
import defaultAttributes from '../defaultAttributes';
import type { IconNode } from '../types';

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
const ${componentName}: IconNode = [
  'svg',
  defaultAttributes,
  ${JSON.stringify(children)}
];

export default ${componentName};
`;
};
