import { createElement, forwardRef } from 'react';

const SearchIcon = (props: any) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <path
      d="M6.453 7.16C5.776 7.687 4.924 8 4 8 1.79 8 0 6.21 0 4c0-2.21 1.79-4 4-4 2.21 0 4 1.79 4 4 0 .924-.314 1.776-.84 2.453l3.194 3.193-.708.707L6.453 7.16zM7 4c0 1.657-1.343 3-3 3-1.657 0-3-1.343-3-3 0-1.657 1.343-3 3-3 1.657 0 3 1.343 3 3z"
      fillRule="evenodd"
      fillOpacity="1"
      stroke="none"
    />
  </svg>
);

export default SearchIcon;
