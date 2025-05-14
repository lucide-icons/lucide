import { LucideBuildParams, LucideIcon } from './types';
import buildLucideSvg from './buildLucideSvg';

function buildLucideDataUri(icon: LucideIcon, params: LucideBuildParams = {}) {
  return `data:image/svg+xml;base64,${btoa(buildLucideSvg(icon, params))}`;
}

export default buildLucideDataUri;
