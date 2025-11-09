"use client";

import React from "react";
import Image from "next/image";
import { HiOutlineMenu } from "react-icons/hi";
import { HiMoon, HiSun } from "react-icons/hi";
import { BestonDarkLogo, BestonLightLogo } from "@/assets";
import { THEME_DATA } from "@/data/coreData/coreData";

interface AppHeaderProps {
  theme_mode: string;
  onMenuClick?: () => void;
  onThemeToggle?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  theme_mode,
  onMenuClick,
  onThemeToggle,
}) => {
  const logo =
    theme_mode === THEME_DATA.DARK ? BestonDarkLogo : BestonLightLogo;
  const isDark = theme_mode === THEME_DATA.DARK;

  return (
    <header className="w-full bg-light_mode_color dark:bg-dark_mode_color border-b border-light_mode_border1 dark:border-dark_mode_border1 px-4 py-3 md:px-6 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo and App Name */}
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="BestNow Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          <span className="text-light_mode_text dark:text-dark_mode_text text-lg font-semibold">
            BestNow
          </span>
        </div>

        {/* Right Side: Theme Toggle and Hamburger Menu */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={onThemeToggle}
            className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity p-1.5 rounded-full hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <HiSun className="h-5 w-5" />
            ) : (
              <HiMoon className="h-5 w-5" />
            )}
          </button>

          {/* Hamburger Menu */}
          <button
            onClick={onMenuClick}
            className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity p-1"
            aria-label="Menu"
          >
            <HiOutlineMenu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
