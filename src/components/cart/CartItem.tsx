"use client";

import React from "react";
import Image from "next/image";
import { HiMinus, HiPlus } from "react-icons/hi";

interface CartItemProps {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  image,
  unitPrice,
  quantity,
  onQuantityChange,
  onRemove,
}) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    } else if (onRemove) {
      onRemove(id);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(id, quantity + 1);
  };

  const totalPrice = unitPrice * quantity;
  const formattedUnitPrice = `Rs. ${unitPrice.toLocaleString("en-PK")}`;
  const formattedTotalPrice = `Rs. ${totalPrice.toLocaleString("en-PK")}`;

  return (
    <div className="bg-light_mode_color dark:bg-dark_mode_color rounded-2xl p-3 md:p-4 lg:p-5 shadow-sm border border-light_mode_color2 dark:border-dark_mode_color2 hover:shadow-md transition-shadow">
      <div className="flex gap-3 md:gap-4 lg:gap-5">
        {/* Product Image */}
        <div className="relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-2 md:p-3"
            sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Product Name and Unit Price */}
          <div className="flex-1 mb-2 md:mb-3">
            <h3 className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base lg:text-lg font-medium line-clamp-2 mb-1 md:mb-2 leading-tight">
              {name}
            </h3>
            <p className="text-light_mode_text dark:text-dark_mode_text text-xs md:text-sm lg:text-base font-semibold">
              {formattedUnitPrice}
            </p>
          </div>

          {/* Quantity Controls and Total Price */}
          <div className="flex items-center justify-between gap-3 md:gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2 md:gap-3 bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-xl px-2 md:px-3 py-1 md:py-1.5">
              <button
                onClick={handleDecrease}
                className="text-light_mode_text dark:text-dark_mode_text hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 rounded-lg p-1 md:p-1.5 transition-colors active:scale-95"
                aria-label="Decrease quantity"
              >
                <HiMinus className="h-4 w-4 md:h-5 md:w-5" />
              </button>
              <span className="text-blue-500 dark:text-blue-400 font-semibold text-sm md:text-base lg:text-lg min-w-[2rem] md:min-w-[2.5rem] text-center">
                {quantity.toString().padStart(2, "0")}
              </span>
              <button
                onClick={handleIncrease}
                className="text-light_mode_text dark:text-dark_mode_text hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 rounded-lg p-1 md:p-1.5 transition-colors active:scale-95"
                aria-label="Increase quantity"
              >
                <HiPlus className="h-4 w-4 md:h-5 md:w-5" />
              </button>
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

export default CartItem;

