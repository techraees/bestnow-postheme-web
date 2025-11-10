"use client";

import React, { useState } from "react";
import SearchHeader from "./SearchHeader";
import FilterDrawer, { FilterOptions } from "./FilterDrawer";
import { ProductGrid } from "@/components/products";

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
  onFilterApply?: (filters: FilterOptions) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({
  initialQuery = "",
  products = [],
  onFavoriteClick,
  onAddToCart,
  onFilterClick,
  onFilterApply,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filteredProducts, setFilteredProducts] =
    useState<SearchProduct[]>(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    brand: "All",
    minPrice: 5000,
    maxPrice: 45000,
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, currentFilters);
  };

  const applyFilters = (query: string, filters: FilterOptions) => {
    let filtered = [...products];

    // Apply search query filter
    if (query.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply brand filter
    if (filters.brand !== "All") {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    setFilteredProducts(filtered);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(true);
    onFilterClick?.();
  };

  const handleFilterApply = (filters: FilterOptions) => {
    setCurrentFilters(filters);
    applyFilters(searchQuery, filters);
    onFilterApply?.(filters);
  };

  const handleFilterReset = () => {
    const defaultFilters: FilterOptions = {
      brand: "All",
      minPrice: 5000,
      maxPrice: 45000,
    };
    setCurrentFilters(defaultFilters);
    applyFilters(searchQuery, defaultFilters);
  };

  const handleFavoriteClick = (id: string) => {
    onFavoriteClick?.(id);
    // Update favorite status in local state
    setFilteredProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  return (
    <div className="min-h-screen bg-light_mode_color dark:bg-dark_mode_color w-full flex flex-col">
      {/* Search Header */}
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onFilterClick={handleFilterClick}
      />

      {/* Results Summary */}
      {filteredProducts.length > 0 && (
        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-3">
          <div className="flex items-center justify-between">
            <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-medium">
              Showing Results
            </span>
            <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-semibold">
              {filteredProducts.length.toLocaleString("en-PK")}
            </span>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto pb-6 md:pb-8">
        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6 lg:py-8">
          {filteredProducts.length === 0 ? (
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
              products={filteredProducts}
              onFavoriteClick={handleFavoriteClick}
              onAddToCart={onAddToCart}
            />
          )}
        </div>
      </div>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleFilterApply}
        onReset={handleFilterReset}
        initialFilters={currentFilters}
        minPriceRange={0}
        maxPriceRange={50000}
      />
    </div>
  );
};

export default SearchScreen;
