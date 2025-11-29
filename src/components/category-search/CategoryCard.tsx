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
      className="w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-light_mode_color2 dark:bg-dark_mode_color2 hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 border border-transparent hover:border-light_mode_color3 dark:hover:border-dark_mode_color3 active:scale-[0.98] transition-all duration-200 group"
    >
      {/* Category Image */}
      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white dark:bg-dark_mode_color overflow-hidden border-2 border-light_mode_color3 dark:border-dark_mode_color3 shrink-0 group-hover:border-light_mode_yellow_color dark:group-hover:border-dark_mode_yellow_color transition-colors duration-200 shadow-sm group-hover:shadow-md">
        <div className="w-full h-full overflow-hidden rounded-full">
          <Image
            src={image}
            alt={title}
            width={96}
            height={96}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
          />
        </div>
      </div>

      {/* Category Title */}
      <span className="text-left text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-medium flex-1 group-hover:text-light_mode_yellow_color dark:group-hover:text-dark_mode_yellow_color transition-colors duration-200">
        {title}
      </span>
      <svg
        className="w-5 h-5 md:w-6 md:h-6 text-light_mode_text dark:text-dark_mode_text opacity-60 group-hover:opacity-100 group-hover:text-light_mode_yellow_color dark:group-hover:text-dark_mode_yellow_color group-hover:translate-x-1 transition-all duration-200 shrink-0"
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
