import { buildLucideIconNode as sharedBuildLucideIconNode } from '@lucide/shared';
import { LucideBuildParams, LucideIconData, LucideIconNode } from './types';

/**
 * Creates a Lucide icon node (an svgson-like format) from a Lucide icon object.
 *
 * @param icon The icon to build.
 * @param params Additional build parameters.
 */
function buildLucideIconNode(icon: LucideIconData, params: LucideBuildParams = {}): LucideIconNode {
  return sharedBuildLucideIconNode(icon as any, params as any) as LucideIconNode;
}

export default buildLucideIconNode;
