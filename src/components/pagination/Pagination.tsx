"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Format page number with leading zero (e.g., "01", "23")
  const formatPageNumber = (page: number): string => {
    return page.toString().padStart(2, "0");
  };

  return (
    <div className="w-full bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-t-2xl border-t border-light_mode_color3 dark:border-dark_mode_color3">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg transition-all ${
              currentPage === 1
                ? "opacity-40 cursor-not-allowed text-light_mode_text dark:text-dark_mode_text"
                : "text-light_mode_text dark:text-dark_mode_text hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 active:opacity-60"
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Page Display */}
          <div className="flex items-center gap-2">
            <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-medium">
              Page {formatPageNumber(currentPage)} of {formatPageNumber(totalPages)}
            </span>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg transition-all ${
              currentPage === totalPages
                ? "opacity-40 cursor-not-allowed text-light_mode_text dark:text-dark_mode_text"
                : "text-light_mode_text dark:text-dark_mode_text hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 active:opacity-60"
            }`}
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

