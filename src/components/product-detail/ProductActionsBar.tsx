"use client";

import React from "react";
import { HiShoppingCart } from "react-icons/hi";

interface ProductActionsBarProps {
  totalPrice: number;
  onAddToCart: () => void;
  isLoading?: boolean;
}

const ProductActionsBar: React.FC<ProductActionsBarProps> = ({
  totalPrice,
  onAddToCart,
  isLoading = false,
}) => {
  const formattedTotalPrice = `Rs. ${totalPrice.toLocaleString("en-PK")}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-light_mode_color2 dark:bg-dark_mode_color2 px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-5 z-30">
      <div className="max-w-[1600px] mx-auto flex items-center gap-4 md:gap-6">
        {/* Total Price */}
        <div className="flex-1">
          <div className="flex flex-col">
            <span className="text-white dark:text-white text-xs md:text-sm font-medium opacity-70">
              Total
            </span>
            <span className="text-blue-500 dark:text-blue-400 text-2xl md:text-3xl lg:text-4xl font-bold">
              {formattedTotalPrice}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          disabled={isLoading}
          className="bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color hover:opacity-90 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed text-dark_mode_color dark:text-light_mode_text font-bold py-3 md:py-4 px-6 md:px-8 lg:px-10 rounded-xl text-sm md:text-base lg:text-lg flex items-center gap-2 transition-all active:scale-95 shadow-md"
        >
          <HiShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
          <span>{isLoading ? "Adding..." : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductActionsBar;

