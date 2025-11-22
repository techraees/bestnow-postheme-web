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
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
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
    </TopSpacingWrapper>
  );
};

export default page;
