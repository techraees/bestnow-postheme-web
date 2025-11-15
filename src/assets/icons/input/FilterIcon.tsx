import React from "react";

const FilterIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 4.875H22.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M0.75 15.875H14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M0.749999 4.875C0.749999 7.15318 2.59682 9 4.875 9C7.15317 9 9 7.15318 9 4.875C9 2.59683 7.15317 0.75 4.875 0.75C2.59682 0.75 0.749999 2.59683 0.749999 4.875Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.5 15.875C14.5 18.1532 16.3468 20 18.625 20C20.9032 20 22.75 18.1532 22.75 15.875C22.75 13.5968 20.9032 11.75 18.625 11.75C16.3468 11.75 14.5 13.5968 14.5 15.875Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default FilterIcon;
