"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  icon,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 md:gap-4 p-1.5  active:scale-[0.98] transition-all duration-200"
    >
      {/* Icon */}
      <div className="w-[54px] h-[54px] md:w-14 md:h-14 rounded-full bg-light_mode_color2 dark:bg-dark_mode_color2 flex items-center justify-center shrink-0">
        <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
          {icon}
        </div>
      </div>

      {/* Title and Subtitle */}
      <div className="flex-1 flex flex-col gap-0 text-left">
        <span className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-medium">
          {title}
        </span>
        <span className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base">
          {subtitle}
        </span>
      </div>

      {/* Arrow Icon */}
      <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-light_mode_text dark:text-dark_mode_text opacity-60 shrink-0" />
    </button>
  );
};

export default ProfileMenuItem;
