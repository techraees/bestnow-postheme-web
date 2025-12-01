"use client";

import React, { memo, useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { COOKIES_LOGIN_TOKENS, THEME_DATA } from "@/data/coreData/coreData";
import { getCookie, removeCookie } from "@/utils/coreUtils/cookieFunction";
import { toast } from "react-toastify";
import { BestonDarkLogo, BestonLightLogo } from "@/assets";
import { useLogoutCustomerMutation } from "@/redux/api/auth/customerAuthApi";
import ProfileIcon from "@/assets/images/profile/ProfileIcon";
import Image from "next/image";

interface ProfileDropdownProps {
  user_profile: any;
  theme_mode: string;
  pathname: string;
  isDropdownOpen: boolean;
  setIsDropDownOpen: (value: boolean) => void;
  dropdownRef: React.RefObject<HTMLLIElement | null>;
}

const ProfileDropdown = memo(
  ({
    user_profile,
    theme_mode,
    pathname,
    isDropdownOpen,
    setIsDropDownOpen,
    dropdownRef,
  }: ProfileDropdownProps) => {
    const [logoutCustomerUser] = useLogoutCustomerMutation();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const handleLogoutCustomer = useCallback(async () => {
      const getRefreshTokenFromCookie = getCookie(
        COOKIES_LOGIN_TOKENS.REFRESH_TOKEN
      );

      logoutCustomerUser({ refresh_token: getRefreshTokenFromCookie });
      toast.success("Logout successfully", { toastId: "logout" });

      removeCookie(COOKIES_LOGIN_TOKENS.REFRESH_TOKEN);
      removeCookie(COOKIES_LOGIN_TOKENS.ACCESS_TOKEN);
      sessionStorage.removeItem("user_context");

      window.location.href = "/";
    }, [logoutCustomerUser]);

    return (
      <li
        onClick={() => setIsDropDownOpen(!isDropdownOpen)}
        className="relative lg:block hidden list-none"
        ref={dropdownRef}
      >
        <div
          className={`w-[32px] h-[32px] border border-light_mode_yellow_color dark:border-dark_mode_yellow_color ${
            pathname?.includes("/profile") && ""
          } rounded-full cursor-pointer overflow-hidden flex justify-center items-center`}
        >
          {user_profile?.profile_path ? (
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE_PATH_NEW_PATH}/${user_profile?.profile_path}`}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : mounted ? (
            <ProfileIcon className="w-[15px] h-[15px] text-light_mode_yellow_color dark:text-dark_mode_yellow_color rounded-full object-cover" />
          ) : (
            <div className="" />
          )}
        </div>

        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full right-0 mt-2 z-50 bg-light_mode_color dark:bg-dark_mode_color divide-y divide-gray-100 rounded-lg shadow-md w-44"
          >
            <ul className="py-2">
              <li>
                <Link
                  href={"/profile"}
                  className="block px-4 py-2 dark:hover:bg-dark_mode_color1 hover:bg-light_mode_light_bg_color_hover_color cursor-pointer"
                >
                  Profile
                </Link>
              </li>

              <li>
                <p
                  onClick={handleLogoutCustomer}
                  className="block px-4 py-2 dark:hover:bg-dark_mode_color1 hover:bg-light_mode_light_bg_color_hover_color cursor-pointer"
                >
                  Log out
                </p>
              </li>
            </ul>
          </motion.div>
        )}
      </li>
    );
  }
);

ProfileDropdown.displayName = "ProfileDropdown";

export default ProfileDropdown;
