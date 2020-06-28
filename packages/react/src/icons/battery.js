import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Battery = forwardRef(
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
        <rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect>
        <line x1="22" x2="22" y1="11" y2="13"></line>
      </svg>
    );
  }
);

Battery.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Battery.displayName = "Battery";

export default Battery;
