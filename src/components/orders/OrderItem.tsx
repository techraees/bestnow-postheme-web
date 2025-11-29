"use client";

import React from "react";
import Image from "next/image";
import { category1 } from "@/assets";

interface OrderItemProps {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
}

const OrderItem: React.FC<OrderItemProps> = ({
  id,
  name,
  image,
  unitPrice,
  quantity,
}) => {
  const totalPrice = unitPrice * quantity;
  const formattedUnitPrice = `Rs. ${unitPrice.toLocaleString("en-PK")}`;
  const formattedTotalPrice = `Rs. ${totalPrice.toLocaleString("en-PK")}`;
  console.log("totalPrice", image);

  return (
    <div className="bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 transition-shadow hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3">
      <div className="flex gap-3 md:gap-4 lg:gap-5">
        {/* Product Image */}
        <div className="relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white dark:bg-dark_mode_color rounded-lg md:rounded-xl overflow-hidden border border-light_mode_color3 dark:border-dark_mode_color3 shadow-sm">
          <Image
            src={category1 || image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Product Name and Unit Price */}
          <div className="flex-1 mb-2 md:mb-3">
            <h3 className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base lg:text-lg font-semibold line-clamp-2 mb-1 md:mb-2 leading-tight">
              {name}
            </h3>
            <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-xs md:text-sm lg:text-base font-medium">
              {formattedUnitPrice} per unit
            </p>
          </div>

          {/* Quantity and Total Price */}
          <div className="flex items-center justify-between gap-3 md:gap-4">
            {/* Quantity Display */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-xs md:text-sm">
                Qty:
              </span>
              <span className="text-light_mode_blue_color dark:text-dark_mode_blue_color text-sm md:text-base lg:text-lg font-semibold">
                {quantity.toString().padStart(2, "0")}
              </span>
            </div>

            {/* Total Price */}
            <div className="text-right">
              <p className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base lg:text-lg font-bold">
                {formattedTotalPrice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
