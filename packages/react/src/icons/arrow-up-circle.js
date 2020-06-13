import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const ArrowUpCircle = forwardRef(
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
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="16 12 12 8 8 12"></polyline>
        <line x1="12" y1="16" x2="12" y2="8"></line>
      </svg>
    );
  }
);

ArrowUpCircle.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ArrowUpCircle.displayName = "ArrowUpCircle";

export default ArrowUpCircle;
