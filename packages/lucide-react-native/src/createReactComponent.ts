import { forwardRef, createElement, ReactSVG } from 'react';
import PropTypes from 'prop-types';
import * as NativeSvg from 'react-native-svg';
import defaultAttributes from './defaultAttributes';
import type { SvgProps } from 'react-native-svg';
// const NativeSvg = {}
type IconNode = [elementName: keyof ReactSVG, attrs: Record<string, string>][]


export interface LucideProps extends SvgProps {
  size?: string | number
}

const createReactComponent = (iconName: string, iconNode: IconNode) => {
  const Component = forwardRef(
    ({ color = 'currentColor', size = 24, strokeWidth = 2, children, ...rest }: LucideProps, ref) =>
      createElement(
        NativeSvg.Svg,
        {
          ref,
          ...defaultAttributes,
          width: size,
          height: size,
          stroke: color,
          strokeWidth,
          ...rest,
        },
        [
          ...iconNode.map(([tag, attrs]) => {
            const uppercasedTag = (tag.charAt(0).toUpperCase() + tag.slice(1));
            return createElement(NativeSvg[uppercasedTag], attrs);
          }),
          ...(children || []),
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

export default createReactComponent;
