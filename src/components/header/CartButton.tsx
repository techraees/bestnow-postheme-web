"use client";

import React, { memo } from "react";
import { truncateString } from "@/utils/coreUtils/truncateTexts";
import { CartIcon } from "@/assets";

interface CartButtonProps {
  myItemsCountObj: any;
  onClick: () => void;
}

const CartButton = memo(({ myItemsCountObj, onClick }: CartButtonProps) => {
  const count = myItemsCountObj;

  // Truncate logic (e.g. 125 → "12+")
  const displayCount =
    count > 0 ? truncateString(count.toString(), 2, false) : "0";

  return (
    <li
      onClick={onClick}
      className="
        relative 
        cursor-pointer 
        lg:flex hidden 
        items-center 
        justify-center
        w-[35px]
        h-[35px]
      "
    >
      {/* Badge */}
      <span
        className={`
          absolute 
          top-[1px] 
          right-[2px] 
          text-[9px]
          font-semibold
          text-black
          dark:text-white
          flex 
          items-center 
          justify-center 
          rounded-full 
          border
          dark:bg-dark_mode_yellow_highlight_color
          bg-light_mode_yellow_highlight_color
          shadow-sm
          ${displayCount && displayCount.length > 1 ? "w-[16px] h-[16px]" : "w-[13px] h-[13px]"}
        `}
      >
        {displayCount}
      </span>

      {/* Icon */}
      <CartIcon
        className="
        w-6 
        h-6 
        text-light_mode_yellow_color
        dark:text-dark_mode_yellow_color
      "
      />
    </li>
  );
});

CartButton.displayName = "CartButton";

export default CartButton;
