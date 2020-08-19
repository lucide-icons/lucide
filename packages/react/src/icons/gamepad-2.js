import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Gamepad2 = forwardRef(
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
        <line x1="6" y1="11" x2="10" y2="11"></line>
        <line x1="8" y1="9" x2="8" y2="13"></line>
        <line x1="15" y1="12" x2="15.01" y2="12"></line>
        <line x1="18" y1="10" x2="18.01" y2="10"></line>
        <path d="M17.3195 5H6.68053C4.62605 5 2.91027 6.55524 2.70151 8.59071C2.69626 8.6419 2.69146 8.69141 2.68527 8.7425C2.60372 9.41612 2 14.4551 2 16C2 17.6569 3.34315 19 5 19C6 19 6.5 18.5 7 18L8.41421 16.5858C8.78929 16.2107 9.29799 16 9.82843 16H14.1716C14.702 16 15.2107 16.2107 15.5858 16.5858L17 18C17.5 18.5 18 19 19 19C20.6569 19 22 17.6569 22 16C22 14.4551 21.3963 9.41612 21.3147 8.7425C21.3085 8.69141 21.3037 8.6419 21.2985 8.59071C21.0897 6.55524 19.374 5 17.3195 5Z"></path>
      </svg>
    );
  }
);

Gamepad2.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Gamepad2.displayName = "Gamepad2";

export default Gamepad2;
