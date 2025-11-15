"use client";

import React from "react";

const SuggestionsListSkeleton: React.FC = () => {
  return (
    <div className="mt-2 overflow-hidden">
      <div className="px-4 py-2">
        <div className="h-5 w-1/3 bg-light_mode_color3 dark:bg-dark_mode_color3 rounded animate-pulse" />
      </div>
      <ul className="py-1 space-y-1">
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index} className="px-4 py-1.5 animate-pulse">
            <div className="h-5 bg-light_mode_color3 dark:bg-dark_mode_color3 rounded w-full" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsListSkeleton;
