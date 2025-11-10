"use client";

import React, { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";

export interface FilterOptions {
  brand: string;
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

const brands = ["All", "Sun Long", "Golden Crown", "Falcon"];

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  onApply,
  onReset,
  initialFilters = { brand: "All", minPrice: 5000, maxPrice: 45000 },
  minPriceRange = 0,
  maxPriceRange = 50000,
}) => {
  const [selectedBrand, setSelectedBrand] = useState(initialFilters.brand);
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);

  useEffect(() => {
    if (isOpen) {
      setSelectedBrand(initialFilters.brand);
      setMinPrice(initialFilters.minPrice);
      setMaxPrice(initialFilters.maxPrice);
    }
  }, [isOpen, initialFilters]);

  const handleApply = () => {
    onApply({
      brand: selectedBrand,
      minPrice,
      maxPrice,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedBrand("All");
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
  const minPricePercent = ((minPrice - minPriceRange) / (maxPriceRange - minPriceRange)) * 100;
  const maxPricePercent = ((maxPrice - minPriceRange) / (maxPriceRange - minPriceRange)) * 100;

  // Generate histogram data (mock data for visualization)
  const histogramBars = Array.from({ length: 20 }, (_, i) => {
    const barValue = Math.random() * 100;
    const barPosition = (i / 19) * 100;
    const isInRange = barPosition >= minPricePercent && barPosition <= maxPricePercent;
    return { value: barValue, position: barPosition, isInRange };
  });

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString("en-PK")}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Drawer */}
      <div
        className="relative w-full bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto transform transition-transform duration-300"
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
            <div className="border-b border-light_mode_color3 dark:border-dark_mode_color3 pb-4 mb-4">
              <h3 className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-medium mb-4">
                Brand
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all ${
                      selectedBrand === brand
                        ? "bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color text-dark_mode_color dark:text-light_mode_text"
                        : "bg-light_mode_color3 dark:bg-dark_mode_color3 text-light_mode_text dark:text-dark_mode_text"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-medium">
                Price
              </h3>
              <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-medium">
                {formatPrice(minPrice)} - {formatPrice(maxPrice)}
              </span>
            </div>

            {/* Price Range Slider */}
            <div className="relative py-6">
              {/* Histogram Background */}
              <div className="absolute inset-0 flex items-end justify-between px-2">
                {histogramBars.map((bar, index) => (
                  <div
                    key={index}
                    className={`flex-1 mx-0.5 rounded-t transition-colors ${
                      bar.isInRange
                        ? "bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color"
                        : "bg-light_mode_color3 dark:bg-dark_mode_color3"
                    }`}
                    style={{
                      height: `${bar.value}%`,
                      minHeight: "4px",
                    }}
                  />
                ))}
              </div>

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
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-gray-300 rounded-full border-2 border-light_mode_yellow_color dark:border-dark_mode_yellow_color shadow-lg cursor-pointer"
                  style={{ left: `calc(${minPricePercent}% - 10px)` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-gray-300 rounded-full border-2 border-light_mode_yellow_color dark:border-dark_mode_yellow_color shadow-lg cursor-pointer"
                  style={{ left: `calc(${maxPricePercent}% - 10px)` }}
                />
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
      </div>
    </div>
  );
};

export default FilterDrawer;

