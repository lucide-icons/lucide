import { forwardRef, createElement } from 'react';
import PropTypes from 'prop-types';

export default (iconName, [tag, attrs, children]) => {
  const Component = forwardRef(
    ({ color = 'currentColor', size = 24, strokeWidth = 2, ...rest }, ref) =>
      createElement(
        tag,
        {
          ref,
          ...attrs,
          width: size,
          height: size,
          color,
          strokeWidth,
          ...rest,
        },
        children.map(([childTag, childAttrs]) => createElement(childTag, childAttrs)),
      ),
  );

  Component.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  Component.displayName = `${iconName}`;

  return Component;
};
