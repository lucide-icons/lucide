import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const CloudSnow = forwardRef(
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
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
        <line x1="8" y1="16" x2="8.01" y2="16"></line>
        <line x1="8" y1="20" x2="8.01" y2="20"></line>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
        <line x1="12" y1="22" x2="12.01" y2="22"></line>
        <line x1="16" y1="16" x2="16.01" y2="16"></line>
        <line x1="16" y1="20" x2="16.01" y2="20"></line>
      </svg>
    );
  }
);

CloudSnow.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CloudSnow.displayName = "CloudSnow";

export default CloudSnow;
