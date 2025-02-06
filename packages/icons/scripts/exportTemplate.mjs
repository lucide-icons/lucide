/* eslint-disable import/no-extraneous-dependencies */
import base64SVG from '@lucide/build-icons/utils/base64SVG.mjs';
import { toCamelCase } from '@lucide/helpers';

export default ({ iconName, children, getSvg, deprecated, deprecationReason }) => {
  const svgContents = getSvg();
  const svgBase64 = base64SVG(svgContents);
  const exportName = toCamelCase(iconName)

  return `
/**
 * @name ${iconName}
 * @description Lucide SVG string.
 *
 * @preview ![img](data:image/svg+xml;base64,${svgBase64}) - https://lucide.dev/icons/${iconName}
 *
 * @returns {IconNode}
 * ${deprecated ? `@deprecated ${deprecationReason}` : ''}
 */
const ${exportName}: string = ${JSON.stringify(children)}

export default ${exportName};
`;
};
