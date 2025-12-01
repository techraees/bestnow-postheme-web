"use client";

import React from "react";

const CartItemSkeleton: React.FC = () => {
  return (
    <div className="bg-light_mode_color dark:bg-dark_mode_color rounded-2xl p-1 md:p-4 lg:p-3 animate-pulse">
      <div className="flex gap-3 md:gap-4 lg:gap-5">
        {/* Product Image Skeleton */}
        <div className="relative shrink-0 w-[100px] h-[100px] md:w-24 md:h-24 lg:w-28 lg:h-28 bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-xl"></div>

        {/* Product Details Skeleton */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Product Name and Unit Price Skeleton */}
          <div className="flex-1 mb-0 md:mb-3 space-y-2">
            {/* Product Name Skeleton */}
            <div className="h-5 md:h-6 bg-light_mode_color2 dark:bg-dark_mode_color2 rounded w-3/4"></div>
            <div className="h-4 md:h-5 bg-light_mode_color2 dark:bg-dark_mode_color2 rounded w-1/2"></div>
            {/* Unit Price Skeleton */}
            <div className="h-4 bg-light_mode_color2 dark:bg-dark_mode_color2 rounded w-20"></div>
          </div>

          {/* Quantity Controls and Total Price Skeleton */}
          <div className="flex items-center justify-between gap-3 md:gap-4">
            {/* Quantity Controls Skeleton */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full h-[30px] w-[30px]"></div>
              <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded w-8 h-6"></div>
              <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full h-[30px] w-[30px]"></div>
            </div>

            {/* Total Price Skeleton */}
            <div className="h-5 md:h-6 bg-light_mode_color2 dark:bg-dark_mode_color2 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;
