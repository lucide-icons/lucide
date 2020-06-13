import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const DivideSquare = forwardRef(
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
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="8" y1="12" x2="16" y2="12"></line>
        <line x1="12" y1="16" x2="12" y2="16"></line>
        <line x1="12" y1="8" x2="12" y2="8"></line>
      </svg>
    );
  }
);

DivideSquare.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

DivideSquare.displayName = "DivideSquare";

export default DivideSquare;
