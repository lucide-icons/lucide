import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const CornerLeftUp = forwardRef(
  ({ color = "currentColor", size = 24, width = 2, ...rest }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...rest}
      >
        <polyline points="14 9 9 4 4 9"></polyline>
        <path d="M20 20h-7a4 4 0 0 1-4-4V4"></path>
      </svg>
    );
  }
);

CornerLeftUp.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CornerLeftUp.displayName = "CornerLeftUp";

export default CornerLeftUp;
