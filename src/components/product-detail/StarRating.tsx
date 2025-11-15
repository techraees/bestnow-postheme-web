"use client";

import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: number;
  interactive?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  size = 24,
  interactive = true,
}) => {
  const handleStarClick = (value: number) => {
    if (interactive) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleStarClick(value)}
          disabled={!interactive}
          className={`transition-all ${
            interactive
              ? "cursor-pointer hover:scale-110 active:scale-95"
              : "cursor-default"
          }`}
          aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
        >
          <Star
            size={size}
            className={`${
              value <= rating
                ? "text-[#FFD53F] fill-[#FFD53F]"
                : "text-gray-300 dark:text-gray-600 fill-transparent"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;

