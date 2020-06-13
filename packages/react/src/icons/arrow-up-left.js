import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const ArrowUpLeft = forwardRef(
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
        <line x1="17" y1="17" x2="7" y2="7"></line>
        <polyline points="7 17 7 7 17 7"></polyline>
      </svg>
    );
  }
);

ArrowUpLeft.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ArrowUpLeft.displayName = "ArrowUpLeft";

export default ArrowUpLeft;
