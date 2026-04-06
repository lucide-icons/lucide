import { createElement, forwardRef, type FunctionComponent } from 'react';
import * as NativeSvg from 'react-native-svg';
import { buildLucideIconNode } from '@lucide/shared';
import defaultAttributes, { childDefaultAttributes } from './defaultAttributes';
import { LucideIconNode, LucideProps } from './types';
import { useLucideContext } from './context';

interface IconComponentProps extends LucideProps {
  iconNode: LucideIconNode;
  testID?: string;
  className?: string;
}

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
 * @param {LucideIconNode} props.children - The children of the icon
 * @param {LucideIconNode} props.iconNode - The icon node of the icon
 *
 * @returns {ForwardRefExoticComponent} LucideIcon
 */
const Icon = forwardRef<SVGSVGElement, IconComponentProps>(
  (
    {
      color,
      size,
      strokeWidth,
      absoluteStrokeWidth,
      children,
      iconNode,
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
      color: contextColor = 'currentColor',
    } = useLucideContext() ?? {};

    const calculatedStrokeWidth =
      absoluteStrokeWidth ?? contextAbsoluteStrokeWidth
        ? (Number(strokeWidth ?? contextStrokeWidth) * 24) / Number(size ?? contextSize)
        : strokeWidth ?? contextStrokeWidth;

    const [, svgAttributes, builtIconNode = []] = buildLucideIconNode(
      {
        size: 24,
        node: iconNode,
      },
      {
        color: color ?? contextColor ?? defaultAttributes.stroke,
        size: size ?? contextSize ?? defaultAttributes.width,
        strokeWidth: calculatedStrokeWidth,
        className,
        includeDefaultClasses: false,
      },
    );

    const customAttrs = {
      stroke: color ?? contextColor ?? defaultAttributes.stroke,
      strokeWidth: calculatedStrokeWidth,
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
