import type { LucideBuildParams, LucideIconData, LucideIconNode, SVGProps } from './types';
import defaultAttributes from './defaultAttributes';
import { mergeClasses } from '../utils/mergeClasses';

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Creates a Lucide icon node (an svgson-like format) from a Lucide icon object.
 *
 * @param icon The icon to build.
 * @param params Additional build parameters.
 */
function buildLucideIconNode(icon: LucideIconData, params: LucideBuildParams = {}): LucideIconNode {
  const attributeNames = params.attributeNames;
  const getAttributeName = (attributeName: string) =>
    attributeNames?.[attributeName] ?? attributeName;

  const viewBoxWidth = icon.size ?? icon.width ?? defaultAttributes['width'];
  const viewBoxHeight = icon.size ?? icon.height ?? defaultAttributes['height'];

  const classNames: string[] = [];
  if (params.includeDefaultClasses !== false) {
    classNames.push('lucide');
    if (icon.name) {
      classNames.push(`lucide-${icon.name}`);
    }
    for (const alias of icon.aliases ?? []) {
      if (typeof alias === 'string' && alias.trim() !== '') {
        classNames.push(`lucide-${alias}`);
      }
    }
  }
  if (params.className) {
    classNames.push(...params.className.split(' '));
  }
  const className = mergeClasses(...classNames);

  const calculatedStrokeWidth = params.absoluteStrokeWidth
    ? (Number(params.strokeWidth ?? defaultAttributes['stroke-width']) *
        Number(icon.size ?? icon.width ?? defaultAttributes['width'])) /
      Number(params.size ?? params.width ?? defaultAttributes['width'])
    : (params.strokeWidth ?? defaultAttributes['stroke-width']);

  // Keys are assigned in a fixed order, so the attributes are always emitted in the same order.
  const attributes: SVGProps = {};

  for (const attributeName in defaultAttributes) {
    attributes[getAttributeName(attributeName)] =
      defaultAttributes[attributeName as keyof typeof defaultAttributes];
  }

  if (params.color) {
    attributes[getAttributeName('stroke')] = params.color;
  }
  if (isDefined(params.size)) {
    attributes[getAttributeName('width')] = params.size;
    attributes[getAttributeName('height')] = params.size;
  }
  if (isDefined(params.width)) {
    attributes[getAttributeName('width')] = params.width;
  }
  if (isDefined(params.height)) {
    attributes[getAttributeName('height')] = params.height;
  }
  attributes[getAttributeName('stroke-width')] = calculatedStrokeWidth;
  if (className) {
    attributes[getAttributeName('class')] = className;
  }
  attributes[getAttributeName('viewBox')] = `0 0 ${viewBoxWidth} ${viewBoxHeight}`;
  if (params.hasA11yProp === false) {
    attributes[getAttributeName('aria-hidden')] = 'true';
  }
  Object.assign(attributes, params.attributes);

  const nonScalingStrokeAttributes = params.nonScalingStroke
    ? { [getAttributeName('vector-effect')]: 'non-scaling-stroke' }
    : null;

  return [
    'svg',
    attributes,
    icon.node.map((child): LucideIconNode => {
      const [name, attrs, children] = child;
      const nextAttrs = nonScalingStrokeAttributes
        ? { ...nonScalingStrokeAttributes, ...attrs }
        : attrs;

      return children ? [name, nextAttrs, children] : [name, nextAttrs];
    }),
  ];
}

export default buildLucideIconNode;
