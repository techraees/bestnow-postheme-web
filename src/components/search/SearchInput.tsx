"use client";

import { SearchIcon } from "@/assets";
import FilterIcon from "@/assets/icons/input/FilterIcon";
import React from "react";
import { useForm } from "react-hook-form";

interface SearchInputProps {
  initialValue?: string;
  onSearchChange?: (query: string) => void;
  onFilterClick?: () => void;
  placeholder?: string;
}

interface SearchFormData {
  query: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  initialValue = "",
  onSearchChange,
  onFilterClick,
  placeholder = "Search products...",
}) => {
  const { register, watch, handleSubmit, reset } = useForm<SearchFormData>({
    defaultValues: {
      query: initialValue,
    },
  });

  const queryValue = watch("query");

  // Update form when initialValue changes
  React.useEffect(() => {
    if (initialValue !== queryValue) {
      reset({ query: initialValue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  // Watch for changes and call onSearchChange
  React.useEffect(() => {
    onSearchChange?.(queryValue);
  }, [queryValue, onSearchChange]);

  const onSubmit = (data: SearchFormData) => {
    onSearchChange?.(data.query);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-light_mode_text dark:text-dark_mode_text opacity-60">
        <SearchIcon className="h-5 w-5 text-light_mode_yellow_color dark:text-dark_mode_yellow_color md:h-6 md:w-6" />
      </div>
      <input
        type="text"
        {...register("query")}
        placeholder={placeholder}
        className="w-full bg-light_mode_color2 dark:bg-dark_mode_color2 text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color border border-light_mode_color2 dark:border-dark_mode_color2 rounded-full pl-12 pr-12 py-3.5 md:py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color focus:border-transparent"
      />
      {onFilterClick && (
        <button
          type="button"
          onClick={onFilterClick}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity p-1.5 rounded-lg hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3"
          aria-label="Filter"
        >
          <FilterIcon className="h-5 w-5 text-light_mode_blue_color dark:text-dark_mode_blue_color md:h-6 md:w-6" />
        </button>
      )}
    </form>
  );
};

export default SearchInput;
