import { LucideBuildParams, LucideIcon } from './types';
import buildLucideSvg from './buildLucideSvg';

/**
 * Creates a base64 encoded data URI from a Lucide icon object.
 *
 * @param icon The icon to build.
 * @param params Additional build parameters.
 */
function buildLucideDataUri(icon: LucideIcon, params: LucideBuildParams = {}) {
  return `data:image/svg+xml;base64,${btoa(buildLucideSvg(icon, params))}`;
}

export default buildLucideDataUri;
