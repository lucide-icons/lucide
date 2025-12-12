import { LucideBuildParams, LucideIcon, LucideIconNode } from './types';

const defaultAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
};

/**
 * Creates a Lucide icon node (an svgson-like format) from a Lucide icon object.
 *
 * @param icon The icon to build.
 * @param params Additional build parameters.
 */
function buildLucideIconNode(icon: LucideIcon, params: LucideBuildParams = {}): LucideIconNode {
  const viewBoxWidth = ('size' in icon ? icon.size : icon.width) ?? defaultAttributes.width;
  const viewBoxHeight = ('size' in icon ? icon.size : icon.height) ?? defaultAttributes.height;
  const attributes = {
    ...defaultAttributes,
    ...('color' in params && { stroke: params['color'] }),
    ...('size' in params &&
      params['size'] && {
        width: params['size'].toString(10),
        height: params['size'].toString(10),
      }),
    ...('width' in params && params['width'] && { width: params['width'].toString(10) }),
    ...('height' in params && params['height'] && { height: params['height'].toString(10) }),
    ...('strokeWidth' in params &&
      params['strokeWidth'] && { 'stroke-width': params['strokeWidth'].toString(10) }),
    ...('absoluteStrokeWidth' in params &&
      params['absoluteStrokeWidth'] && { 'vector-effect': 'non-scaling-stroke' }),
    class: `lucide lucide-${icon.name} ${params['className'] ?? ''}`.trim(),
    viewBox: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
    ...('attributes' in params && params.attributes),
  };
  return ['svg', attributes, icon.node];
}

export default buildLucideIconNode;
