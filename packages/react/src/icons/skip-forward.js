import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const SkipForward = forwardRef(
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
        <polygon points="5 4 15 12 5 20 5 4"></polygon>
        <line x1="19" y1="5" x2="19" y2="19"></line>
      </svg>
    );
  }
);

SkipForward.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SkipForward.displayName = "SkipForward";

export default SkipForward;
