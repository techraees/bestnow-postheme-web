"use client";

import React from "react";
import Image from "next/image";

interface ReplaceItemProps {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  onDetailsClick?: () => void;
}

const ReplaceItem: React.FC<ReplaceItemProps> = ({
  id,
  name,
  image,
  unitPrice,
  quantity,
  onDetailsClick,
}) => {
  const formattedUnitPrice = `Rs. ${unitPrice.toLocaleString("en-PK")}`;

  return (
    <div className="bg-light_mode_color dark:bg-dark_mode_color rounded-2xl p-1 md:p-4 lg:p-5 transition-shadow">
      <div className="flex gap-3 md:gap-4 lg:gap-5">
        {/* Product Image */}
        <div className="relative flex-shrink-0 w-[100px] h-[100px] md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <Image
            src={image}
            alt={name}
            fill
            className="object-fill"
            sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Product Name and Unit Price */}
          <div className="flex-1 mb-0 md:mb-3">
            <h3 className="text-light_mode_text dark:text-dark_mode_text opacity-85 text-sm md:text-base lg:text-lg font-medium line-clamp-2 mb-1 md:mb-2 leading-tight">
              {name}
            </h3>
            <p className="text-light_mode_text dark:text-dark_mode_text text-[16px] lg:text-base font-[400]">
              {formattedUnitPrice}
            </p>
          </div>

          {/* Quantity and Details Button */}
          <div className="flex items-center justify-between gap-3 md:gap-4">
            {/* Quantity Display */}
            <div className="flex items-center text-light_mode_blue_color dark:text-dark_mode_blue_color text-sm md:text-base font-medium">
              {quantity.toString().padStart(2, "0")}
            </div>

            {/* Details Button */}
            <button
              onClick={onDetailsClick}
              className="px-4 py-2 bg-light_mode_color2 dark:bg-dark_mode_color2 text-light_mode_yellow_color dark:text-dark_mode_yellow_color rounded-xl text-sm md:text-base font-medium hover:opacity-80 active:opacity-60 transition-opacity"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplaceItem;

