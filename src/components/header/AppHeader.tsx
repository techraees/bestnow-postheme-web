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
import { usePathname } from "next/navigation";
import { HIDDEN_HEADER_ROUTES } from "@/constants/routes";
import SocialMediaLinks from "./SocialMediaLinks";

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
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use default logo until mounted to prevent hydration mismatch
  const logo =
    !mounted || theme_mode === THEME_DATA.DARK
      ? BestonDarkLogo
      : BestonLightLogo;
  const isDark = mounted && theme_mode === THEME_DATA.DARK;
  const isMenuOpen = useSelector((state: any) => state.coreAppSlice.isMenuOpen);

  // Check if current route should hide header
  const shouldHideHeader = HIDDEN_HEADER_ROUTES.some((route) =>
    pathname?.startsWith(route)
  );

  // Don't render header if route is in hidden routes array
  if (shouldHideHeader) {
    return null;
  }

  return (
    <header
      className={`w-full lg:h-[60px] h-[55px] fixed top-0 left-0 right-0 z-50 bg-light_mode_color dark:bg-dark_mode_color px-4 py-3 md:px-6 lg:px-8 xl:px-12 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm transition-transform duration-300`}
    >
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        {/* Logo and App Name */}
        <div className="">
          <Link href={'/'} className="flex items-center gap-2 md:gap-3">
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
          </Link>

        </div>

        {/* Right Side: Theme Toggle and Hamburger Menu */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="lg:block hidden">
            <SocialMediaLinks />
          </div>
            <Link className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color relative" href="/status">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={`${20 > 0 ? "currentColor" : "currentColor"}`}
                viewBox="0 0 24 24"
                className="w-5 h-5 mb-1"
                focusable="false"
                aria-hidden="true"
                style={{
                  pointerEvents: 'none',
                  display: 'inherit',
                }}
              >
                <path
                  clipRule="evenodd"
                  d="m7.61 15.719.392-.22v-2.24l-.534-.228-.942-.404c-.869-.372-1.4-1.15-1.446-1.974-.047-.823.39-1.642 1.203-2.097h.001L15.13 3.59c1.231-.689 2.785-.27 3.466.833.652 1.058.313 2.452-.879 3.118l-1.327.743-.388.217v2.243l.53.227.942.404c.869.372 1.4 1.15 1.446 1.974.047.823-.39 1.642-1.203 2.097l-.002.001-8.845 4.964-.001.001c-1.231.688-2.784.269-3.465-.834-.652-1.058-.313-2.451.879-3.118l1.327-.742Zm1.993 6.002c-1.905 1.066-4.356.46-5.475-1.355-1.057-1.713-.548-3.89 1.117-5.025a4.14 4.14 0 01.305-.189l1.327-.742-.942-.404a4.055 4.055 0 01-.709-.391c-.963-.666-1.578-1.718-1.644-2.877-.08-1.422.679-2.77 1.968-3.49l8.847-4.966c1.905-1.066 4.356-.46 5.475 1.355 1.057 1.713.548 3.89-1.117 5.025a4.074 4.074 0 01-.305.19l-1.327.742.942.403c.253.109.49.24.709.392.963.666 1.578 1.717 1.644 2.876.08 1.423-.679 2.77-1.968 3.491l-8.847 4.965ZM10 14.567a.25.25 0 00.374.217l4.45-2.567a.25.25 0 000-.433l-4.45-2.567a.25.25 0 00-.374.216v5.134Z"
                  fillRule="evenodd"
                />
              </svg>
              {20 > 0 && (
                <span
                  className={`absolute -top-[0px] -right-[6px] text-[11px] font-[600] p-1 text-white text-center flex items-center justify-center rounded-full  bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color w-[6px] h-[6px]`}
                >
                </span>
              )}
            </Link>
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
