import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Navigation = forwardRef(
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
        <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
      </svg>
    );
  }
);

Navigation.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Navigation.displayName = "Navigation";

export default Navigation;
