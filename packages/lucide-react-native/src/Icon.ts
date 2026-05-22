import { createElement, forwardRef, type FunctionComponent } from 'react';
import * as NativeSvg from 'react-native-svg';
import { buildLucideIconForReact, hasA11yProp, mergeClasses } from '@lucide/shared';
import { childDefaultAttributes } from './defaultAttributes';
import { LucideIconData, LucideIconNode, LucideProps } from './types';
import { useLucideContext } from './context';

type IconComponentProps = LucideProps & {
  testID?: string;
  className?: string;
} & ({ icon: LucideIconData; iconNode?: never } | { icon?: never; iconNode: LucideIconNode[] });

const toNativeSvgAttrName = (attributeName: string) => {
  if (attributeName === 'class') {
    return 'className';
  }

  if (attributeName.startsWith('data-') || attributeName.startsWith('aria-')) {
    return attributeName;
  }

  return attributeName.replace(/-([a-z])/g, (_, character: string) => character.toUpperCase());
};

const toNativeSvgAttributes = (attributes: Record<string, any>) => {
  return Object.entries(attributes).reduce<Record<string, any>>((acc, [attributeName, value]) => {
    if (value === undefined) {
      return acc;
    }

    acc[toNativeSvgAttrName(attributeName)] = value;
    return acc;
  }, {});
};

/**
 * Lucide icon component
 *
 * @component Icon
 * @param {object} props
 * @param {string} props.color - The color of the icon
 * @param {number} props.size - The size of the icon
 * @param {number} props.strokeWidth - The stroke width of the icon
 * @param {boolean} props.absoluteStrokeWidth - Whether to use absolute stroke width
 * @param {string} props.className - The class name of the icon
 * @param {LucideIconNode[]} props.children - The children of the icon
 * @param {LucideIconNode[]} props.iconNode - The icon node of the icon
 *
 * @returns {ForwardRefExoticComponent} LucideIcon
 */
const Icon = forwardRef<SVGSVGElement, IconComponentProps>(
  (
    {
      color,
      size,
      width = size,
      height = size,
      strokeWidth,
      absoluteStrokeWidth,
      nonScalingStroke,
      children,
      iconNode = [],
      icon = {
        node: iconNode,
        size: 24,
      },
      className,
      testID,
      ...rest
    },
    ref,
  ) => {
    const {
      size: contextSize = 24,
      strokeWidth: contextStrokeWidth = 2,
      absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
      nonScalingStroke: contextNonScalingStroke = false,
      color: contextColor = 'currentColor',
      className: contextClass = '',
    } = useLucideContext() ?? {};

    const hasAccessibleProp = Boolean(children) || hasA11yProp(rest);

    const [, svgAttributes, builtIconNode] = buildLucideIconForReact(icon, {
      color: color ?? contextColor,
      width: width ?? size ?? contextSize,
      height: height ?? size ?? contextSize,
      strokeWidth: strokeWidth ?? contextStrokeWidth,
      absoluteStrokeWidth: absoluteStrokeWidth ?? contextAbsoluteStrokeWidth,
      nonScalingStroke: nonScalingStroke ?? contextNonScalingStroke,
      className: mergeClasses(contextClass, className),
      hasA11yProp: hasAccessibleProp,
      attributes: rest,
    });

    const customAttrs = {
      stroke: svgAttributes['stroke'],
      strokeWidth: svgAttributes['strokeWidth'],
      ...rest,
    };

    return createElement(
      NativeSvg.Svg as unknown as string,
      {
        ref,
        ...toNativeSvgAttributes(svgAttributes),
        'data-testid': testID,
        ...rest,
      },
      [
        ...builtIconNode.map(([tag, attrs]) => {
          const upperCasedTag = (tag.charAt(0).toUpperCase() +
            tag.slice(1)) as keyof typeof NativeSvg;
          // duplicating the attributes here because generating the OTA update bundles don't inherit the SVG properties from parent (codepush, expo-updates)
          return createElement(
            NativeSvg[upperCasedTag] as FunctionComponent<LucideProps>,
            toNativeSvgAttributes({
              ...childDefaultAttributes,
              ...customAttrs,
              ...attrs,
            }) as LucideProps,
          );
        }),
        ...((Array.isArray(children) ? children : [children]) || []),
      ],
    );
  },
);

export default Icon;
