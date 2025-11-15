"use client";

import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft } from "lucide-react";

interface SubHeaderProps {
  itemCount?: number;
  title?: string;
  subtitle?: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  itemCount,
  title = "UnKnown",
  subtitle,
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="bg-light_mode_color dark:bg-dark_mode_color">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-5 lg:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0 md:gap-4">
            <button
              onClick={handleBack}
              className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity rounded-full hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2"
              aria-label="Go back"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
            </button>
            <h1 className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl lg:text-3xl font-[500]">
              {title}
            </h1>
          </div>
          {subtitle && (
            <div className="text-light_mode_text dark:text-dark_mode_text text-sm ">
              {subtitle}
            </div>
          )}
          {itemCount && (
            <div className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg lg:text-xl ">
              {itemCount.toString().padStart(2, "0")}{" "}
              {itemCount === 1 ? "Item" : "Items"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
