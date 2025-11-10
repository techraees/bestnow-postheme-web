"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HiOutlineMenu } from "react-icons/hi";
import { HiMoon, HiSun } from "react-icons/hi";
import { BestonDarkLogo, BestonLightLogo } from "@/assets";
import { THEME_DATA } from "@/data/coreData/coreData";
import Link from "next/link";
import { HiXMark } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { ArrowUp } from "lucide-react";

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
  const isMenuOpen = useSelector((state: any) => state.coreAppSlice.isMenuOpen);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show header at the top of the page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Show header when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      // Hide header when scrolling down (only if scrolled past threshold)
      else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`w-full lg:h-[60px] h-[50px] fixed top-0 left-0 right-0 z-50 bg-light_mode_color dark:bg-dark_mode_color px-4 py-3 md:px-6 lg:px-8 xl:px-12 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        {/* Logo and App Name */}
        <div className="flex items-center gap-2 md:gap-3">
          <Image
            src={logo}
            alt="BestNow Logo"
            width={32}
            height={32}
            className="h-8 w-8  object-contain"
            priority
          />
          <span className="text-light_mode_text dark:text-dark_mode_text text-sm font-semibold">
            Bestnow Mobile Accessories
          </span>
        </div>

        {/* Right Side: Theme Toggle and Hamburger Menu */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={onThemeToggle}
            className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity p-1.5 md:p-2 rounded-full hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <HiSun className="h-5 w-5 md:h-6 md:w-6" />
            ) : (
              <HiMoon className="h-5 w-5 md:h-6 md:w-6" />
            )}
          </button>

          {/* Hamburger Menu */}
          <button
            onClick={onMenuClick}
            className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity p-1 md:p-1.5"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <ArrowUp className="h-6 w-6 md:h-7 md:w-7" />
            ) : (
              <HiOutlineMenu className="h-6 w-6 md:h-7 md:w-7" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
