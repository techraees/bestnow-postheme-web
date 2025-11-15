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
    <div className="mt-2 overflow-hidden">
      <div className="px-4 py-2 ">
        <h3 className="text-dark_mode_color3 dark:text-light_mode_color3  font-[400] text-[16px] md:text-lg">
          Suggestions
        </h3>
      </div>
      <ul className="py-1">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleClick(suggestion)}
            className="px-4 py-1.5 cursor-pointer  text-light_mode_text dark:text-dark_mode_text text-sm md:text-base "
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsList;
