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
          <Link className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color relative lg:block hidden" href="/status">
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
            className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color hover:opacity-80 active:opacity-60 transition-opacity p-1.5 md:p-2 rounded-full hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <svg
                version="1.0"
                className="h-5 w-5 "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50.000000 50.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
                  fill="currentColor"
                  stroke="none"
                >
                  <path
                    d="M152 453 c-67 -32 -122 -123 -122 -198 0 -115 110 -225 225 -225 77
0 167 56 200 125 9 20 15 39 12 41 -2 2 -26 -5 -52 -17 -151 -67 -303 85 -236
236 11 26 21 49 21 51 0 8 -15 3 -48 -13z"
                  />
                </g>
              </svg>
            ) : (
              <>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 78.000000 78.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)"
                    fill="currentColor"
                    stroke="none"
                  >
                    <path
                      d="M370 605 c0 -28 4 -35 20 -35 16 0 20 7 20 35 0 28 -4 35 -20 35 -16
0 -20 -7 -20 -35z"
                    />
                    <path
                      d="M212 549 c4 -30 33 -48 50 -31 17 17 -1 46 -31 50 -18 3 -22 -1 -19
-19z"
                    />
                    <path d="M520 555 c-14 -17 -7 -45 13 -45 19 0 37 21 37 42 0 22 -32 24 -50 3z" />
                    <path
                      d="M356 510 c-93 -28 -119 -147 -46 -212 25 -23 40 -28 81 -28 45 0 55
4 85 34 30 30 34 40 34 84 0 72 -34 110 -110 127 -8 2 -28 -1 -44 -5z m85 -69
c16 -16 29 -39 29 -51 0 -28 -52 -80 -80 -80 -28 0 -80 52 -80 80 0 12 13 35
29 51 16 16 39 29 51 29 12 0 35 -13 51 -29z"
                    />
                    <path
                      d="M140 390 c0 -16 7 -20 35 -20 28 0 35 4 35 20 0 16 -7 20 -35 20 -28
0 -35 -4 -35 -20z"
                    />
                    <path
                      d="M570 390 c0 -16 7 -20 35 -20 28 0 35 4 35 20 0 16 -7 20 -35 20 -28
0 -35 -4 -35 -20z"
                    />
                    <path
                      d="M222 258 c-19 -19 -15 -48 7 -48 24 0 45 25 37 45 -7 18 -27 20 -44
3z"
                    />
                    <path d="M514 255 c-4 -8 -1 -22 6 -30 18 -21 50 -19 50 3 0 36 -45 57 -56 27z" />
                    <path
                      d="M370 175 c0 -28 4 -35 20 -35 16 0 20 7 20 35 0 28 -4 35 -20 35 -16
0 -20 -7 -20 -35z"
                    />
                  </g>
                </svg>
              </>
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
      </div >
    </header >
  );
};

export default AppHeader;
