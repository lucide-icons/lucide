import { LucideBuildParams, LucideIcon, LucideIconNode } from './types';
import buildLucideIconNode from './buildLucideIconNode';

const buildDomNode = ([tagName, attributes, children = []]: LucideIconNode): string =>
  `<${tagName} ${Object.entries(attributes)
    .map(([attrName, value]) => `${attrName}="${value}"`)
    .join(' ')}>${children?.map((child) => buildDomNode(child)).join('')}</${tagName}>`;

function buildLucideSvg(icon: LucideIcon, params: LucideBuildParams = {}) {
  return buildDomNode(buildLucideIconNode(icon, params));
}

export default buildLucideSvg;
