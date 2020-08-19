import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Languages = forwardRef(
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
        <line x1="5" y1="8" x2="11" y2="14"></line>
        <path d="M4 14L10 8L12 5"></path>
        <line x1="2" y1="5" x2="14" y2="5"></line>
        <line x1="7" y1="2" x2="8" y2="2"></line>
        <path d="M22 21L17 11L12 21"></path>
        <line x1="14" y1="17" x2="20" y2="17"></line>
      </svg>
    );
  }
);

Languages.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Languages.displayName = "Languages";

export default Languages;
