import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Link2Off = forwardRef(
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
        <path d="M15 7h2a5 5 0 0 1 4 8M9 17H7A5 5 0 0 1 7 7"></path>
        <line x1="8" y1="12" x2="12" y2="12"></line>
        <line x1="2" y1="2" x2="22" y2="22"></line>
      </svg>
    );
  }
);

Link2Off.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Link2Off.displayName = "Link2Off";

export default Link2Off;
