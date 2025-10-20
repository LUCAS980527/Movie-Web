import * as React from "react";
const ArrowIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#18181B"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.333 8h9.333m0 0L8 3.333M12.666 8 8 12.667"
    />
  </svg>
);
export default ArrowIcon;
