import { createElement, forwardRef, type FunctionComponent } from 'react';
import * as NativeSvg from 'react-native-svg';
import defaultAttributes, { childDefaultAttributes } from './defaultAttributes';
import { IconNode, LucideProps } from './types';
import { useLucideContext } from './context';

interface IconComponentProps extends LucideProps {
  iconNode: IconNode;
  testID?: string;
}

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
 * @param {IconNode} props.children - The children of the icon
 * @param {IconNode} props.iconNode - The icon node of the icon
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
    } = useLucideContext() ?? {};;

    const calculatedStrokeWidth = (absoluteStrokeWidth ?? contextAbsoluteStrokeWidth)
      ? (Number(strokeWidth ?? contextStrokeWidth) * 24) / Number(size ?? contextSize)
      : strokeWidth ?? contextStrokeWidth

    const customAttrs = {
      stroke: color ?? contextColor ?? defaultAttributes.stroke,
      strokeWidth: calculatedStrokeWidth,
      ...rest,
    };

    return createElement(
      NativeSvg.Svg as unknown as string,
      {
        ref,
        ...defaultAttributes,
        width: size ?? contextSize ?? defaultAttributes.width,
        height: size ?? contextSize ?? defaultAttributes.height,
        "data-testid": testID,
        ...customAttrs,
      },
      [
        ...iconNode.map(([tag, attrs]) => {
          const upperCasedTag = (tag.charAt(0).toUpperCase() +
            tag.slice(1)) as keyof typeof NativeSvg;
          // duplicating the attributes here because generating the OTA update bundles don't inherit the SVG properties from parent (codepush, expo-updates)
          return createElement(
            NativeSvg[upperCasedTag] as FunctionComponent<LucideProps>,
            { ...childDefaultAttributes, ...customAttrs, ...attrs } as LucideProps,
          );
        }),
        ...((Array.isArray(children) ? children : [children]) || []),
      ],
    );
  },
);

export default Icon;
