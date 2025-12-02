"use client";
import SubHeader from "@/components/navigation/SubHeader";
import SearchInput from "@/components/search/SearchInput";
import SearchDropdown from "@/components/search/SearchDropdown";
import SuggestionsList from "@/components/search/SuggestionsList";
import SuggestionsListSkeleton from "@/components/search/SuggestionsListSkeleton";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import {
  useGetSearchSuggestionsQuery,
  useGetDropdownSearchResultsQuery,
} from "@/redux/api/core/searchApi";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";

const page = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: searchSuggestionsData, isLoading } =
    useGetSearchSuggestionsQuery();

  // Call dropdown API when user types (debounced)
  const { data: dropdownData, isLoading: isDropdownLoading } =
    useGetDropdownSearchResultsQuery(
      { q: searchQuery, limit: 5 },
      {
        skip: !searchQuery.trim() || searchQuery.trim().length < 2,
      }
    );

  // Extract suggestions from API response
  const suggestions =
    searchSuggestionsData?.payload &&
      Array.isArray(searchSuggestionsData.payload)
      ? searchSuggestionsData.payload
      : [];

  // Extract products from dropdown response
  const dropdownProducts = useMemo(() => {
    if (!dropdownData?.payload) return [];
    if (Array.isArray(dropdownData.payload)) {
      return dropdownData.payload;
    }
    return dropdownData.payload.results || [];
  }, [dropdownData]);

  // Show dropdown when products are available
  useEffect(() => {
    if (dropdownProducts.length > 0 && searchQuery.trim().length >= 2) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [dropdownProducts, searchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length < 2) {
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    router.push(`/search-list?q=${encodeURIComponent(suggestion)}`);
  };

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      setShowDropdown(false);
      router.push(`/search-list?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <TopSpacingWrapper>
      <SubHeader title="Search" />
      <div className="min-h-[calc(100vh-230px)] bg-light_mode_color dark:bg-dark_mode_color w-full">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 md:py-8 lg:py-12">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="max-w-4xl mx-auto">
              {/* Search Input Container */}
              <div className="bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-2xl shadow-lg p-8 lg:p-10 mb-8">
                <h1 className="text-light_mode_text dark:text-dark_mode_text text-2xl lg:text-3xl font-bold mb-6 text-center">
                  Search Products
                </h1>
                <div className="relative">
                  <SearchInput
                    initialValue={searchQuery}
                    onSearchChange={handleSearchChange}
                    onSearchSubmit={handleSearchSubmit}
                    placeholder="Search for products..."
                  />
                  {/* Dropdown with Product Results */}
                  <SearchDropdown
                    products={dropdownProducts}
                    isOpen={(showDropdown && !isDropdownLoading) || (searchQuery ? true : false)}
                    onClose={() => setShowDropdown(false)}
                  />
                </div>
              </div>

              {/* Suggestions List - Desktop */}
              {!showDropdown && (
                <>
                  {isLoading ? (
                    <div className="bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-2xl shadow-lg p-8 lg:p-10">
                      <SuggestionsListSkeleton />
                    </div>
                  ) : suggestions.length > 0 ? (
                    <div className="bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-2xl shadow-lg p-8 lg:p-10">
                      <SuggestionsList
                        suggestions={suggestions}
                        onSuggestionClick={handleSuggestionClick}
                      />
                    </div>
                  ) : (
                    <div className="bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-2xl shadow-lg p-8 lg:p-10">
                      <div className="text-center py-12">
                        <p className="text-light_mode_text dark:text-dark_mode_text text-lg font-medium mb-2">
                          Start searching
                        </p>
                        <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-base">
                          Type in the search box above to find products
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="relative">
              <SearchInput
                initialValue={searchQuery}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                placeholder="Search"
              />
              {/* Dropdown with Product Results */}
              <SearchDropdown
                products={dropdownProducts}
                isOpen={showDropdown && !isDropdownLoading}
                onClose={() => setShowDropdown(false)}
              />
            </div>
            {/* Suggestions List below input - only show when dropdown is not visible */}
            {!showDropdown && (
              <>
                {isLoading ? (
                  <SuggestionsListSkeleton />
                ) : suggestions.length > 0 ? (
                  <div className="mt-2">
                    <SuggestionsList
                      suggestions={suggestions}
                      onSuggestionClick={handleSuggestionClick}
                    />
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </TopSpacingWrapper>
  );
};

export default page;
