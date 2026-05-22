import type { LucideBuildParams, LucideIconData, LucideIconNode, SVGProps } from './types';
import defaultAttributes from './defaultAttributes';
import { mergeClasses } from '../utils/mergeClasses';

/**
 * Creates a Lucide icon node (an svgson-like format) from a Lucide icon object.
 *
 * @param icon The icon to build.
 * @param params Additional build parameters.
 */
function buildLucideIconNode(icon: LucideIconData, params: LucideBuildParams = {}): LucideIconNode {
  const attributeNames = params.attributeNames ?? {};
  const getAttributeName = (attributeName: string) =>
    attributeNames[attributeName] ?? attributeName;

  const viewBoxWidth = icon.size ?? icon.width ?? defaultAttributes['width'];
  const viewBoxHeight = icon.size ?? icon.height ?? defaultAttributes['height'];
  const aliasClassNames =
    icon.aliases
      ?.filter((alias): alias is string => typeof alias === 'string' && alias.trim() !== '')
      .map((alias) => `lucide-${alias}`) ?? [];
  const iconClassNames = [...(icon.name ? [`lucide-${icon.name}`] : []), ...aliasClassNames];
  const classNamesFromClassName = params.className?.split(' ').filter(Boolean) ?? [];
  const className =
    params.includeDefaultClasses === false
      ? mergeClasses(...classNamesFromClassName)
      : mergeClasses('lucide', ...iconClassNames, ...classNamesFromClassName);

  const calculatedStrokeWidth = params.absoluteStrokeWidth
    ? (Number(params.strokeWidth ?? defaultAttributes['stroke-width']) *
        Number(icon.size ?? icon.width)) /
      Number(params.size ?? params.width ?? defaultAttributes['width'])
    : params.strokeWidth ?? defaultAttributes['stroke-width'];

  const attributes = {
    ...Object.entries(defaultAttributes).reduce((attrs, [attrName, value]) => {
      attrs[getAttributeName(attrName)] = value;
      return attrs;
    }, {} as SVGProps),
    ...('color' in params && params.color && { [getAttributeName('stroke')]: params.color }),
    ...('size' in params &&
      params.size && {
        [getAttributeName('width')]: params.size,
        [getAttributeName('height')]: params.size,
      }),
    ...('width' in params && params.width && { [getAttributeName('width')]: params.width }),
    ...('height' in params && params.height && { [getAttributeName('height')]: params.height }),
    [getAttributeName('stroke-width')]: calculatedStrokeWidth,
    ...(className && { [getAttributeName('class')]: className }),
    [getAttributeName('viewBox')]: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
    ...(params.hasA11yProp === false ? { [getAttributeName('aria-hidden')]: 'true' } : {}),
    ...('attributes' in params && params.attributes),
  };

  return [
    'svg',
    attributes,
    icon.node.map(([name, attrs]) => [
      name,
      params.nonScalingStroke
        ? { [getAttributeName('vector-effect')]: 'non-scaling-stroke', ...attrs }
        : attrs,
    ]),
  ];
}

export default buildLucideIconNode;
