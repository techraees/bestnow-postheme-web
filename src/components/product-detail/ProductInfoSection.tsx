"use client";

import React from "react";
import { HiStar } from "react-icons/hi";
import { HiArrowUpRight } from "react-icons/hi2";
import { HiMinus, HiPlus } from "react-icons/hi";

interface ProductInfoSectionProps {
  price: number;
  name: string;
  rating?: number;
  reviewCount?: number;
  soldCount?: number;
  warranty?: string;
  quantity?: number;
  onQuantityIncrease?: () => void;
  onQuantityDecrease?: () => void;
  onDescriptionClick?: () => void;
  onReviewsClick?: () => void;
}

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({
  price,
  name,
  rating = 4.5,
  reviewCount = 459,
  soldCount = 456,
  warranty = "2 Year Warranty",
  quantity = 1,
  onQuantityIncrease,
  onQuantityDecrease,
  onDescriptionClick,
  onReviewsClick,
}) => {
  const formattedPrice = `Rs. ${price.toLocaleString("en-PK")}`;

  return (
    <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 px-4 sm:px-6 lg:px-8 xl:px-12 py-6 md:py-8 space-y-4 md:space-y-5">
      {/* Price */}
      <div>
        <h2 className="text-white dark:text-white text-3xl md:text-4xl lg:text-5xl font-bold">
          {formattedPrice}
        </h2>
      </div>

      {/* Product Name */}
      <div>
        <p className="text-white dark:text-white text-base md:text-lg lg:text-xl">
          {name}
        </p>
      </div>

      {/* Rating and Sold Count Row */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <button className="bg-light_mode_color3 dark:bg-dark_mode_color3 hover:opacity-90 rounded-xl px-4 py-3 flex items-center justify-center gap-2 transition-opacity">
          <HiStar className="h-4 w-4 md:h-5 md:w-5 text-light_mode_yellow_color dark:text-dark_mode_yellow_color fill-current" />
          <span className="text-white dark:text-white text-sm md:text-base font-medium">
            {rating}/5 ({reviewCount})
          </span>
        </button>
        <button className="bg-light_mode_color3 dark:bg-dark_mode_color3 hover:opacity-90 rounded-xl px-4 py-3 transition-opacity">
          <span className="text-white dark:text-white text-sm md:text-base font-medium">
            {soldCount} Sold
          </span>
        </button>
      </div>

      {/* Warranty and Description Row */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <button className="bg-light_mode_color3 dark:bg-dark_mode_color3 hover:opacity-90 rounded-xl px-4 py-3 transition-opacity">
          <span className="text-blue-500 dark:text-blue-400 text-sm md:text-base font-medium">
            {warranty}
          </span>
        </button>
        <button
          onClick={onDescriptionClick}
          className="bg-light_mode_color3 dark:bg-dark_mode_color3 hover:opacity-90 rounded-xl px-4 py-3 flex items-center justify-center gap-2 transition-opacity"
        >
          <span className="text-white dark:text-white text-sm md:text-base font-medium">
            Description
          </span>
          <HiArrowUpRight className="h-4 w-4 text-light_mode_yellow_color dark:text-dark_mode_yellow_color" />
        </button>
      </div>

      {/* Rating & Reviews and Quantity Selector Row */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <button
          onClick={onReviewsClick}
          className="bg-light_mode_color3 dark:bg-dark_mode_color3 hover:opacity-90 rounded-xl px-4 py-3 flex items-center justify-center gap-2 transition-opacity"
        >
          <span className="text-white dark:text-white text-sm md:text-base font-medium">
            Rating & Reviews
          </span>
          <HiArrowUpRight className="h-4 w-4 text-light_mode_yellow_color dark:text-dark_mode_yellow_color" />
        </button>
        {/* Quantity Selector */}
        <div className="flex items-center gap-2 bg-light_mode_color3 dark:bg-dark_mode_color3 rounded-xl px-4 py-3">
          <button
            onClick={onQuantityDecrease}
            disabled={quantity <= 1}
            className="text-white dark:text-white hover:opacity-80 rounded-lg p-1 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <HiMinus className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <span className="text-white dark:text-white font-semibold text-base md:text-lg min-w-[2.5rem] text-center">
            {quantity.toString().padStart(2, "0")}
          </span>
          <button
            onClick={onQuantityIncrease}
            className="text-white dark:text-white hover:opacity-80 rounded-lg p-1 transition-opacity"
            aria-label="Increase quantity"
          >
            <HiPlus className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSection;

