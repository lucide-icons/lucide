import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const GripHorizontal = forwardRef(
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
        <circle cx="12" cy="9" r="1"></circle>
        <circle cx="19" cy="9" r="1"></circle>
        <circle cx="5" cy="9" r="1"></circle>
        <circle cx="12" cy="15" r="1"></circle>
        <circle cx="19" cy="15" r="1"></circle>
        <circle cx="5" cy="15" r="1"></circle>
      </svg>
    );
  }
);

GripHorizontal.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

GripHorizontal.displayName = "GripHorizontal";

export default GripHorizontal;
