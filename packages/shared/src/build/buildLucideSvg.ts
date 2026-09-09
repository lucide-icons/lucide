import buildLucideIconNode from './buildLucideIconNode';
import type { LucideBuildParams, LucideIconData, LucideIconNode } from './types';

const buildDomNode = ([tagName, attributes, children = []]: LucideIconNode): string =>
  `<${tagName} ${Object.entries(attributes)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([attrName, value]) => `${attrName}="${String(value)}"`)
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
