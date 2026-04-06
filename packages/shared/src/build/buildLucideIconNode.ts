import type { LucideBuildParams, LucideIconData, LucideIconNode, SVGProps } from './types';

export type { LucideBuildParams, LucideIconData, LucideIconNode, SVGProps } from './types';

const defaultAttributes: SVGProps = {
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

const mergeClasses = (...classes: Array<string | undefined>) =>
  classes
    .filter(
      (className, index, array): className is string =>
        typeof className === 'string' &&
        className.trim() !== '' &&
        array.indexOf(className) === index,
    )
    .join(' ')
    .trim();

const toString = (value: string | number) =>
  typeof value === 'number' ? value.toString(10) : value.toString();

/**
 * Creates a Lucide icon node (an svgson-like format) from a Lucide icon object.
 *
 * @param icon The icon to build.
 * @param params Additional build parameters.
 */
function buildLucideIconNode(icon: LucideIconData, params: LucideBuildParams = {}): LucideIconNode {
  const viewBoxWidth =
    ('size' in icon && icon.size !== undefined
      ? icon.size
      : 'width' in icon
        ? icon.width
        : undefined) ?? defaultAttributes['width'];
  const viewBoxHeight =
    ('size' in icon && icon.size !== undefined
      ? icon.size
      : 'height' in icon
        ? icon.height
        : undefined) ?? defaultAttributes['height'];
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

  const attributes = {
    ...defaultAttributes,
    ...('color' in params && params.color && { stroke: params.color }),
    ...('size' in params &&
      params.size && {
        width: toString(params.size),
        height: toString(params.size),
      }),
    ...('width' in params && params.width && { width: toString(params.width) }),
    ...('height' in params && params.height && { height: toString(params.height) }),
    ...('strokeWidth' in params &&
      params.strokeWidth && { 'stroke-width': toString(params.strokeWidth) }),
    ...(className && { class: className }),
    viewBox: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
    ...(params.hasA11yProp === false ? { 'aria-hidden': 'true' } : {}),
    ...('attributes' in params && params.attributes),
  };

  return [
    'svg',
    attributes,
    icon.node.map(([name, attrs]) => [
      name,
      params.absoluteStrokeWidth ? { 'vector-effect': 'non-scaling-stroke', ...attrs } : attrs,
    ]),
  ];
}

export default buildLucideIconNode;
