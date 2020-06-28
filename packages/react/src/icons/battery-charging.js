import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const BatteryCharging = forwardRef(
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
        <path d="M7 7H3.77778C2.79594 7 2 7.74619 2 8.66667V15.3333C2 16.2538 2.79594 17 3.77778 17H6M14 7H16.2222C17.2041 7 18 7.74619 18 8.66667V15.3333C18 16.2538 17.2041 17 16.2222 17H13"></path>
        <polyline points="11 7 8 12 12 12 9 17"></polyline>
        <line x1="22" x2="22" y1="11" y2="13"></line>
      </svg>
    );
  }
);

BatteryCharging.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

BatteryCharging.displayName = "BatteryCharging";

export default BatteryCharging;
