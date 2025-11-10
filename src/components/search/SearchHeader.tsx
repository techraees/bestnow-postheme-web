"use client";

import React, { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { useRouter } from "next/navigation";

interface SearchHeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onFilterClick?: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery = "",
  onSearchChange,
  onFilterClick,
}) => {
  const router = useRouter();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    onSearchChange?.(value);
  };

  return (
    <div className="bg-light_mode_color dark:bg-dark_mode_color ">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-5">
        {/* Back Button and Search Title */}
        <div className="flex items-center gap-3 md:gap-4 mb-4">
          <button
            onClick={handleBack}
            className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity p-2 rounded-full hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2"
            aria-label="Go back"
          >
            <HiArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <h1 className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl lg:text-2xl font-semibold">
            Search
          </h1>
        </div>

        {/* Search Input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-light_mode_text dark:text-dark_mode_text opacity-60">
            <HiMagnifyingGlass className="h-5 w-5 md:h-6 md:w-6" />
          </div>
          <input
            type="text"
            value={localQuery}
            onChange={handleInputChange}
            placeholder="Search products..."
            className="w-full bg-light_mode_color2 dark:bg-dark_mode_color2 text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color border border-light_mode_color2 dark:border-dark_mode_color2 rounded-2xl pl-12 pr-12 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color focus:border-transparent"
          />
          <button
            onClick={onFilterClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity p-1.5 rounded-lg hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3"
            aria-label="Filter"
          >
            <HiAdjustmentsHorizontal className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
