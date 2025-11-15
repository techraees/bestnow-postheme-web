"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CategoryCardProps {
  id: string;
  title: string;
  image: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  title,
  image,
  link,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(link);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-4 p-2 active:scale-[0.98] transition-all duration-200 "
    >
      {/* Category Image */}
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white dark:bg-dark_mode_color2 overflow-hidden border border-light_mode_color3 dark:border-dark_mode_color3 shrink-0">
        <div className="w-full h-full overflow-hidden rounded-full">
          <Image
            src={image}
            alt={title}
            width={80}
            height={80}
            className="w-full h-full object-fill "
          />
        </div>
      </div>

      {/* Category Title */}
      <span className="text-left text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-medium flex-1">
        {title}
      </span>
      <svg
        className="w-5 h-5 md:w-6 md:h-6 text-light_mode_text dark:text-dark_mode_text opacity-60 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
};

export default CategoryCard;
