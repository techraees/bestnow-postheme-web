"use client";

import React from "react";
import { useRouter } from "next/navigation";

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
      <ul className="py-1 lg:py-2">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleClick(suggestion)}
            className="px-0 lg:px-4 py-2 lg:py-3 cursor-pointer text-light_mode_text dark:text-dark_mode_text text-sm md:text-base lg:text-lg hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2 rounded-lg lg:rounded-xl transition-colors duration-200"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsList;
