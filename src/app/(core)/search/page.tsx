"use client";
import SubHeader from "@/components/navigation/SubHeader";
import SearchInput from "@/components/search/SearchInput";
import SuggestionsList from "@/components/search/SuggestionsList";
import SuggestionsListSkeleton from "@/components/search/SuggestionsListSkeleton";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import { useGetSearchSuggestionsQuery } from "@/redux/api/core/searchApi";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const { data: searchSuggestionsData, isLoading } =
    useGetSearchSuggestionsQuery();

  // Extract suggestions from API response
  const suggestions =
    searchSuggestionsData?.payload &&
    Array.isArray(searchSuggestionsData.payload)
      ? searchSuggestionsData.payload
      : [];

  const handleSuggestionClick = (suggestion: string) => {
    router.push(`/search-list?q=${encodeURIComponent(suggestion)}`);
  };

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      router.push(`/search-list?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <TopSpacingWrapper>
      <SubHeader title="Search" />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <SearchInput
          initialValue=""
          onSearchChange={() => {}}
          onSearchSubmit={handleSearchSubmit}
          placeholder="Search"
        />
        {/* Suggestions List below input */}
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
      </div>
    </TopSpacingWrapper>
  );
};

export default page;
