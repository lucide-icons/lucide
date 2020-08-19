import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Snowflake = forwardRef(
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
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <line x1="12" y1="2" x2="12" y2="22"></line>
        <path d="M20 16L16 12L20 8"></path>
        <path d="M4 8L8 12L4 16"></path>
        <path d="M16 4L12 8L8 4"></path>
        <path d="M8 20L12 16L16 20"></path>
      </svg>
    );
  }
);

Snowflake.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Snowflake.displayName = "Snowflake";

export default Snowflake;
