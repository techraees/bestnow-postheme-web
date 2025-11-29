"use client";
import SubHeader from "@/components/navigation/SubHeader";
import SearchInput from "@/components/search/SearchInput";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import { CategoryCard } from "@/components/category-search";
import React, { useState } from "react";
import { useGetAllCategoriesQuery } from "@/redux/api/core/coreApi";

interface Category {
  id: string;
  label: string;
  image_url: string;
}

const page = () => {
  const { data: categoriesData, isLoading } = useGetAllCategoriesQuery("");
  const categories: Category[] = categoriesData?.payload || [];
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((category: Category) =>
    category.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryCount = filteredCategories.length;
  const totalCategoryCount = categories.length;

  return (
    <TopSpacingWrapper>
      <SubHeader
        subtitle={
          searchQuery
            ? `${categoryCount} found`
            : `${totalCategoryCount} categories`
        }
        title="Categories"
      />

      {/* Search Input Section */}
      <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-4 md:mt-6">
        <SearchInput
          initialValue={searchQuery}
          onSearchChange={(query) => {
            setSearchQuery(query);
          }}
          placeholder="Search categories..."
        />
      </div>

      {/* Categories List */}
      <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-4 md:mt-6 lg:mt-8 pb-8 md:pb-12 lg:pb-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-full flex items-center gap-4 p-3 md:p-4 rounded-xl bg-light_mode_color2 dark:bg-dark_mode_color2 animate-pulse"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-light_mode_color3 dark:bg-dark_mode_color3 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 md:h-5 bg-light_mode_color3 dark:bg-dark_mode_color3 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
            <div className="text-center max-w-md mx-auto px-4">
              <div className="mb-4 md:mb-6">
                <svg
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto text-light_mode_gray_color dark:text-dark_mode_gray_color opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl font-semibold mb-2 md:mb-3">
                No categories found
              </p>
              <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base">
                {searchQuery
                  ? `No categories match "${searchQuery}". Try searching with different keywords.`
                  : "No categories available at the moment."}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
            {filteredCategories.map((category: Category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                title={category.label}
                image={category.image_url}
                link={`/category-search-list?category=${category.label}`}
              />
            ))}
          </div>
        )}
      </div>
    </TopSpacingWrapper>
  );
};

export default page;
