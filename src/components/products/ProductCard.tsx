"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { HiStar } from "react-icons/hi";

interface ProductCardProps {
  id: string;
  title: string;
  image: any;
  rating?: number;
  soldCount?: number;
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
  soldCount = 456,
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
    <div className="relative w-full bg-light_mode_color dark:bg-dark_mode_color rounded-2xl overflow-hidden">
      {/* Product Image Area - White Background with rounded corners (60-65% height) */}
      <div className="relative bg-white rounded-2xl mt-2 mb-3 h-[180px] md:h-[190px] flex items-center justify-center">
        {/* Favorite Icon - Light gray circular button with black outline heart */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-400 flex items-center justify-center hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? (
            <HiHeart className="h-4 w-4 text-dark_mode_color fill-current" />
          ) : (
            <HiOutlineHeart className="h-4 w-4 text-dark_mode_color dark:text-light_mode_text stroke-[2.5]" />
          )}
        </button>

        {/* Product Image */}
        <div className="relative w-full h-full flex items-center justify-center px-2">
          <Image
            src={image}
            alt={title}
            width={190}
            height={190}
            className="object-contain w-auto h-full max-w-full"
          />
        </div>
      </div>

      {/* Product Details Area */}
      <div className="bg-light_mode_color dark:bg-dark_mode_color pb-1 space-y-0.5 px-2">
        {/* Product Title */}
        <h3 className="text-light_mode_text dark:text-dark_mode_text text-sm font-medium line-clamp-2 min-h-[38px] leading-tight">
          {title}
        </h3>

        {/* Rating and Sold Count */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <HiStar className="h-4 w-4 text-light_mode_yellow_color dark:text-dark_mode_yellow_color fill-current" />
            <span className="text-light_mode_text dark:text-dark_mode_text">
              {rating}/5
            </span>
          </div>
          <span className="text-light_mode_gray_color dark:text-dark_mode_gray_color">
            {soldCount} Sold
          </span>
        </div>

        {/* Price - Bright Yellow */}
        <div className="">
          <span className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color text-base md:text-lg font-bold">
            {formattedPrice}
          </span>
        </div>

        {/* Add to Cart Button - Dark gray rounded rectangle */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-0.5 bg-light_mode_color2 dark:bg-dark_mode_color2 hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 text-light_mode_text dark:text-dark_mode_text py-2.5 rounded-2xl font-medium text-xs md:text-sm transition-colors active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
