"use client";

import React from "react";
import Image from "next/image";

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
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2  active:scale-95 transition-transform"
    >
      {/* Category Icon/Image */}
      <div className="w-[65px] h-[65px] md:w-16 md:h-16 rounded-full bg-light_mode_color2 dark:bg-dark_mode_color3 flex items-center justify-center overflow-hidden border-2 border-transparent hover:border-accent transition-colors">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl">
            {icon || "📱"}
          </div>
        )}
      </div>

      {/* Category Name */}
      <span className="text-light_mode_text dark:text-dark_mode_text text-[10px] md:text-xs text-center font-medium max-w-[80px] truncate">
        {name}
      </span>
    </button>
  );
};

export default CategoryItem;
