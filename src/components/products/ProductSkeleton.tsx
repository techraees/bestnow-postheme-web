"use client";

import React from "react";

const ProductSkeleton: React.FC = () => {
  return (
    <div className="relative w-full bg-light_mode_color dark:bg-dark_mode_color rounded-2xl overflow-hidden animate-pulse">
      {/* Product Image Area */}
      <div className="relative border bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-2xl mt-2 mb-3 h-[180px] md:h-[200px] lg:h-[220px] flex items-center justify-center">
        {/* Favorite Icon Skeleton */}
        <div className="absolute top-2 right-2 w-8 h-8 md:w-9 md:h-9 rounded-full bg-light_mode_color3 dark:bg-dark_mode_color3" />
        
        {/* Image Skeleton */}
        <div className="w-full h-full rounded-2xl bg-light_mode_color3 dark:bg-dark_mode_color3" />
      </div>

      {/* Product Details Area */}
      <div className="bg-light_mode_color dark:bg-dark_mode_color pb-1 space-y-0.5 px-2 md:px-3">
        {/* Title Skeleton */}
        <div className="space-y-2 min-h-[44px]">
          <div className="h-4 bg-light_mode_color3 dark:bg-dark_mode_color3 rounded w-full" />
          <div className="h-4 bg-light_mode_color3 dark:bg-dark_mode_color3 rounded w-3/4" />
        </div>

        {/* Rating and Sold Count Skeleton */}
        <div className="flex items-center justify-between mt-2">
          <div className="h-4 bg-light_mode_color3 dark:bg-dark_mode_color3 rounded w-12" />
          <div className="h-4 bg-light_mode_color3 dark:bg-dark_mode_color3 rounded w-16" />
        </div>

        {/* Price Skeleton */}
        <div className="pt-1">
          <div className="h-6 bg-light_mode_color3 dark:bg-dark_mode_color3 rounded w-24" />
        </div>

        {/* Add to Cart Button Skeleton */}
        <div className="w-full mt-1 md:mt-2 h-10 bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-2xl" />
      </div>
    </div>
  );
};

export default ProductSkeleton;

