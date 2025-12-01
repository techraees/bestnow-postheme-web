"use client";

import React from "react";
import Image from "next/image";
import {
  SearchIconLatest,
  FastBillingIcon,
  MyCartIcon,
  DiscountOffersIcon,
} from "@/assets/icons/action-button";
import ActionButton from "./ActionButton";

interface ActionButtonsGridProps {
  cartCount?: number;
  offersCount?: number;
  onSearchClick?: () => void;
  onBillingClick?: () => void;
  onCartClick?: () => void;
  onOffersClick?: () => void;
}

const ActionButtonsGrid: React.FC<ActionButtonsGridProps> = ({
  cartCount = 9,
  offersCount = 5,
  onSearchClick,
  onBillingClick,
  onCartClick,
  onOffersClick,
}) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
        <ActionButton
          icon={
            <Image
              src={SearchIconLatest}
              alt="Search"
              width={24}
              height={24}
              className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 object-contain"
            />
          }
          label="Search"
          onClick={onSearchClick}
        />
        <ActionButton
          icon={
            <Image
              src={FastBillingIcon}
              alt="Fast Billing"
              width={24}
              height={24}
              className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 object-contain"
            />
          }
          label="Fast Billing"
          onClick={onBillingClick}
        />
        <ActionButton
          icon={
            <Image
              src={MyCartIcon}
              alt="My Cart"
              width={24}
              height={24}
              className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 object-contain"
            />
          }
          label="My Cart"
          badge={cartCount > 9 ? "9+" : cartCount}
          onClick={onCartClick}
        />
        <ActionButton
          icon={
            <Image
              src={DiscountOffersIcon}
              alt="Discount & Offers"
              width={24}
              height={24}
              className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 object-contain"
            />
          }
          label="Discount & Offers"
          badge={offersCount}
          onClick={onOffersClick}
        />
      </div>
    </div>
  );
};

export default ActionButtonsGrid;
