import { buildLucideSvg as sharedBuildLucideSvg } from '@lucide/shared';
import { LucideBuildParams, LucideIconData } from './types';

/**
 * Creates an SVG string from a Lucide icon object.
 *
 * @param icon The icon to build.
 * @param params Additional build parameters.
 */
function buildLucideSvg(icon: LucideIconData, params: LucideBuildParams = {}) {
  return sharedBuildLucideSvg(icon as any, params as any);
}

export default buildLucideSvg;
