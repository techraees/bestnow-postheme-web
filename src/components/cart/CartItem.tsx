"use client";

import React from "react";
import Image from "next/image";
import { HiMinus, HiPlus } from "react-icons/hi";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    <div className="bg-light_mode_color dark:bg-dark_mode_color rounded-2xl p-1 md:p-4 lg:p-5  transition-shadow">
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

          {/* Quantity Controls and Total Price */}
          <div className="flex items-center justify-between gap-3 md:gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center text-light_mode_blue_color dark:text-dark_mode_blue_color tetx-sm gap-2 md:gap-3 ">
              <div
                onClick={handleDecrease}
                className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full h-[30px] w-[30px] flex justify-center items-center text-dark_mode_color dark:text-light_mode_color"
              >
                <ChevronDown size={20} />
              </div>
              {quantity.toString().padStart(2, "0")}
              <div
                onClick={handleIncrease}
                className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full  h-[30px] w-[30px] flex justify-center items-center text-light_mode_yellow_color dark:text-dark_mode_yellow_color"
              >
                <ChevronUp size={20} />
              </div>
            </div>

            {/* Total Price */}
            <div className="text-right">
              <p className="text-light_mode_text dark:text-dark_mode_text text-[16px] md:text-base lg:text-lg font-bold">
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
