import React from "react";

const HomeIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.75 10.6988C0.75 8.4676 0.75 7.352 1.25622 6.42717C1.76244 5.50235 2.68728 4.92837 4.53693 3.78043L6.48693 2.5702C8.44216 1.35673 9.4198 0.75 10.5 0.75C11.5802 0.75 12.5578 1.35673 14.5131 2.5702L16.4631 3.78042C18.3128 4.92837 19.2376 5.50235 19.7438 6.42717C20.25 7.352 20.25 8.4676 20.25 10.6988V12.1819C20.25 15.9852 20.25 17.8869 19.1077 19.0684C17.9655 20.25 16.1269 20.25 12.45 20.25H8.55C4.87304 20.25 3.03457 20.25 1.89228 19.0684C0.75 17.8869 0.75 15.9852 0.75 12.1819V10.6988Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
      <path
        d="M13.4252 16.3501H7.5752"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default HomeIcon;
