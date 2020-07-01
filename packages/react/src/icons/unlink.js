import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Unlink = forwardRef(
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
        <path d="M18.84 12.25l1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"></path>
        <path d="M5.17 11.75l-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"></path>
        <line x1="8" y1="2" x2="8" y2="5"></line>
        <line x1="2" y1="8" x2="5" y2="8"></line>
        <line x1="16" y1="19" x2="16" y2="22"></line>
        <line x1="19" y1="16" x2="22" y2="16"></line>
      </svg>
    );
  }
);

Unlink.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Unlink.displayName = "Unlink";

export default Unlink;
