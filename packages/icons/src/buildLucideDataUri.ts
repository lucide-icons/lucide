import { buildLucideDataUri as sharedBuildLucideDataUri } from '@lucide/shared';
import { LucideBuildParams, LucideIconData } from './types';

/**
 * Creates a base64 encoded data URI from a Lucide icon object.
 *
 * @param icon The icon to build.
 * @param params Additional build parameters.
 */
function buildLucideDataUri(icon: LucideIconData, params: LucideBuildParams = {}) {
  return sharedBuildLucideDataUri(icon as any, params as any);
}

export default buildLucideDataUri;
