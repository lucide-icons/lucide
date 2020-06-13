import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const SkipBack = forwardRef(
  ({ color = "currentColor", size = 24, ...rest }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...rest}
      >
        <polygon points="19 20 9 12 19 4 19 20"></polygon>
        <line x1="5" y1="19" x2="5" y2="5"></line>
      </svg>
    );
  }
);

SkipBack.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SkipBack.displayName = "SkipBack";

export default SkipBack;
