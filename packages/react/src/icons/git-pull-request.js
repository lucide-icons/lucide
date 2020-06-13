import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const GitPullRequest = forwardRef(
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
        <circle cx="18" cy="18" r="3"></circle>
        <circle cx="6" cy="6" r="3"></circle>
        <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
        <line x1="6" y1="9" x2="6" y2="21"></line>
      </svg>
    );
  }
);

GitPullRequest.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

GitPullRequest.displayName = "GitPullRequest";

export default GitPullRequest;
