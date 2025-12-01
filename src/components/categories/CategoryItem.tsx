"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  name: string;
  icon?: React.ReactNode;
  image?: any; // Next.js Image type
  onClick?: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  name,
  icon,
  image,
  onClick,
}) => {
  return (
    <Link href={`category-search-list?category=${name}`}>
      <button
        onClick={onClick}
        className="flex flex-col items-center gap-2  active:scale-95 transition-transform"
      >
        {/* Category Icon/Image */}
        <div className="
          relative 
          w-[65px] h-[65px] 
          md:w-16 md:h-16 
          lg:w-[200px] lg:h-[200px]
          rounded-full 
          bg-white 
          flex items-center justify-center 
          overflow-hidden 
          border lg:border-2 
          hover:border-accent 
          transition-colors
        ">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 65px, (max-width: 1024px) 70px, 200px"
            />
          ) : (
            <div className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl">
              {icon || "📱"}
            </div>
          )}
        </div>

        {/* Category Name */}
        <span className="text-light_mode_text dark:text-dark_mode_text text-[10px] md:text-xs lg:text-[16px] text-center font-medium max-w-[80px] ">
          {name}
        </span>
      </button>
    </Link>
  );
};

export default CategoryItem;
