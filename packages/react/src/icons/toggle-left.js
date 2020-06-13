import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const ToggleLeft = forwardRef(
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
        <rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect>
        <circle cx="8" cy="12" r="3"></circle>
      </svg>
    );
  }
);

ToggleLeft.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ToggleLeft.displayName = "ToggleLeft";

export default ToggleLeft;
