import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Speaker = forwardRef(
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
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
        <circle cx="12" cy="14" r="4"></circle>
        <line x1="12" y1="6" x2="12.01" y2="6"></line>
      </svg>
    );
  }
);

Speaker.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Speaker.displayName = "Speaker";

export default Speaker;
