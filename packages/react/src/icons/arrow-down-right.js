import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const ArrowDownRight = forwardRef(
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
        <line x1="7" y1="7" x2="17" y2="17"></line>
        <polyline points="17 7 17 17 7 17"></polyline>
      </svg>
    );
  }
);

ArrowDownRight.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ArrowDownRight.displayName = "ArrowDownRight";

export default ArrowDownRight;
