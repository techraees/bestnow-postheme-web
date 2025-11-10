import React from "react";

const CartIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.42217 13.8021C0.578699 9.86585 0.156965 7.8978 1.21421 6.59002C2.27145 5.28223 4.28422 5.28223 8.30978 5.28223H14.3631C18.3887 5.28223 20.4014 5.28223 21.4587 6.59002C22.5159 7.8978 22.0942 9.86585 21.2507 13.8021L20.7476 16.1501C20.1759 18.818 19.89 20.152 18.9213 20.9351C17.9527 21.7181 16.5885 21.7181 13.8599 21.7181H8.81292C6.08439 21.7181 4.72013 21.7181 3.7515 20.9351C2.78287 20.152 2.49702 18.818 1.92532 16.1501L1.42217 13.8021Z"
        stroke="currentColor"
        stroke-width="1.17273"
      />
      <path
        d="M6.64062 11.1523H16.0326"
        stroke="currentColor"
        stroke-width="1.17273"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.98828 14.6743H13.6843"
        stroke="currentColor"
        stroke-width="1.17273"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.3804 7.63039L14.8584 0.586426"
        stroke="currentColor"
        stroke-width="1.17273"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.29248 7.63039L7.81446 0.586426"
        stroke="#FFF100"
        stroke-width="1.17273"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CartIcon;
