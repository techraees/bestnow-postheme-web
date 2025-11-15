"use client";

import React from "react";
import { SearchIcon } from "@/assets";
import { Calendar } from "lucide-react";

interface OrderSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onCalendarClick?: () => void;
  placeholder?: string;
}

const OrderSearchInput: React.FC<OrderSearchInputProps> = ({
  value,
  onChange,
  onCalendarClick,
  placeholder = "Search invoice",
}) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-light_mode_yellow_color dark:text-dark_mode_yellow_color opacity-80">
        <SearchIcon className="h-5 w-5 md:h-6 md:w-6" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-light_mode_color2 dark:bg-dark_mode_color2 text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color border border-light_mode_color2 dark:border-dark_mode_color2 rounded-2xl pl-12 pr-12 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color focus:border-transparent"
      />
      {onCalendarClick && (
        <button
          type="button"
          onClick={onCalendarClick}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-light_mode_blue_color dark:text-dark_mode_blue_color hover:opacity-80 active:opacity-60 transition-opacity p-1.5 rounded-lg"
          aria-label="Filter by date"
        >
          <Calendar className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      )}
    </div>
  );
};

export default OrderSearchInput;

