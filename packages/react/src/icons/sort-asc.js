import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const SortAsc = forwardRef(
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
        <path d="M11 5h10"></path>
        <path d="M11 9h7"></path>
        <path d="M11 13h4"></path>
        <path d="M3 17l3 3 3-3"></path>
        <path d="M6 18V4"></path>
      </svg>
    );
  }
);

SortAsc.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SortAsc.displayName = "SortAsc";

export default SortAsc;
