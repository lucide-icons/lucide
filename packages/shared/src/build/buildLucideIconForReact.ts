import buildLucideIconNode from './buildLucideIconNode';
import type { LucideBuildParams, LucideIconData, LucideIconNode, SVGProps } from './types';

/**
 * Creates a React-compatible Lucide icon node (an svgson-like format) from a Lucide icon object.
 *
 * @param icon The icon to build.
 * @param params Additional build parameters.
 */
function buildLucideIconForReact<TProps extends Record<string, unknown> = SVGProps>(
  icon: LucideIconData<string, TProps>,
  params: LucideBuildParams<TProps> = {} as LucideBuildParams<TProps>,
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
