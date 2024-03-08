import {
  forwardRef,
  createElement,
  ReactSVG,
  FunctionComponent,
  ForwardRefExoticComponent,
} from 'react';
import * as NativeSvg from 'react-native-svg';
import defaultAttributes, { childDefaultAttributes } from './defaultAttributes';
import type { SvgProps } from 'react-native-svg';

export type IconNode = [elementName: keyof ReactSVG, attrs: Record<string, string>][];

export interface LucideProps extends SvgProps {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
  'data-testid'?: string;
}

export type LucideIcon = ForwardRefExoticComponent<LucideProps>;

const createLucideIcon = (iconName: string, iconNode: IconNode): LucideIcon => {
  const Component = forwardRef(
    (
      {
        color = 'currentColor',
        size = 24,
        strokeWidth = 2,
        absoluteStrokeWidth,
        children,
        'data-testid': dataTestId,
        ...rest
      }: LucideProps,
      ref,
    ) => {
      const customAttrs = {
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth,
        ...rest,
      };

      return createElement(
        NativeSvg.Svg as unknown as string,
        {
          ref,
          ...defaultAttributes,
          width: size,
          height: size,
          'data-testid': dataTestId,
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

  Component.displayName = `${iconName}`;

  return Component;
};

export default createLucideIcon;
