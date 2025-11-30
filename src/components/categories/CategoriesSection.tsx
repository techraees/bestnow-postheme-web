"use client";

import React from "react";
import CategoryItem from "./CategoryItem";
import { category1, category2, category3 } from "@/assets/images/category";
import { BannerImage, BannerImage1 } from "@/assets";
import Link from "next/link";

interface Category {
  id: string;
  label: string;
  image_url: string;
}

interface CategoriesSectionProps {
  categories?: Category[];
  onCategoryClick?: (category: Category) => void;
  onSeeAllClick?: () => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories = [
    {
      id: "1",
      name: "Lcd Screen",
      image:
        "https://adminapi.beston.co/uploads/products/8515/images/MOSHI_UNIT_____LCD_VIVO_Y3_Y11_Y12_Y15_Y17_BLACK1.webp",
    },
    {
      id: "2",
      name: "Touch",
      image:
        "https://adminapi.beston.co/uploads/products/9886/images/SNL____TOUCH_GLASS_OCA_HUAWEI_P20_LITE_BLACK1.webp",
    },
    {
      id: "3",
      name: "Chargers",
      image:
        "https://adminapi.beston.co/uploads/products/9091/images/SNL____CHARGER_67_WATT_CABLE1.webp",
    },
    {
      id: "4",
      name: "Batteries",
      image:
        "https://adminapi.beston.co/uploads/products/commonImages/10890/images/FORCE_BT____BATTERY_APPLE_IPHONE_112.webp",
    },
    {
      id: "5",
      name: "Frames",
      image:
        "https://adminapi.beston.co/uploads/products/5379/images/UNIT_GC_____LCD_TECNO_CAMON_11_PRO_CF8_BLACK1.webp",
    },
    {
      id: "6",
      name: "Lcd Screen",
      image:
        "https://adminapi.beston.co/uploads/products/5581/images/FALCON UNIT  -- LCD VIVO Y20 BLACK 1.webp",
    },
    {
      id: "7",
      name: "Touch",
      image:
        "https://adminapi.beston.co/uploads/products/8983/images/FALCON____BATTERY_HUAWEI_MATE_10_LITE 1.webp",
    },
    {
      id: "8",
      name: "Chargers",
      image:
        "https://adminapi.beston.co/uploads/products/2709/images/KT -- LCD N105 NEW 1.webp",
    },
    {
      id: "9",
      name: "Batteries",
      image:
        "https://adminapi.beston.co/uploads/products/10473/images/HX_UNIT____LCD_ITEL_A49_BLACK1.webp",
    },
    {
      id: "10",
      name: "Frames",
      image:
        "https://adminapi.beston.co/uploads/displayMappings/shop_assets/display_mappping/87/images/SUNLONG_UNIT_LCD_6VAZR52.webp",
    },
  ],
  onCategoryClick,
  onSeeAllClick,
}) => {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 md:mb-5 lg:mb-6">
        <h2 className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl lg:text-2xl font-semibold">
          Categories
        </h2>
        <Link href="/category-search">
          <button className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-medium">
            See All
          </button>
        </Link>
      </div>

      {/* Horizontal Scrollable Categories - Desktop: Show all, Mobile: Scrollable */}
      <div className="overflow-x-auto scrollbar_hide_custom ">
        <div className="flex gap-2.5 md:gap-3 lg:gap-4 pb-2  md:pb-0">
          {categories.map((category: any) => (
            <CategoryItem
              key={category.id}
              name={category.label}
              icon={category.icon}
              image={category.image_url}
              onClick={() => onCategoryClick?.(category)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
