"use client";

import React, { useState, useEffect } from "react";

import { ProductGrid } from "@/components/products";
import SearchHeader from "./SearchHeader";

export interface SearchProduct {
  id: string;
  title: string;
  image: any;
  rating?: number;
  soldCount?: string;
  price: number;
  isFavorite?: boolean;
}

interface SearchScreenProps {
  initialQuery?: string;
  products?: SearchProduct[];
  onFavoriteClick?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onFilterClick?: () => void;
  onSearchSubmit?: (query: string) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({
  initialQuery = "",
  products = [],
  onFavoriteClick,
  onAddToCart,
  onFilterClick,
  onSearchSubmit,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Update searchQuery when initialQuery changes
  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    onSearchSubmit?.(query);
  };

  const handleFavoriteClick = (id: string) => {
    onFavoriteClick?.(id);
  };

  return (
    <div className="min-h-screen bg-light_mode_color dark:bg-dark_mode_color w-full flex flex-col">
      {/* Search Header */}
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        onFilterClick={onFilterClick}
      />

      {/* Results Summary */}
      {products.length > 0 && (
        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-3">
          <div className="flex items-center justify-between">
            <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-medium">
              Showing Results
            </span>
            <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-semibold">
              {products.length.toLocaleString("en-PK")}
            </span>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto pb-6 md:pb-8">
        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6 lg:py-8">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
              <div className="text-light_mode_text dark:text-dark_mode_text text-center">
                <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3">
                  {searchQuery ? "No products found" : "Start searching"}
                </p>
                <p className="text-sm md:text-base lg:text-lg text-light_mode_gray_color dark:text-dark_mode_gray_color">
                  {searchQuery
                    ? `No products match "${searchQuery}"`
                    : "Enter a search term to find products"}
                </p>
              </div>
            </div>
          ) : (
            <ProductGrid
              products={products}
              onFavoriteClick={handleFavoriteClick}
              onAddToCart={onAddToCart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
