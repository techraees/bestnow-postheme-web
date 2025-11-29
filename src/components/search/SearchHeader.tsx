"use client";

import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";
import SubHeader from "../navigation/SubHeader";

interface SearchHeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
  onFilterClick?: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery = "",
  onSearchChange,
  onSearchSubmit,
  onFilterClick,
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="bg-light_mode_color dark:bg-dark_mode_color ">
      <div className="">
        <SubHeader title="Search" />
        {/* Back Button and Search Title */}
        {/* <div className="flex items-center gap-3 md:gap-4 mb-4">
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
        </div> */}

        {/* Search Input */}
        <div className="w-full flex lg:justify-end justify-baseline  px-4 sm:px-6 lg:px-16 mt-4 md:mt-6">
          <div className="lg:w-[300px] w-full">
            <SearchInput
              initialValue={searchQuery}
              onSearchChange={(query) => {
                onSearchChange(query);
              }}
              placeholder="Search products..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchHeader;
