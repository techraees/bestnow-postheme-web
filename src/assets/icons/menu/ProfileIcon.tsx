import React from "react";

const ProfileIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 18 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.99365 11.4798C8.87269 11.4677 8.72753 11.4677 8.59446 11.4798C5.71549 11.3831 3.4292 9.02419 3.4292 6.12097C3.4292 3.15726 5.82436 0.75 8.80011 0.75C11.7638 0.75 14.1711 3.15726 14.1711 6.12097C14.159 9.02419 11.8727 11.3831 8.99365 11.4798Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.94556 15.9435C0.0181453 17.9032 0.0181453 21.0967 2.94556 23.0443C6.27218 25.2701 11.7278 25.2701 15.0544 23.0443C17.9819 21.0846 17.9819 17.8911 15.0544 15.9435C11.7399 13.7298 6.28427 13.7298 2.94556 15.9435Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ProfileIcon;
