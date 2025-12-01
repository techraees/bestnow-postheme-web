"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { HiOutlineMenu } from "react-icons/hi";
import { HiMoon, HiSun } from "react-icons/hi";
import { BestonDarkLogo, BestonLightLogo } from "@/assets";
import { THEME_DATA } from "@/data/coreData/coreData";
import Link from "next/link";
import { HiXMark } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { ArrowUp } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { HIDDEN_HEADER_ROUTES } from "@/constants/routes";
import SocialMediaLinks from "./SocialMediaLinks";
import CartButton from "./CartButton";
import { useGetCartItemsCountQuery } from "@/redux/api/core/cartApi";
import ProfileDropdown from "./ProfileDropdown";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import AddToCartModal from "../cart/AddToCartModal";
import { SearchHeader } from "../search";
import SearchNav from "./SearchNav";

const LoginIcon = () => (
  <svg
    className="xl:w-[20.09px] xl:h-[20.09px] w-[16.09px] h-[16.09px]"
    viewBox="0 0 45 45"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="login">
      <mask
        id="mask0_1804_9189"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        style={{ maskType: "alpha" }}
      >
        <rect
          id="Bounding box"
          x="0.0546875"
          y="0.0913086"
          width="44.0917"
          height="44.0917"
          fill="currentColor"
        />
      </mask>
      <g mask="url(#mask0_1804_9189)">
        <path
          id="login_2"
          d="M22.1008 38.6713V34.997H34.9608V9.27684H22.1008V5.60254H34.9608C35.9713 5.60254 36.8363 5.96231 37.5558 6.68187C38.2754 7.40142 38.6352 8.26641 38.6352 9.27684V34.997C38.6352 36.0074 38.2754 36.8724 37.5558 37.592C36.8363 38.3115 35.9713 38.6713 34.9608 38.6713H22.1008ZM18.4265 31.3227L15.9004 28.6588L20.5851 23.9741H5.56641V20.2998H20.5851L15.9004 15.615L18.4265 12.9511L27.6122 22.1369L18.4265 31.3227Z"
          fill="currentColor"
        />
      </g>
    </g>
  </svg>
);

interface AppHeaderProps {
  theme_mode: string;
  onMenuClick?: () => void;
  onThemeToggle?: () => void;
}

const LOGIN_MENU = [
  {
    name: "Login",
    path: "/login",
    icon: (
      <div className="relative  text-light_mode_yellow_color dark:text-dark_mode_yellow_color text-opacity-100">
        <LoginIcon />
      </div>
    ),
  },
];

const AppHeader: React.FC<AppHeaderProps> = ({
  theme_mode,
  onMenuClick,
  onThemeToggle,
}) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  const { user_profile } = useSelector((state: any) => state.coreAppSlice);

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

  const { data: cartItemsCount } = useGetCartItemsCountQuery();
  console.log(cartItemsCount);

  const cartCount = cartItemsCount?.payload || 0;

  const handleCartClick = useCallback(() => {
    if (user_profile) {
      setIsOpenCart(true);
    } else {
      router.push("/auth/login");
    }
  }, [user_profile, router]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropDownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeModal = useCallback(() => {
    setIsOpenCart(false);
  }, []);

  useEffect(() => {
    if (isOpenCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenCart]);

  // Don't render header if route is in hidden routes array
  if (shouldHideHeader) {
    return null;
  }

  return (
    <header
      className={`w-full lg:h-[65px] h-[55px] fixed top-0 left-0 right-0 z-50 bg-light_mode_color dark:bg-dark_mode_color px-4 py-3 md:px-6 lg:px-8 xl:px-12 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm transition-transform duration-300`}
    >
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        {/* Logo and App Name */}
        <div className="">
          <Link href={"/"} className="flex items-center gap-2 md:gap-3">
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
        <SearchNav />
        {/* Right Side: Theme Toggle and Hamburger Menu */}
        <div className="flex items-center gap-3 md:gap-2">
          <div className="lg:block hidden">
            <SocialMediaLinks />
          </div>
          <Link
            className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color relative lg:block hidden"
            href="/status"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={`${20 > 0 ? "currentColor" : "currentColor"}`}
              viewBox="0 0 24 24"
              className="w-5 h-5 mb-1"
              focusable="false"
              aria-hidden="true"
              style={{
                pointerEvents: "none",
                display: "inherit",
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
              ></span>
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

          {!user_profile ? (
            LOGIN_MENU.map((item, index) => (
              <li
                key={index}
                className={`group cursor-pointer text-light_mode_yellow_color dark:text-dark_mode_yellow_color flex items-center xl:gap-x-2 gap-x-1 ${
                  index == 0 && "ml-0"
                }`}
              >
                <Link href={item?.path}>{item?.icon}</Link>
                <Link
                  href={item?.path}
                  className="relative cursor-pointer  mx-[0.25rem]  xl:text-[12.72px] text-[10.72px] font-bold font-['Plus Jakarta Sans']"
                >
                  {item?.name}
                </Link>
              </li>
            ))
          ) : (
            <>
              <CartButton
                myItemsCountObj={cartCount}
                onClick={handleCartClick}
              />

              <ProfileDropdown
                user_profile={user_profile}
                theme_mode={theme_mode}
                pathname={pathname}
                isDropdownOpen={isDropdownOpen}
                setIsDropDownOpen={setIsDropDownOpen}
                dropdownRef={dropdownRef}
              />
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
            </>
          )}
          <AnimatePresence>
            {isOpenCart && (
              <Modal
                isOpen={isOpenCart}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                contentLabel="Product Image"
                style={{
                  content: {
                    top: 0,
                    left: 0,
                    width: "100svw",
                    height: "100vh",
                    border: "none",
                    padding: 0,
                    background: "transparent",
                    position: "fixed",
                    overflow: "hidden",
                  },
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    zIndex: 1000,
                  },
                }}
              >
                {/* CLICK OUTSIDE TO CLOSE */}
                <motion.div
                  className="fixed inset-0"
                  onClick={closeModal}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />

                {/* RIGHT SIDE DRAWER */}
                <motion.div
                  className="
          dark:bg-dark_mode_primary 
          bg-light_mode_primary 
          h-full absolute right-0 w-[380px]
          shadow-2xl
        "
                  initial={{ x: "100%", opacity: 0 }} // 👉 Start fully off-screen right
                  animate={{ x: "0%", opacity: 1 }} // 👉 Slide into view
                  exit={{ x: "100%", opacity: 0 }} // 👉 Slide back to right on close
                  transition={{
                    duration: 0.28,
                    ease: "easeOut", // 👉 Smooth clean animation
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <AddToCartModal closeModal={closeModal} />
                </motion.div>
              </Modal>
            )}
          </AnimatePresence>

          {/* Hamburger Menu */}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
