/* eslint-disable import/no-extraneous-dependencies */
import base64SVG from '@lucide/build-icons/utils/base64SVG.mjs';
import { toCamelCase } from '@lucide/helpers';

export default ({ componentName, iconName, children, getSvg, deprecated }) => {
  const svgContents = getSvg();
  const svgBase64 = base64SVG(svgContents);

  return `
import type { IconNode } from '../types';

/**
 * @name ${iconName}
 * @description Lucide Lab SVG icon node.
 *
 * @preview ![img](data:image/svg+xml;base64,${svgBase64}) - https://lucide.dev/icons/${iconName}
 * @see https://lucide.dev/guide/packages/lucide - Documentation
 *
 * @returns {Array}
 * ${deprecated ? '@deprecated' : ''}
 */
const ${toCamelCase(componentName)}: IconNode = ${JSON.stringify(children)};

export default ${toCamelCase(componentName)};
`;
};
