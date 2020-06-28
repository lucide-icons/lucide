import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const CornerLeftDown = forwardRef(
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
        <polyline points="14 15 9 20 4 15"></polyline>
        <path d="M20 4h-7a4 4 0 0 0-4 4v12"></path>
      </svg>
    );
  }
);

CornerLeftDown.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CornerLeftDown.displayName = "CornerLeftDown";

export default CornerLeftDown;
