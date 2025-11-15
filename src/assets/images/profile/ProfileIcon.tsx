import React from "react";

const ProfileIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.25 14.0833C6.64646 14.0833 3.44187 15.784 1.40165 18.4233C0.962543 18.9913 0.742989 19.2754 0.750171 19.6592C0.755719 19.9558 0.946238 20.3299 1.18496 20.513C1.49395 20.75 1.92213 20.75 2.77851 20.75H17.7215C18.5779 20.75 19.0061 20.75 19.315 20.513C19.5538 20.3299 19.7443 19.9558 19.7498 19.6592C19.757 19.2754 19.5375 18.9913 19.0983 18.4233C17.0581 15.784 13.8535 14.0833 10.25 14.0833Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.25 10.75C13.0751 10.75 15.3653 8.51142 15.3653 5.75C15.3653 2.98858 13.0751 0.75 10.25 0.75C7.4249 0.75 5.1347 2.98858 5.1347 5.75C5.1347 8.51142 7.4249 10.75 10.25 10.75Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ProfileIcon;
