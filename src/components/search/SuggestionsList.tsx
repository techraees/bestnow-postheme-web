"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Tag from "./Tag";

interface SuggestionsListProps {
  suggestions: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  onSuggestionClick,
}) => {
  const router = useRouter();

  const handleClick = (suggestion: string) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    } else {
      router.push(`/search-list?q=${encodeURIComponent(suggestion)}`);
    }
  };

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden">
      <div className="px-0 lg:px-4 py-2 lg:py-3">
        <h3 className="text-light_mode_gray_color dark:text-dark_mode_gray_color font-semibold text-base md:text-lg lg:text-xl">
          Suggestions
        </h3>
      </div>
      <ul className="py-1 lg:py-2 flex flex-wrap gap-3">
        {suggestions.map((s: string, i: number) => (
          <Tag key={i} onClick={() => handleClick(s)}>
            {s}
          </Tag>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsList;


