import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Divide = forwardRef(
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
        <circle cx="12" cy="6" r="2"></circle>
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <circle cx="12" cy="18" r="2"></circle>
      </svg>
    );
  }
);

Divide.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Divide.displayName = "Divide";

export default Divide;
