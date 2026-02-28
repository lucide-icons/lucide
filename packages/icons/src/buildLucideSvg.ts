import { LucideBuildParams, LucideIconData, LucideIconNode } from './types';
import buildLucideIconNode from './buildLucideIconNode';

const buildDomNode = ([tagName, attributes, children = []]: LucideIconNode): string =>
  `<${tagName} ${Object.entries(attributes)
    .map(([attrName, value]) => `${attrName}="${value}"`)
    .join(' ')}>${children?.map((child) => buildDomNode(child)).join('')}</${tagName}>`;

/**
 * Creates an SVG string from a Lucide icon object.
 *
 * @param icon The icon to build.
 * @param params Additional build parameters.
 */
function buildLucideSvg(icon: LucideIconData, params: LucideBuildParams = {}) {
  return buildDomNode(buildLucideIconNode(icon, params));
}

export default buildLucideSvg;
