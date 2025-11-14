"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { HiStar } from "react-icons/hi";

interface ProductCardProps {
  id: string;
  title: string;
  image: any;
  rating?: number;
  soldCount?: string;
  price: number;
  isFavorite?: boolean;
  onFavoriteClick?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  image,
  rating = 4.5,
  soldCount = "Very Low",
  price,
  isFavorite = false,
  onFavoriteClick,
  onAddToCart,
}) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
    onFavoriteClick?.(id);
  };

  const handleAddToCart = () => {
    onAddToCart?.(id);
  };

  // Format price with Rs. prefix
  const formattedPrice = `Rs. ${price.toLocaleString("en-PK")}`;

  return (
    <div className="relative w-full bg-light_mode_color dark:bg-dark_mode_color rounded-2xl overflow-hidden transition-transform hover:scale-[1.02] duration-200">
      {/* Product Image Area - White Background with rounded corners (60-65% height) */}
      <Link href={`/products/${id}`} className="block">
        <div className="relative border bg-white rounded-2xl mt-2 mb-3 h-[180px] md:h-[200px] lg:h-[220px] flex items-center justify-center cursor-pointer">
          {/* Favorite Icon - Light gray circular button with black outline heart */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleFavoriteClick();
            }}
            className="absolute top-2 right-2 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-300 dark:bg-gray-400 flex items-center justify-center hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {favorite ? (
              <HiHeart className="h-4 w-4 md:h-5 md:w-5 text-dark_mode_color fill-current" />
            ) : (
              <HiOutlineHeart className="h-4 w-4 md:h-5 md:w-5 text-dark_mode_color dark:text-light_mode_text stroke-[2.5]" />
            )}
          </button>

          {/* Product Image */}
          <div className="relative w-full h-full rounded-2xl flex items-center justify-center overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={190}
              height={190}
              className="object-fill  h-full max-w-full"
            />
          </div>
        </div>
      </Link>

      {/* Product Details Area */}
      <div className="bg-light_mode_color dark:bg-dark_mode_color pb-1 space-y-0.5 px-2 md:px-3">
        {/* Product Title */}
        <Link href={`/products/${id}`} className="block">
          <h3 className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-medium line-clamp-2 min-h-[38px] md:min-h-[44px] leading-tight cursor-pointer hover:opacity-80 transition-opacity">
            {title}
          </h3>
        </Link>

        {/* Rating and Sold Count */}
        <div className="flex items-center justify-between text-xs md:text-sm">
          <div className="flex items-center gap-1">
            <HiStar className="h-4 w-4 md:h-5 md:w-5 text-light_mode_yellow_color dark:text-dark_mode_yellow_color fill-current" />
            <span className="text-light_mode_text dark:text-dark_mode_text">
              {rating}/5
            </span>
          </div>
          {(() => {
            let colorClass =
              "text-light_mode_gray_color dark:text-dark_mode_gray_color";
            if (soldCount) {
              const lower = soldCount;
              console.log(lower);
              if (lower === "Very High") {
                colorClass =
                  "text-light_mode_green_color dark:text-dark_mode_green_color";
              } else if (lower == "Moderate") {
                colorClass = "text-orange-500 dark:text-dark_mode_orange_color";
              } else if (lower == "Very Low") {
                colorClass =
                  "text-light_mode_red_color dark:text-dark_mode_red_color";
              }
            }
            return <span className={colorClass}>{soldCount}</span>;
          })()}
        </div>

        {/* Price - Bright Yellow */}
        <div className="pt-1">
          <span className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color text-base md:text-lg lg:text-xl font-bold">
            {formattedPrice}
          </span>
        </div>

        {/* Add to Cart Button - Dark gray rounded rectangle */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-1 md:mt-2 bg-light_mode_color2 dark:bg-dark_mode_color2 hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 text-light_mode_text dark:text-dark_mode_text py-2.5 md:py-3 rounded-2xl font-medium text-xs md:text-sm transition-colors active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
