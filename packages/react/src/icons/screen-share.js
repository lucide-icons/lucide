import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const ScreenShare = forwardRef(
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
        <path d="M13 3H4C2.89543 3 2 3.89543 2 5V15C2 16.1046 2.89543 17 4 17H20C21.1046 17 22 16.1046 22 15V12"></path>
        <path d="M8 21H16"></path>
        <path d="M12 17V21"></path>
        <path d="M17 8L22 3"></path>
        <path d="M17 3H22V8"></path>
      </svg>
    );
  }
);

ScreenShare.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ScreenShare.displayName = "ScreenShare";

export default ScreenShare;
