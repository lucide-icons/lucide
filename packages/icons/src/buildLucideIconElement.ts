import { buildLucideIconElement as sharedBuildLucideIconElement } from '@lucide/shared';
import { LucideBuildParams, LucideIconData } from './types';

/**
 * Creates an SvgElement from a Lucide icon object.
 *
 * @param document The document to create the Element in.
 * @param icon The icon to build.
 * @param params Additional build parameters.
 */
function buildLucideIconElement(
  document: Document,
  icon: LucideIconData,
  params: LucideBuildParams = {},
) {
  return sharedBuildLucideIconElement(document, icon as any, params as any);
}

export default buildLucideIconElement;
