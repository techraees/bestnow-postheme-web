import React from "react";

const ArrowDescrptionIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.75 10.75L10.75 0.75M10.75 0.75H1.75M10.75 0.75V9.75"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowDescrptionIcon;
