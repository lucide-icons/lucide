import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const ChevronUp = forwardRef(
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
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    );
  }
);

ChevronUp.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ChevronUp.displayName = "ChevronUp";

export default ChevronUp;
