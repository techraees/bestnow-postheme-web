import React from "react";

const SecurityIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.7399 9.94936C18.7399 14.886 15.1561 19.5096 10.2598 20.8624C9.92668 20.9533 9.56325 20.9533 9.23011 20.8624C4.33383 19.5096 0.75 14.886 0.75 9.94936V5.51748C0.75 4.68966 1.37592 3.75081 2.15326 3.43785L7.77638 1.13615C9.03829 0.621285 10.4617 0.621285 11.7237 1.13615L17.3468 3.43785C18.114 3.75081 18.75 4.68966 18.75 5.51748L18.7399 9.94936Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.74514 11.3428C10.8603 11.3428 11.7642 10.4389 11.7642 9.32375C11.7642 8.20865 10.8603 7.30469 9.74514 7.30469C8.63001 7.30469 7.72607 8.20865 7.72607 9.32375C7.72607 10.4389 8.63001 11.3428 9.74514 11.3428Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.74512 11.3428V14.3714"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default SecurityIcon;
