import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const CornerRightDown = forwardRef(
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
        <polyline points="10 15 15 20 20 15"></polyline>
        <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
      </svg>
    );
  }
);

CornerRightDown.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CornerRightDown.displayName = "CornerRightDown";

export default CornerRightDown;
