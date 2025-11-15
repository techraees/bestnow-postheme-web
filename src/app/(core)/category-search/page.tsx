"use client";
import SubHeader from "@/components/navigation/SubHeader";
import SearchInput from "@/components/search/SearchInput";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import { CategoryCard } from "@/components/category-search";
import React, { useState } from "react";

interface Category {
  id: string;
  title: string;
  image: string;
  link: string;
}

const categories: Category[] = [
  {
    id: "1",
    title: "Lcd Screen",
    image:
      "https://adminapi.beston.co/uploads/products/8515/images/MOSHI_UNIT_____LCD_VIVO_Y3_Y11_Y12_Y15_Y17_BLACK1.webp",
    link: "/category-search-list?category=lcd-screen",
  },
  {
    id: "2",
    title: "Touch",
    image:
      "https://adminapi.beston.co/uploads/products/9886/images/SNL____TOUCH_GLASS_OCA_HUAWEI_P20_LITE_BLACK1.webp",
    link: "/category-search-list?category=touch",
  },
  {
    id: "3",
    title: "Chargers",
    image:
      "https://adminapi.beston.co/uploads/products/9091/images/SNL____CHARGER_67_WATT_CABLE1.webp",
    link: "/category-search-list?category=chargers",
  },
  {
    id: "4",
    title: "Batteries",
    image:
      "https://adminapi.beston.co/uploads/products/commonImages/10890/images/FORCE_BT____BATTERY_APPLE_IPHONE_112.webp",
    link: "/category-search-list?category=batteries",
  },
  {
    id: "5",
    title: "Frames",
    image:
      "https://adminapi.beston.co/uploads/products/5379/images/UNIT_GC_____LCD_TECNO_CAMON_11_PRO_CF8_BLACK1.webp",
    link: "/category-search-list?category=frames",
  },
];

const page = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TopSpacingWrapper>
      <SubHeader subtitle="10" title="Categories" />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-4">
        <SearchInput
          initialValue={searchQuery}
          onSearchChange={(query) => {
            setSearchQuery(query);
          }}
          placeholder="Search products..."
        />
      </div>

      {/* Categories List */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-6 pb-8">
        <div className="flex flex-col gap-1.5 md:gap-4">
          {filteredCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 md:py-20">
              <p className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl font-medium mb-2">
                No categories found
              </p>
              <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                title={category.title}
                image={category.image}
                link={category.link}
              />
            ))
          )}
        </div>
      </div>
    </TopSpacingWrapper>
  );
};

export default page;
