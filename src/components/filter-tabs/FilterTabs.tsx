"use client";

import { FilterIcon } from "@/assets";
import Image from "next/image";
import React from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

export type FilterTab = "popular" | "new" | "in-stock";

interface FilterTabsProps {
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  onFilterClick?: () => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  activeTab,
  onTabChange,
  onFilterClick,
}) => {
  const tabs: { id: FilterTab; label: string }[] = [
    { id: "popular", label: "Popular" },
    { id: "new", label: "New" },
    { id: "in-stock", label: "In Stock" },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 md:gap-4 overflow-x-auto scrollbar_hide_custom md:overflow-x-visible">
        {/* Filter Icon */}
        <button
          onClick={onFilterClick}
          className="shrink-0 w-[45px] h-[45px] md:w-[50px] md:h-[50px] lg:w-[55px] lg:h-[55px] rounded-full bg-light_mode_color3 dark:bg-dark_mode_color3 border border-light_mode_border1 dark:border-dark_mode_border2 flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label="Filter"
        >
          <Image
            src={FilterIcon}
            alt="Filter"
            width={20}
            height={20}
            className="md:w-6 md:h-6"
          />
        </button>

        {/* Tabs */}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`shrink-0 px-5 md:px-6 lg:px-8 py-2 h-[45px] md:h-[50px] lg:h-[55px] rounded-full font-medium text-sm md:text-base transition-colors ${
              activeTab === tab.id
                ? "bg-dark_mode_blue_color text-white"
                : "bg-light_mode_color2 dark:bg-dark_mode_color2 text-light_mode_text dark:text-dark_mode_text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;
