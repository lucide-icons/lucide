import { forwardRef, createElement, ReactSVG, ReactNode, FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import * as NativeSvg from 'react-native-svg';
import defaultAttributes from './defaultAttributes';
import type { SvgProps } from 'react-native-svg';
type IconNode = [elementName: keyof ReactSVG, attrs: Record<string, string>][]


export interface LucideProps extends SvgProps {
  size?: string | number
  absoluteStrokeWidth?: boolean
}

const createLucideIcon = (iconName: string, iconNode: IconNode) => {
  const Component = forwardRef(
    ({ color = 'currentColor', size = 24, strokeWidth = 2, absoluteStrokeWidth, children, ...rest }: LucideProps, ref) =>
      createElement(
        NativeSvg.Svg as unknown as string,
        {
          ref,
          ...defaultAttributes,
          width: size,
          height: size,
          stroke: color,
          strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
          ...rest,
        },
        [
          ...iconNode.map(([tag, attrs]) => {
            const upperCasedTag = (tag.charAt(0).toUpperCase() + tag.slice(1)) as keyof (typeof NativeSvg);
            return createElement(NativeSvg[upperCasedTag] as FunctionComponent<Record<string, string>>, attrs);
          }),
          ...(
            (Array.isArray(children) ? children : [children]) || []
          ),
        ],
      ),
  );

  Component.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  Component.displayName = `${iconName}`;

  return Component;
};

export default createLucideIcon;
