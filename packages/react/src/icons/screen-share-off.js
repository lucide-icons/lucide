import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const ScreenShareOff = forwardRef(
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
        <path d="M22 3L17 8"></path>
        <path d="M17 3L22 8"></path>
      </svg>
    );
  }
);

ScreenShareOff.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ScreenShareOff.displayName = "ScreenShareOff";

export default ScreenShareOff;
