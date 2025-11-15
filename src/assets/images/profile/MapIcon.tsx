import React from "react";

const MapIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.7273 20.6774C15.2939 18.3488 18.8579 14.4926 18.8579 9.80394C18.8579 4.80358 14.8043 0.75 9.80394 0.75C4.80358 0.75 0.75 4.80358 0.75 9.80394C0.75 14.4926 4.31396 18.3488 8.88055 20.6774C9.46079 20.9732 10.1471 20.9732 10.7273 20.6774Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.1996 9.80441C13.1996 11.6796 11.6796 13.1996 9.80441 13.1996C7.92922 13.1996 6.40918 11.6796 6.40918 9.80441C6.40918 7.92928 7.92922 6.40918 9.80441 6.40918C11.6796 6.40918 13.1996 7.92928 13.1996 9.80441Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default MapIcon;
