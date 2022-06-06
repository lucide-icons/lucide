import { forwardRef, createElement } from 'react';
import PropTypes from 'prop-types';
import * as NativeSvg from 'react-native-svg';
import defaultAttributes from './defaultAttributes';

const createReactComponent = (iconName, iconNode) => {
  const Component = forwardRef(
    ({ color = 'currentColor', size = 24, strokeWidth = 2, children, ...rest }, ref) =>
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
            const uppercasedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
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
