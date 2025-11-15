import React from "react";

const SearchIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2015 19.6529C15.4214 19.6529 19.6529 15.4214 19.6529 10.2015C19.6529 4.98157 15.4214 0.75 10.2015 0.75C4.98157 0.75 0.75 4.98157 0.75 10.2015C0.75 15.4214 4.98157 19.6529 10.2015 19.6529Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5292 20.3775C19.0858 22.0578 20.3565 22.2258 21.3331 20.7556C22.2258 19.4114 21.6377 18.3087 20.0204 18.3087C18.8232 18.2982 18.1511 19.2328 18.5292 20.3775Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
