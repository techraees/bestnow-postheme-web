"use client";

import React, { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";
import {
  useGetAllProductsBrandsNamesQuery,
  useGetAllProductsCategoriesQuery,
} from "@/redux/api/core/coreApi";

export interface FilterOptions {
  brand: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  onReset: () => void;
  initialFilters?: FilterOptions;
  minPriceRange?: number;
  maxPriceRange?: number;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  onApply,
  onReset,
  initialFilters = { brand: "", category: "", minPrice: 0, maxPrice: 100000 },
  minPriceRange = 0,
  maxPriceRange = 100000,
}) => {
  const [selectedBrand, setSelectedBrand] = useState(initialFilters.brand);
  const [selectedCategory, setSelectedCategory] = useState(
    initialFilters.category
  );
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);

  // Fetch brands and categories from API
  const { data: brandsData, isLoading: brandsLoading } =
    useGetAllProductsBrandsNamesQuery();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetAllProductsCategoriesQuery();

  const brands = brandsData?.payload || [];
  const categories = categoriesData?.payload || [];

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setSelectedBrand(initialFilters.brand);
      setSelectedCategory(initialFilters.category);
      setMinPrice(initialFilters.minPrice);
      setMaxPrice(initialFilters.maxPrice);
    }
  }, [isOpen, initialFilters]);

  const handleApply = () => {
    onApply({
      brand: selectedBrand,
      category: selectedCategory,
      minPrice,
      maxPrice,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedBrand("");
    setSelectedCategory("");
    setMinPrice(minPriceRange);
    setMaxPrice(maxPriceRange);
    onReset();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Calculate price percentage for slider
  const minPricePercent =
    maxPriceRange > minPriceRange
      ? ((minPrice - minPriceRange) / (maxPriceRange - minPriceRange)) * 100
      : 0;
  const maxPricePercent =
    maxPriceRange > minPriceRange
      ? ((maxPrice - minPriceRange) / (maxPriceRange - minPriceRange)) * 100
      : 100;

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString("en-PK")}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-[60px] inset-0 z-50 flex items-end"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-light_mode_color2 dark:bg-dark_mode_color2 border-b border-light_mode_color3 dark:border-dark_mode_color3 px-4 sm:px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl font-semibold">
                Filter
              </h2>
              <button
                onClick={onClose}
                className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity p-2 rounded-full hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3"
                aria-label="Close filter"
              >
                <HiXMark className="h-6 w-6 md:h-7 md:w-7 text-red-500" />
              </button>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 py-6 space-y-6">
              {/* Brand Section */}
              <div>
                <h3 className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-medium mb-4">
                  Brand
                </h3>
                {brandsLoading ? (
                  <div className="text-light_mode_text dark:text-dark_mode_text text-sm">
                    Loading brands...
                  </div>
                ) : (
                  <div className="space-y-2">
                    {/* All Brands Option */}
                    <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 transition-colors">
                      <input
                        type="radio"
                        name="brand"
                        value=""
                        checked={selectedBrand === ""}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-4 h-4 text-light_mode_yellow_color dark:text-dark_mode_yellow_color focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color"
                      />
                      <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base">
                        All Brands
                      </span>
                    </label>
                    {brands.map((brand: any) => {
                      const brandName =
                        brand?.name || brand?.brand_name || brand;
                      const brandValue = brand?.id || brand?.value || brandName;
                      return (
                        <label
                          key={brandValue}
                          className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 transition-colors"
                        >
                          <input
                            type="radio"
                            name="brand"
                            value={brandValue}
                            checked={selectedBrand === String(brandValue)}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="w-4 h-4 text-light_mode_yellow_color dark:text-dark_mode_yellow_color focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color"
                          />
                          <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base">
                            {brandName}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Category Section */}
              <div>
                <h3 className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-medium mb-4">
                  Category
                </h3>
                {categoriesLoading ? (
                  <div className="text-light_mode_text dark:text-dark_mode_text text-sm">
                    Loading categories...
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {/* All Categories Option */}
                    <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 transition-colors">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={selectedCategory === ""}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-light_mode_yellow_color dark:text-dark_mode_yellow_color focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color"
                      />
                      <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base">
                        All Categories
                      </span>
                    </label>
                    {categories.map((category: any) => {
                      const categoryName =
                        category?.name ||
                        category?.category_name ||
                        category?.label ||
                        category;
                      const categoryValue =
                        category?.id || category?.value || categoryName;
                      return (
                        <label
                          key={categoryValue}
                          className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 transition-colors"
                        >
                          <input
                            type="radio"
                            name="category"
                            value={categoryValue}
                            checked={selectedCategory === String(categoryValue)}
                            onChange={(e) =>
                              setSelectedCategory(e.target.value)
                            }
                            className="w-4 h-4 text-light_mode_yellow_color dark:text-dark_mode_yellow_color focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color"
                          />
                          <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base">
                            {categoryName}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Price Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-medium">
                    Price Range
                  </h3>
                  <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-medium">
                    {formatPrice(minPrice)} - {formatPrice(maxPrice)}
                  </span>
                </div>

                {/* Price Range Slider */}
                <div className="relative py-6">
                  {/* Slider Track */}
                  <div className="relative h-2 bg-light_mode_color3 dark:bg-dark_mode_color3 rounded-full">
                    {/* Active Range */}
                    <div
                      className="absolute h-2 bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color rounded-full"
                      style={{
                        left: `${minPricePercent}%`,
                        width: `${maxPricePercent - minPricePercent}%`,
                      }}
                    />

                    {/* Min Price Handle */}
                    <input
                      type="range"
                      min={minPriceRange}
                      max={maxPriceRange}
                      value={minPrice}
                      onChange={(e) => {
                        const newMin = parseInt(e.target.value);
                        if (newMin < maxPrice) {
                          setMinPrice(newMin);
                        }
                      }}
                      className="absolute top-0 w-full h-2 opacity-0 cursor-pointer z-10"
                      style={{ zIndex: 20 }}
                    />

                    {/* Max Price Handle */}
                    <input
                      type="range"
                      min={minPriceRange}
                      max={maxPriceRange}
                      value={maxPrice}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value);
                        if (newMax > minPrice) {
                          setMaxPrice(newMax);
                        }
                      }}
                      className="absolute top-0 w-full h-2 opacity-0 cursor-pointer z-10"
                      style={{ zIndex: 20 }}
                    />

                    {/* Handle Indicators */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-gray-300 rounded-full border-2 border-light_mode_yellow_color dark:border-dark_mode_yellow_color shadow-lg cursor-pointer pointer-events-none"
                      style={{ left: `calc(${minPricePercent}% - 10px)` }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-gray-300 rounded-full border-2 border-light_mode_yellow_color dark:border-dark_mode_yellow_color shadow-lg cursor-pointer pointer-events-none"
                      style={{ left: `calc(${maxPricePercent}% - 10px)` }}
                    />
                  </div>

                  {/* Price Inputs */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex-1">
                      <label className="text-xs text-light_mode_text dark:text-dark_mode_text mb-1 block">
                        Min Price
                      </label>
                      <input
                        type="number"
                        min={minPriceRange}
                        max={maxPriceRange}
                        value={minPrice}
                        onChange={(e) => {
                          const newMin =
                            parseInt(e.target.value) || minPriceRange;
                          if (newMin >= minPriceRange && newMin < maxPrice) {
                            setMinPrice(newMin);
                          }
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-light_mode_color3 dark:bg-dark_mode_color3 border border-light_mode_border1 dark:border-dark_mode_border2 text-light_mode_text dark:text-dark_mode_text text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-light_mode_text dark:text-dark_mode_text mb-1 block">
                        Max Price
                      </label>
                      <input
                        type="number"
                        min={minPriceRange}
                        max={maxPriceRange}
                        value={maxPrice}
                        onChange={(e) => {
                          const newMax =
                            parseInt(e.target.value) || maxPriceRange;
                          if (newMax > minPrice && newMax <= maxPriceRange) {
                            setMaxPrice(newMax);
                          }
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-light_mode_color3 dark:bg-dark_mode_color3 border border-light_mode_border1 dark:border-dark_mode_border2 text-light_mode_text dark:text-dark_mode_text text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-light_mode_color2 dark:bg-dark_mode_color2 border-t border-light_mode_color3 dark:border-dark_mode_color3 px-4 sm:px-6 py-4 flex gap-3 md:gap-4">
              <button
                onClick={handleReset}
                className="flex-1 bg-light_mode_color3 dark:bg-dark_mode_color3 hover:bg-light_mode_color dark:hover:bg-dark_mode_color text-red-500 dark:text-red-400 font-semibold py-3 md:py-4 rounded-2xl text-sm md:text-base transition-colors active:scale-95"
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className="flex-1 bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color hover:opacity-90 active:opacity-80 text-dark_mode_color dark:text-light_mode_text font-bold py-3 md:py-4 rounded-2xl text-sm md:text-base transition-all active:scale-95 shadow-md"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterDrawer;
