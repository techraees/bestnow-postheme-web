"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  FaviourteIcon,
  CartIcon,
  OrderIcon,
  ProfileIcon,
} from "@/assets";
import { useSelector } from "react-redux";
import { truncateString } from "@/utils/coreUtils/truncateTexts";

export interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
}

interface BottomNavbarProps {
  cartCount?: number;
  navItems?: NavItem[];
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({
  cartCount = 0,
  navItems,
}) => {
  const { user_profile } = useSelector((state: any) => state.coreAppSlice);
  console.log("user_profile", user_profile);

  const pathname = usePathname();

  const defaultNavItems: NavItem[] = [
    {
      name: "Home",
      path: "/",
      icon: (
        <HomeIcon className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
      ),
    },
    {
      name: "Favorites",
      path: "/favorites",
      icon: (
        <FaviourteIcon className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
      ),
    },
    {
      name: "Cart",
      path: "/cart",
      icon: (
        <div className="relative">
          <CartIcon className="w-8 h-8 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] font-bold text-black text-center flex items-center justify-center rounded-full bg-light_mode_color  w-4 h-4 min-w-[16px]">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </div>
      ),
      badge: cartCount,
    },
    {
      name: "Orders",
      path: user_profile ? "/orders" : "/login",
      icon: (
        <OrderIcon className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
      ),
    },
    {
      name: user_profile
        ? truncateString(user_profile?.name, 7, false, true)
        : "Profile",
      path: user_profile ? "/profile" : "/login",
      icon: user_profile?.profile_path ? (
        <div className="mb-1 w-5 h-5 overflow-hidden rounded-full">
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${user_profile?.profile_path}`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <ProfileIcon className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
      ),
    },
  ];

  const items = navItems || defaultNavItems;

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(path);
  };

  return (
    <div className="lg:hidden block fixed bottom-0 left-0 right-0 z-50 w-full h-[60px] bg-light_mode_color dark:bg-dark_mode_color border-t border-light_mode_color2 dark:border-dark_mode_color2 shadow-lg backdrop-blur-sm">
      <div className="grid h-full max-w-lg grid-cols-5 px-2 mx-auto font-medium items-center">
        {items.map((item, index) => {
          const active = isActive(item.path);
          const isCart = item.name === "Cart";

          return (
            <Link
              key={index}
              href={item.path}
              className={`inline-flex flex-col relative  items-center justify-center group transition-all ${
                isCart ? "bottom-2" : ""
              } ${
                active
                  ? "text-light_mode_yellow_color dark:text-dark_mode_yellow_color "
                  : "text-light_mode_gray_color dark:text-dark_mode_gray_color"
              }`}
            >
              {/* Icon Container with elevated cart button */}
              <div
                className={`relative flex items-center justify-center transition-all ${
                  isCart && active
                    ? "bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color rounded-full p-2.5 md:p-3 shadow-lg -mt-3 "
                    : isCart
                    ? "bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full p-2.5 md:p-3 shadow-md -mt-6"
                    : ""
                }`}
              >
                <div
                  className={`${
                    !isCart && active
                      ? "text-light_mode_yellow_color dark:text-dark_mode_yellow_color"
                      : isCart && active
                      ? "text-light_mode_color2 dark:text-dark_mode_color2"
                      : "text-light_mode_text dark:text-dark_mode_text"
                  }`}
                >
                  {item.icon}
                </div>
                {item.badge && item.badge > 0 && !isCart && (
                  <span className="absolute -top-1 -right-1 text-[10px] font-bold text-white text-center flex items-center justify-center rounded-full bg-red-500 w-4 h-4 min-w-[16px]">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] md:text-[11px] font-medium mt-1 whitespace-nowrap transition-colors ${
                  active
                    ? "text-light_mode_yellow_color dark:text-dark_mode_yellow_color"
                    : "text-light_mode_gray_color dark:text-dark_mode_gray_color"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavbar;
