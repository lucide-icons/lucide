import buildLucideIconNode from './buildLucideIconNode';
import type { LucideBuildParams, LucideIconData, LucideIconNode } from './types';

/**
 * Creates a React-compatible Lucide icon node (an svgson-like format) from a Lucide icon object.
 *
 * @param icon The icon to build.
 * @param params Additional build parameters.
 */
function buildLucideIconForReact(
  icon: LucideIconData,
  params: LucideBuildParams = {},
): LucideIconNode {
  return buildLucideIconNode(icon, {
    ...params,
    attributeNames: {
      ...params.attributeNames,
      class: 'className',
      'stroke-width': 'strokeWidth',
      'stroke-linecap': 'strokeLinecap',
      'stroke-linejoin': 'strokeLinejoin',
      'vector-effect': 'vectorEffect',
    },
  });
}

export default buildLucideIconForReact;
