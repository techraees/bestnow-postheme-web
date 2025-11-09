"use client";

import React from "react";
import CategoryItem from "./CategoryItem";
import { category1, category2, category3 } from "@/assets/images/category";
import { BannerImage, BannerImage1 } from "@/assets";

interface Category {
  id: string;
  name: string;
  icon?: React.ReactNode;
  image?: any; // Next.js Image type
}

interface CategoriesSectionProps {
  categories?: Category[];
  onCategoryClick?: (category: Category) => void;
  onSeeAllClick?: () => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories = [
    { id: "1", name: "Lcd Screen", image: BannerImage1 },
    { id: "2", name: "Touch", image: BannerImage },
    { id: "3", name: "Chargers", image: BannerImage1 },
    { id: "4", name: "Batteries", image: BannerImage },
    { id: "5", name: "Frames", image: BannerImage1 },
    { id: "6", name: "Lcd Screen", image: BannerImage1 },
    { id: "7", name: "Touch", image: BannerImage },
    { id: "8", name: "Chargers", image: BannerImage1 },
    { id: "9", name: "Batteries", image: BannerImage },
    { id: "10", name: "Frames", image: BannerImage1 },
  ],
  onCategoryClick,
  onSeeAllClick,
}) => {
  return (
    <div className="w-full mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-light_mode_text dark:text-dark_mode_text text-lg font-semibold">
          Categories
        </h2>
        <button
          onClick={onSeeAllClick}
          className="text-light_mode_text dark:text-dark_mode_text text-sm hover:opacity-80 transition-opacity"
        >
          See all
        </button>
      </div>

      {/* Horizontal Scrollable Categories */}
      <div className="overflow-x-auto scrollbar_hide_custom">
        <div className="flex gap-2.5 px-4 pb-2">
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              name={category.name}
              icon={category.icon}
              image={category.image}
              onClick={() => onCategoryClick?.(category)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
